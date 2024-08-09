import { HourMinuteSecond } from './HourMinuteSecond.js'
import { SlowHourMinuteSecond } from './SlowHourMinuteSecond.js'

export * from './HourMinuteSecond.js'
export * from './QuickHourMinuteSecond.js'
export * from './SlowHourMinuteSecond.js'

HourMinuteSecond.setStaticInitiateClass(SlowHourMinuteSecond)
