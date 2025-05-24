import { DefaultClockTime } from '../src/index.js';
describe('Test SlowHourMinuteSecond.', function () {
    it('Test getting hours, minutes, and seconds.', function () {
        const clockTime = new DefaultClockTime(4532500);
        expect(clockTime.hour).toBe(1);
        expect(clockTime.minute).toBe(15);
        expect(clockTime.second).toBe(32);
    });
    it('Test consume and extend.', function () {
        const clockTime = new DefaultClockTime(4532000);
        clockTime.extend(1200);
        expect(clockTime.hour).toBe(1);
        expect(clockTime.minute).toBe(15);
        expect(clockTime.second).toBe(33);
        clockTime.consume(329000);
        expect(clockTime.hour).toBe(1);
        expect(clockTime.minute).toBe(10);
        expect(clockTime.second).toBe(4);
    });
    it('Test consume and extend.', function () {
        const clockTime = new DefaultClockTime(4532000);
        clockTime.extend(new DefaultClockTime(8245000));
        expect(clockTime.hour).toBe(3);
        expect(clockTime.minute).toBe(32);
        expect(clockTime.second).toBe(57);
        clockTime.consume(new DefaultClockTime(4040000));
        expect(clockTime.hour).toBe(2);
        expect(clockTime.minute).toBe(25);
        expect(clockTime.second).toBe(37);
        // Consume more than internal milliseconds
        clockTime.consume(9999999999);
        expect(clockTime.ms).toBe(0);
    });
    it('Test toString.', function () {
        expect(new DefaultClockTime(30008000).toString()).toBe('08:20:08');
        expect(new DefaultClockTime(387000).toString('mm:ss')).toBe('06:27');
    });
    it('Test of.', function () {
        expect(DefaultClockTime.ofSeconds(100).second).toBe(40);
        expect(DefaultClockTime.ofMinutes(50).minute).toBe(50);
        expect(DefaultClockTime.ofHours(10).hour).toBe(10);
    });
});
