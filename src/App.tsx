import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, ArrowUpRight, CalendarDays, Check, Download, RotateCcw, Search, Users } from 'lucide-react'
import { clonePlan, samplePlan } from './data'
import { changedCells, getLoad, initiativeImpact, setAllocation, setConstraint } from './logic'
import type { Plan } from './types'

const STORAGE_KEY = 'northstar.resource-radar.plan.v1'
type View = 'plan' | 'scenarios' | 'about'

function readSaved(): { plan: Plan; warning: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { plan: clonePlan(samplePlan), warning: '' }
    const parsed = JSON.parse(raw) as { version: number; baseline: Plan }
    if (parsed.version !== 1 || !parsed.baseline?.people || !parsed.baseline.allocations) throw new Error('Unsupported saved data')
    return { plan: parsed.baseline, warning: '' }
  } catch {
    return { plan: clonePlan(samplePlan), warning: 'Saved planning data could not be read. This session is using the sample plan.' }
  }
}

const viewFromHash = (): View => location.hash === '#scenarios' ? 'scenarios' : location.hash === '#about' ? 'about' : 'plan'

export default function App() {
  const initial = useMemo(readSaved, [])
  const [baseline, setBaseline] = useState(initial.plan)
  const [draft, setDraft] = useState(clonePlan(initial.plan))
  const [view, setView] = useState<View>(viewFromHash)
  const [query, setQuery] = useState('')
  const [warning, setWarning] = useState(initial.warning)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetSnapshot, setResetSnapshot] = useState<{ baseline: Plan; draft: Plan } | null>(null)
  const cancelResetRef = useRef<HTMLButtonElement>(null)
  const changes = changedCells(baseline, draft)

  useEffect(() => {
    const onHash = () => setView(viewFromHash())
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!confirmReset) return
    cancelResetRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setConfirmReset(false) }
    addEventListener('keydown', closeOnEscape)
    return () => removeEventListener('keydown', closeOnEscape)
  }, [confirmReset])

  const visiblePeople = draft.people.filter((person) => `${person.name} ${person.role}`.toLowerCase().includes(query.toLowerCase()))
  const loads = draft.people.flatMap((person) => draft.weeks.map((week) => ({ person, week, load: getLoad(person, week.id, draft.allocations) })))
  const overloads = loads.filter(({ load }) => load.status === 'overloaded' || (load.status === 'unavailable' && load.allocated > 0))
  const available = loads.reduce((sum, { load }) => sum + load.available, 0)
  const allocated = loads.reduce((sum, { load }) => sum + load.allocated, 0)

  const applyDraft = () => {
    const next = clonePlan(draft)
    setBaseline(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, baseline: next, savedAt: new Date().toISOString() }))
      setWarning('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2200)
    } catch {
      setWarning('Browser storage is unavailable. Your draft remains in this tab, but it cannot be saved for later.')
    }
  }

  const reset = () => {
    setResetSnapshot({ baseline: clonePlan(baseline), draft: clonePlan(draft) })
    const next = clonePlan(samplePlan)
    setBaseline(next)
    setDraft(clonePlan(next))
    try { localStorage.removeItem(STORAGE_KEY); setWarning('') } catch { setWarning('Browser storage is unavailable. The sample plan is restored for this tab.') }
  }

  const restoreReset = () => {
    if (!resetSnapshot) return
    const restoredBaseline = clonePlan(resetSnapshot.baseline)
    setBaseline(restoredBaseline)
    setDraft(clonePlan(resetSnapshot.draft))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, baseline: restoredBaseline, savedAt: new Date().toISOString() }))
      setWarning('')
    } catch {
      setWarning('Browser storage is unavailable. The restored plan remains in this tab, but it cannot be saved for later.')
    }
    setResetSnapshot(null)
  }

  const exportPlan = () => {
    const blob = new Blob([JSON.stringify({ product: 'Resource Radar sample', exportedAt: new Date().toISOString(), plan: draft }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'resource-radar-draft.json'; link.click(); URL.revokeObjectURL(url)
  }

  const editAllocation = (personId: string, initiativeId: string, weekId: string, days: number) => setDraft((plan) => setAllocation(plan, personId, initiativeId, weekId, days))
  const editConstraint = (personId: string, weekId: string, field: 'timeOff' | 'commitments', days: number) => setDraft((plan) => setConstraint(plan, personId, weekId, field, days))

  return (
    <div className="app-shell">
      <aside className="planning-rail">
        <a className="brand" href="#plan">
          <span className="brand-mark"><span /></span>
          <span><b>Resource Radar</b><small>Northstar sample plan</small></span>
        </a>
        <nav aria-label="Primary navigation">
          {([['plan', 'Plan'], ['scenarios', 'Scenarios'], ['about', 'About']] as const).map(([id, label]) => <a key={id} href={`#${id}`} className={view === id ? 'active' : ''}>{label}</a>)}
        </nav>
        <div className="rail-note"><span>Sample only</span><p>Plan with fictional people and local browser data.</p></div>
      </aside>
      <div className="work-area"><main>
        {warning && <div className="warning" role="alert"><AlertTriangle size={18} /><span>{warning}</span></div>}
        {view === 'plan' && <>
          <section className="page-head">
            <div><p className="eyebrow">Planning cycle · Q4 launch window</p><h1>Capacity, without the guesswork.</h1><p>Allocate person-days against real availability. Draft changes stay separate until you apply them.</p></div>
            <div className="actions">
              <button className="button secondary" title={changes ? 'Discard draft edits and restore the applied baseline.' : 'No draft changes to undo.'} onClick={() => setDraft(clonePlan(baseline))} disabled={!changes}><RotateCcw size={17} />Undo draft</button>
              <button className="button primary" title={changes ? 'Save this draft as the applied plan for this browser.' : 'Change a draft allocation or constraint before applying.'} onClick={applyDraft} disabled={!changes}><Check size={17} />{saved ? 'Applied' : `Apply draft${changes ? ` · ${changes}` : ''}`}</button>
              {!changes && <p className="action-help">Edit an allocation or constraint to enable draft actions.</p>}
            </div>
          </section>

          <section className="metrics" aria-label="Plan summary">
            <article><span className="metric-icon teal"><Users size={20} /></span><div><strong>{draft.people.length}</strong><span>Team members</span></div></article>
            <article><span className="metric-icon blue"><CalendarDays size={20} /></span><div><strong>{allocated} / {available}</strong><span>Days allocated</span></div></article>
            <article className={overloads.length ? 'metric-alert' : ''}><span className="metric-icon orange"><AlertTriangle size={20} /></span><div><strong>{overloads.length}</strong><span>Load conflicts</span></div></article>
            <article><div className="util-copy"><strong>{available ? Math.round(allocated / available * 100) : 0}%</strong><span>Portfolio utilization</span></div><div className="mini-bar"><span style={{ width: `${Math.min(100, available ? allocated / available * 100 : 0)}%` }} /></div></article>
          </section>

          <section className="workspace-card">
            <div className="card-toolbar">
              <div><h2>Weekly allocation</h2><p>Each cell shows available and assigned person-days.</p></div>
              <label className="search"><Search size={17} /><span className="sr-only">Find a team member</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a team member" /></label>
            </div>
            {visiblePeople.length ? <div className="matrix-wrap"><table className="matrix">
              <thead><tr><th>Person</th>{draft.weeks.map((week) => <th key={week.id}><b>{week.label}</b><small>{week.dates}</small></th>)}</tr></thead>
              <tbody>{visiblePeople.map((person) => <tr key={person.id}>
                <th><div className="person"><span className="avatar">{person.initials}</span><span><b>{person.name}</b><small>{person.role}</small></span></div></th>
                {draft.weeks.map((week) => {
                  const load = getLoad(person, week.id, draft.allocations)
                  return <td key={week.id}><div className={`load-cell ${load.status}`} tabIndex={0} aria-label={`${person.name}, ${week.label}: ${load.allocated} assigned of ${load.available} available days`}>
                    <div className="load-top"><strong>{load.allocated}<small> / {load.available}d</small></strong><span>{load.status === 'overloaded' || (load.status === 'unavailable' && load.allocated) ? `${Math.abs(load.balance)}d over` : load.status === 'unavailable' ? 'No capacity' : load.balance === 0 ? 'At capacity' : `${load.balance}d open`}</span></div>
                    <div className="allocations">{draft.initiatives.map((initiative) => {
                      const value = draft.allocations.find((a) => a.personId === person.id && a.initiativeId === initiative.id && a.weekId === week.id)?.days ?? 0
                      return <label key={initiative.id} title={initiative.name}><i style={{ background: initiative.tone }} />{initiative.code}<input aria-label={`${person.name}, ${initiative.name}, ${week.label} person-days`} type="number" min="0" max="10" step="0.5" value={value || ''} placeholder="0" onChange={(event) => editAllocation(person.id, initiative.id, week.id, Number(event.target.value))} /></label>
                    })}</div>
                    <details className="constraints"><summary>{person.timeOff[week.id] || 0}d off · {person.commitments[week.id] || 0}d other</summary><div>
                      <label>Time off<input aria-label={`${person.name}, ${week.label} time off`} type="number" min="0" max={person.capacity[week.id]} step="0.5" value={person.timeOff[week.id] || ''} placeholder="0" onChange={(event) => editConstraint(person.id, week.id, 'timeOff', Number(event.target.value))} /></label>
                      <label>Other<input aria-label={`${person.name}, ${week.label} non-project commitments`} type="number" min="0" max={person.capacity[week.id]} step="0.5" value={person.commitments[week.id] || ''} placeholder="0" onChange={(event) => editConstraint(person.id, week.id, 'commitments', Number(event.target.value))} /></label>
                    </div></details>
                  </div></td>
                })}
              </tr>)}</tbody>
            </table></div> : <div className="empty-state"><Search size={28} /><h3>No team members found</h3><p>Try a name or role in this sample plan.</p><button className="text-button" onClick={() => setQuery('')}>Clear search</button></div>}
          </section>

          <section className="initiative-strip"><div><p className="eyebrow">Portfolio impact</p><h2>What the draft means for each initiative</h2></div>{draft.initiatives.map((initiative) => { const impact = initiativeImpact(draft, initiative); return <article key={initiative.id}><i style={{ background: initiative.tone }} /><span><b>{initiative.name}</b><small>{impact.total} person-days planned</small></span><em className={impact.atRisk ? 'risk' : 'clear'}>{impact.atRisk ? 'Capacity risk' : 'Covered'}</em></article> })}</section>
        </>}

        {view === 'scenarios' && <section className="narrative-page"><p className="eyebrow">Scenario control</p><h1>Baseline and draft stay distinct.</h1><p className="lede">The applied baseline is this browser's point of reference. Your draft contains {changes} changed allocation {changes === 1 ? 'cell' : 'cells'} and can be reset without altering the baseline.</p><div className="comparison"><article><span>01</span><h2>Applied baseline</h2><strong>{baseline.allocations.reduce((sum, item) => sum + item.days, 0)} days</strong><p>The last scenario explicitly applied in this browser.</p></article><article className="draft-card"><span>02</span><h2>Working draft</h2><strong>{draft.allocations.reduce((sum, item) => sum + item.days, 0)} days</strong><p>{changes ? `${changes} edits are waiting for review.` : 'No uncommitted allocation edits.'}</p></article></div><div className="scenario-actions"><button className="button secondary" onClick={() => setConfirmReset(true)}><RotateCcw size={17} />Reset sample data</button><button className="button primary" onClick={exportPlan}><Download size={17} />Export draft JSON</button></div>{resetSnapshot && <div className="reset-recovery" role="status"><span>Sample data was restored.</span><button className="text-button" onClick={restoreReset}>Undo reset and restore the prior scenario</button></div>}</section>}

        {view === 'about' && <section className="narrative-page"><p className="eyebrow">Independent sample</p><h1>A planning interaction, built to be examined.</h1><p className="lede">Resource Radar is a fictional portfolio artifact for Northstar, a fictional B2B SaaS company. It runs entirely in your browser, uses no authentication or paid service, and makes no connection to a production system.</p><div className="about-grid"><article><h2>My role as Product Manager</h2><p>I defined the product problem, prioritization and tradeoffs, requirements, workflows, fictional sample data, acceptance criteria, and evaluation plan. AI tools assisted with implementation and verification.</p></article><article><h2>What it does not claim</h2><p>The names, initiatives, usage, and decisions are sample data. Proposed metrics are targets, not measured outcomes. I did not manually write the application code.</p></article></div><a className="case-link" href="https://github.com/mvahedi2020/Resource-Radar/blob/main/docs/product/PRD.md">Read the PRD <ArrowUpRight size={18} /></a><a className="case-link" href="https://github.com/mvahedi2020/Resource-Radar/blob/main/docs/product/Case_Study.md">Read the product case study <ArrowUpRight size={18} /></a></section>}
      </main>
      <footer><span>Northstar sample · Data stays on this device</span><button onClick={() => setConfirmReset(true)}>Reset sample</button><button onClick={exportPlan}>Export draft</button></footer>
      {confirmReset && <div className="reset-backdrop" role="presentation"><section className="reset-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title"><p className="eyebrow">Reset sample plan</p><h2 id="reset-title">Restore the original fictional allocations?</h2><p>This replaces the applied baseline and working draft in this browser. Export the current draft first if you want to keep a copy.</p><div><button className="button secondary" ref={cancelResetRef} onClick={() => setConfirmReset(false)}>Keep current plan</button><button className="button primary" onClick={() => { reset(); setConfirmReset(false) }}>Reset sample data</button></div></section></div>}</div>
    </div>
  )
}
