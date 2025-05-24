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
export abstract class ClockTime {
    // Commonly used constants
    public static readonly SECOND_IN_MINUTE = 60
    public static readonly MINUTE_IN_HOUR = 60
    public static readonly MILLISECONDS_IN_SECOND = 1000
    public static readonly MILLISECONDS_IN_MINUTE = 60000
    public static readonly MILLISECONDS_IN_HOUR = 3600000

    /**
     * The class extending ClockTime that is used to create an instance.
     */
    public static instantiateClass?: new (milliseconds: number) => ClockTime

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
    public static of(milliseconds: number = 0): ClockTime {
        if (!ClockTime.instantiateClass) {
            throw new Error('ClockTime insntantiate class is not defined.')
        }

        return new ClockTime.instantiateClass(milliseconds)
    }

    /**
     * Creates a new ClockTime instance from the specified number of seconds.
     *
     * @param seconds - The number of seconds.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    public static ofSeconds(seconds: number): ClockTime {
        return ClockTime.of(seconds * ClockTime.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates a new ClockTime instance from the specified number of minutes.
     *
     * @param minutes - The number of minutes.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    public static ofMinutes(minutes: number): ClockTime {
        return ClockTime.of(minutes * ClockTime.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates a new ClockTime instance from the specified number of hours.
     *
     * @param hours - The number of hours.
     * @returns A new instance of ClockTime representing the given time.
     * @since v1.0.0
     */
    public static ofHours(minutes: number): ClockTime {
        return ClockTime.of(minutes * ClockTime.MILLISECONDS_IN_HOUR)
    }

    /**
     * Creates a copy of the current ClockTime instance.
     *
     * @returns A new ClockTime instance with the same millisecond value.
     * @since v1.0.0
     */
    public clone(): ClockTime {
        return ClockTime.of(this.ms)
    }

    /**
     * Returns the milliseconds this ClockTime instance represents.
     *
     * @returns The milliseconds this ClockTime instance represents.
     * @since v1.0.0
     */
    public abstract get ms(): number

    /**
     * Gets the second component of this ClockTime instance.
     *
     * @returns The seconds part of the time, from `0` to `59`.
     * @since v1.0.0
     */
    public abstract get second(): number

    /**
     * Gets the minute component of this ClockTime instance.
     *
     * @returns The minutes part of the time, from `0` to `59`.
     * @since v1.0.0
     */
    public abstract get minute(): number

    /**
     * Gets the hour component of this ClockTime instance.
     *
     * @returns The hours part of the time.
     * @since v1.0.0
     */
    public abstract get hour(): number

    /**
     * Consumes time by reducing the internal value by the given milliseconds.
     *
     * @param ms - The number of milliseconds to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public abstract consume(ms: number): this
    /**
     * Consumes time by reducing the internal value by the given amount.
     *
     * The number of milliseconds of the ClockTime instance will consume.
     *
     * @param clockTime - A ClockTime instance to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public abstract consume(clockTime: ClockTime): this
    /**
     * Consumes time by reducing the internal value by the given amount.
     *
     * @param time - The amount of time to consume, as milliseconds or a
     *   ClockTime instance.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public abstract consume(time: number | ClockTime): this

    /**
     * Extends time by increasing the internal value by the given milliseconds.
     *
     * @param ms - The number of milliseconds to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public abstract extend(ms: number): this
    /**
     * Extends time by increasing the internal value by the given amount.
     *
     * The number of milliseconds of the ClockTime instance will extend.
     *
     * @param clockTime - A ClockTime instance to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public abstract extend(clockTime: ClockTime): this
    /**
     * Extends time by increasing the internal value by the given amount.
     *
     * @param time - The amount of time to extend, as milliseconds or a
     *   ClockTime instance.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public abstract extend(time: number | ClockTime): this

    /**
     * Consumes time by subtracting the specified number of seconds.
     *
     * @param seconds - The number of seconds to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public consumeSecond(seconds: number): this {
        return this.consume(seconds * ClockTime.MILLISECONDS_IN_SECOND)
    }

    /**
     * Consumes time by subtracting the specified number of minutes.
     *
     * @param minutes - The number of minutes to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public consumeMinute(minutes: number): this {
        return this.consume(minutes * ClockTime.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Consumes time by subtracting the specified number of hours.
     *
     * @param hours - The number of hours to consume.
     * @returns The current instance after consuming the specified time.
     * @since v1.0.0
     */
    public consumeHour(hours: number): this {
        return this.consume(hours * ClockTime.MILLISECONDS_IN_HOUR)
    }

    /**
     * Extends time by increasing the specified number of seconds.
     *
     * @param seconds - The number of seconds to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public extendSecond(seconds: number): this {
        return this.extend(seconds * ClockTime.MILLISECONDS_IN_SECOND)
    }

    /**
     * Extends time by increasing the specified number of minutes.
     *
     * @param minutes - The number of minutes to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public extendMinute(minutes: number): this {
        return this.extend(minutes * ClockTime.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Extends time by increasing the specified number of hours.
     *
     * @param hours - The number of hours to extend.
     * @returns The current instance after extending the specified time.
     * @since v1.0.0
     */
    public extendHour(hours: number): this {
        return this.extend(hours * ClockTime.MILLISECONDS_IN_HOUR)
    }

    /**
     * Returns the time value in seconds as a floating-point number.
     *
     * @returns The number of seconds represented by this ClockTime instance.
     * @since v1.0.0
     */
    public toSeconds(): number {
        return this.ms / ClockTime.MILLISECONDS_IN_SECOND
    }

    /**
     * Returns the time value in minutes as a floating-point number.
     *
     * @returns The number of minutes represented by this ClockTime instance.
     * @since v1.0.0
     */
    public toMinutes(): number {
        return this.ms / ClockTime.MILLISECONDS_IN_MINUTE
    }

    /**
     * Returns the time value in hours as a floating-point number.
     *
     * @returns The number of hours represented by this ClockTime instance.
     * @since v1.0.0
     */
    public toHours(): number {
        return this.ms / ClockTime.MILLISECONDS_IN_HOUR
    }

    /**
     * Returns the time value in whole seconds by flooring the result.
     *
     * @returns The floored number of seconds represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    public toSecondsInt(): number {
        return Math.floor(this.toSeconds())
    }

    /**
     * Returns the time value in whole minutes by flooring the result.
     *
     * @returns The floored number of minutes represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    public toMinutesInt(): number {
        return Math.floor(this.toMinutes())
    }

    /**
     * Returns the time value in whole hours by flooring the result.
     *
     * @returns The floored number of hours represented by this ClockTime
     *   instance.
     * @since v1.0.0
     */
    public toHoursInt(): number {
        return Math.floor(this.toHours())
    }

    /**
     * Converts this ClockTime instance into a string.
     *
     * @returns A clock time string in the specified format.
     * @since v1.0.0
     */
    public toString(format: string = 'hh:mm:ss'): string {
        const h = this.hour.toString()
        const m = this.minute.toString()
        const s = this.second.toString()
        const hh = h.padStart(2, '0')
        const mm = m.padStart(2, '0')
        const ss = s.padStart(2, '0')

        return format
            .toLowerCase()
            .replace('hh', hh)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('h', h)
            .replace('m', m)
            .replace('s', s)
    }
}
