import { ClockTime } from './clock-time.js'
import { DefaultClockTime } from './default-clock-time.js'

export * from './clock-time.js'
export * from './default-clock-time.js'

ClockTime.instantiateClass = DefaultClockTime
