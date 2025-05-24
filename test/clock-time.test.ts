import { ClockTime, DefaultClockTime } from '../src/index.js'

describe('Test HourMinuteSecond', () => {
    it('Test the of method.', () => {
        expect(() => {
            ClockTime.instantiateClass = undefined
            ClockTime.of(1000)
        }).toThrow(Error)

        ClockTime.instantiateClass = DefaultClockTime
        const slowTime = ClockTime.of(1000)
        expect(slowTime).toBeInstanceOf(DefaultClockTime)

        // Test passing no parameters
        const time = ClockTime.of()
        expect(time.ms).toBe(0)
    })

    it('Test clone.', function () {
        const clockTime = ClockTime.of(30030000)
        const clonedClcokTime = clockTime.clone()

        clockTime.consume(117000)

        expect(clonedClcokTime.hour).toBe(8)
        expect(clonedClcokTime.minute).toBe(20)
        expect(clonedClcokTime.second).toBe(30)
    })

    it('Test ofSeconds, ofMinutes, and ofHours.', () => {
        const time1 = ClockTime.ofSeconds(32)
        expect(time1.second).toBe(32)
        expect(time1.minute).toBe(0)
        expect(time1.hour).toBe(0)

        const time2 = ClockTime.ofMinutes(15)
        expect(time2.second).toBe(0)
        expect(time2.minute).toBe(15)
        expect(time2.hour).toBe(0)

        const time3 = ClockTime.ofHours(1)
        expect(time3.second).toBe(0)
        expect(time3.minute).toBe(0)
        expect(time3.hour).toBe(1)
    })

    it('Test consumeSecond, consumeMinute, and consumeHour', () => {
        const time = ClockTime.ofHours(2)

        time.consumeSecond(20)
        expect(time.second).toBe(40)
        expect(time.minute).toBe(59)
        expect(time.hour).toBe(1)

        time.consumeMinute(10)
        expect(time.second).toBe(40)
        expect(time.minute).toBe(49)
        expect(time.hour).toBe(1)

        time.consumeHour(1)
        expect(time.second).toBe(40)
        expect(time.minute).toBe(49)
        expect(time.hour).toBe(0)
    })

    it('Test extendSecond, extendMinute, and extendHour', () => {
        const time = ClockTime.ofHours(1)

        time.extendSecond(20)
        expect(time.second).toBe(20)
        expect(time.minute).toBe(0)
        expect(time.hour).toBe(1)

        time.extendMinute(10)
        expect(time.second).toBe(20)
        expect(time.minute).toBe(10)
        expect(time.hour).toBe(1)

        time.extendHour(1)
        expect(time.second).toBe(20)
        expect(time.minute).toBe(10)
        expect(time.hour).toBe(2)
    })

    it('Test toSecondsInt, toMinutesInt, and toHoursInt', () => {
        const time1 = ClockTime.of(1342942)
        expect(time1.toSecondsInt()).toBe(1342)
        expect(time1.toMinutesInt()).toBe(22)
        expect(time1.toHoursInt()).toBe(0)

        const time2 = ClockTime.of(75048245)
        expect(time2.toSecondsInt()).toBe(75048)
        expect(time2.toMinutesInt()).toBe(1250)
        expect(time2.toHoursInt()).toBe(20)
    })
})
