import {
    HourMinuteSecond,
    QuickHourMinuteSecond,
    SlowHourMinuteSecond,
} from '../src'

describe('Test HourMinuteSecond', () => {
    it('Test the create method.', () => {
        const slowTime = HourMinuteSecond.create(1000)
        expect(slowTime).toBeInstanceOf(SlowHourMinuteSecond)

        HourMinuteSecond.setStaticInitiateClass(QuickHourMinuteSecond)
        const quickTime = HourMinuteSecond.create(1000)
        expect(quickTime).toBeInstanceOf(QuickHourMinuteSecond)

        // Test passing no parameters
        const time = HourMinuteSecond.create()
        expect(time.ms).toBe(0)
    })

    it('Test ofSeconds, ofMinutes, and ofHours.', () => {
        const time1 = HourMinuteSecond.ofSeconds(32)
        const time2 = HourMinuteSecond.ofMinutes(15)
        const time3 = HourMinuteSecond.ofHours(1)

        expect(time1.second).toBe(32)
        expect(time2.minute).toBe(15)
        expect(time3.hour).toBe(1)
    })

    it('Test toSecondsInt, toMinutesInt, and toHoursInt', () => {
        const time1 = HourMinuteSecond.of(1342942)
        expect(time1.toSecondsInt()).toBe(1342)
        expect(time1.toMinutesInt()).toBe(22)
        expect(time1.toHoursInt()).toBe(0)

        const time2 = HourMinuteSecond.of(75048245)
        expect(time2.toSecondsInt()).toBe(75048)
        expect(time2.toMinutesInt()).toBe(1250)
        expect(time2.toHoursInt()).toBe(20)
    })
})
