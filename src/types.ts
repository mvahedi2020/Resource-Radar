export type Week = { id: string; label: string; dates: string }
export type Initiative = { id: string; name: string; code: string; tone: string }
export type Person = {
  id: string
  name: string
  role: string
  initials: string
  capacity: Record<string, number>
  timeOff: Record<string, number>
  commitments: Record<string, number>
}
export type Allocation = { personId: string; initiativeId: string; weekId: string; days: number }
export type Plan = { people: Person[]; initiatives: Initiative[]; weeks: Week[]; allocations: Allocation[] }
export type LoadCell = {
  capacity: number
  unavailable: number
  available: number
  allocated: number
  balance: number
  status: 'open' | 'full' | 'overloaded' | 'unavailable'
}
