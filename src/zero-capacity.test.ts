import {expect,it} from 'vitest';
import {samplePlan} from './data';
import {initiativeImpact} from './logic';
it('flags an initiative assigned to a person with zero availability',()=>{const person={...samplePlan.people[0],capacity:{w1:0},timeOff:{},commitments:{}};const initiative=samplePlan.initiatives[0];const plan={...samplePlan,people:[person],allocations:[{personId:person.id,initiativeId:initiative.id,weekId:'w1',days:1}]};expect(initiativeImpact(plan,initiative).atRisk).toBe(true);});
