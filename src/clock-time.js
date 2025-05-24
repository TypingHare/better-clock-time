/**
 * Represents an abstract concept of a clock-based time value.
 *
 * This class serves as the base abstraction for working with time values
 * represented in milliseconds, offering comprehensive utilities to convert
 * between time units (seconds, minutes, hours), and to perform arithmetic
 * operations such as extending or consuming time.
 *
 * `ClockTime` is designed to be subclassed, requiring concrete implementations
 * to define how the time value is stored and manipulated. Key properties
 * like `ms`, `second`, `minute`, and `hour`, as well as operations like
 * `consume()` and `extend()`, are left abstract to allow for flexibility
 * in various contexts (e.g., timers, clocks, durations).
 *
 * This class also provides a factory-based instantiation mechanism via
 * `instantiateClass`, enabling controlled and uniform creation of instances
 * using `ClockTime.of(...)` style methods.
 *
 * @example
 *
 *     ClockTime.instantiateClass = MyClockTime;
 *     const t = ClockTime.ofMinutes(90);
 *     console.log(t.toHours()); // 1.5
 *
 * @since v1.0.0
 */
export class ClockTime {
    // Commonly used constants
    static SECOND_IN_MINUTE = 60;
    static MINUTE_IN_HOUR = 60;
    static MILLISECONDS_IN_SECOND = 1000;
    static MILLISECONDS_IN_MINUTE = 60000;
    static MILLISECONDS_IN_HOUR = 3600000;
    /**
     * The class extending ClockTime that is used to create an instance.
     */
    static instantiateClass;
    /**
     * Creates a new ClockTime instance from the specified number of
     * milliseconds.
     *
     * @param milliseconds - The number of milliseconds to initialize the
     *   ClockTime with.
     * @returns A new instance of ClockTime.
     * @throws {Error} If the `instantiateClass` static property is not defined.
     * @since v1.0.0
     */
    static of(milliseconds = 0) {
        if (!ClockTime.instantiateClass) {
            throw new Error('ClockTime insntantiate class is not defined.');
        }
        return new ClockTime.instantiateClass(milliseconds);
    }
    /**
     * Creates a new ClockTime instance from the specified number of seconds.
     *
     * @param seconds - The number of seconds.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    static ofSeconds(seconds) {
        return ClockTime.of(seconds * ClockTime.MILLISECONDS_IN_SECOND);
    }
    /**
     * Creates a new ClockTime instance from the specified number of minutes.
     *
     * @param minutes - The number of minutes.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    static ofMinutes(minutes) {
        return ClockTime.of(minutes * ClockTime.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Creates a new ClockTime instance from the specified number of hours.
     *
     * @param hours - The number of hours.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    static ofHours(minutes) {
        return ClockTime.of(minutes * ClockTime.MILLISECONDS_IN_HOUR);
    }
    /**
     * Creates a copy of the current ClockTime instance.
     *
     * @returns A new ClockTime instance with the same millisecond value.
     * @since v1.0.0
     */
    clone() {
        return ClockTime.of(this.ms);
    }
    /**
     * Consumes time by subtracting the specified number of seconds.
     *
     * @param seconds - The number of seconds to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    consumeSecond(seconds) {
        return this.consume(seconds * ClockTime.MILLISECONDS_IN_SECOND);
    }
    /**
     * Consumes time by subtracting the specified number of minutes.
     *
     * @param minutes - The number of minutes to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    consumeMinute(minutes) {
        return this.consume(minutes * ClockTime.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Consumes time by subtracting the specified number of hours.
     *
     * @param hours - The number of hours to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    consumeHour(hours) {
        return this.consume(hours * ClockTime.MILLISECONDS_IN_HOUR);
    }
    /**
     * Extends time by increasing the specified number of seconds.
     *
     * @param seconds - The number of seconds to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    extendSecond(seconds) {
        return this.extend(seconds * ClockTime.MILLISECONDS_IN_SECOND);
    }
    /**
     * Extends time by increasing the specified number of minutes.
     *
     * @param minutes - The number of minutes to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    extendMinute(minutes) {
        return this.extend(minutes * ClockTime.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Extends time by increasing the specified number of hours.
     *
     * @param hours - The number of hours to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    extendHour(hours) {
        return this.extend(hours * ClockTime.MILLISECONDS_IN_HOUR);
    }
    /**
     * Returns the time value in seconds as a floating-point number.
     *
     * @returns The number of seconds represented by this ClockTime instance.
     * @since v1.0.0
     */
    toSeconds() {
        return this.ms / ClockTime.MILLISECONDS_IN_SECOND;
    }
    /**
     * Returns the time value in minutes as a floating-point number.
     *
     * @returns The number of minutes represented by this ClockTime instance.
     * @since v1.0.0
     */
    toMinutes() {
        return this.ms / ClockTime.MILLISECONDS_IN_MINUTE;
    }
    /**
     * Returns the time value in hours as a floating-point number.
     *
     * @returns The number of hours represented by this ClockTime instance.
     * @since v1.0.0
     */
    toHours() {
        return this.ms / ClockTime.MILLISECONDS_IN_HOUR;
    }
    /**
     * Returns the time value in whole seconds by flooring the result.
     *
     * @returns The floored number of seconds represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    toSecondsInt() {
        return Math.floor(this.toSeconds());
    }
    /**
     * Returns the time value in whole minutes by flooring the result.
     *
     * @returns The floored number of minutes represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    toMinutesInt() {
        return Math.floor(this.toMinutes());
    }
    /**
     * Returns the time value in whole hours by flooring the result.
     *
     * @returns The floored number of hours represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    toHoursInt() {
        return Math.floor(this.toHours());
    }
    /**
     * Converts this ClockTime instance into a string.
     *
     * @returns A clock time string in the specified format.
     * @since v1.0.0
     */
    toString(format = 'hh:mm:ss') {
        const h = this.hour.toString();
        const m = this.minute.toString();
        const s = this.second.toString();
        const hh = h.padStart(2, '0');
        const mm = m.padStart(2, '0');
        const ss = s.padStart(2, '0');
        return format
            .toLowerCase()
            .replace('hh', hh)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('h', h)
            .replace('m', m)
            .replace('s', s);
    }
}
