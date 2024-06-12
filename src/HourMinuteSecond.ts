export type HourMinuteSecondClass = new(...args: any[]) => HourMinuteSecond;

/**
 * @author James Chan
 */
export abstract class HourMinuteSecond {
    /**
     * The class of creating an instance using HourMinuteSecond.create() and other static methods.
     * @since 1.1.0
     * @private
     */
    private static staticInstantiateClass?: HourMinuteSecondClass = undefined

    // Commonly used constants.
    public static SECOND_IN_MINUTE = 60
    public static MINUTE_IN_HOUR = 60
    public static MILLISECONDS_IN_SECOND = 1000
    public static MILLISECONDS_IN_MINUTE = 60000
    public static MILLISECONDS_IN_HOUR = 3600000

    /**
     * Creates an instance of HourMinuteSecond.
     * @param ms
     */
    public static create(ms: number = 0): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(ms)
    }

    /**
     * Creates an hour-minute-second instance of specified milliseconds.
     * @param milliseconds
     * @since v1.2.0
     */
    public static of(milliseconds: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(milliseconds)
    }

    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    public static ofSeconds(seconds: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    public static ofMinutes(minutes: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    public static ofHours(hours: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Sets the static instantiate class.
     * @param staticInstantiateClass
     */
    public static setStaticInitiateClass(staticInstantiateClass: HourMinuteSecondClass): void {
        HourMinuteSecond.staticInstantiateClass = staticInstantiateClass
    }

    /**
     * Returns time in milliseconds.
     */
    public abstract get ms(): number

    /**
     * Returns the hour.
     */
    public abstract get hour(): number

    /**
     * Returns the minute.
     */
    public abstract get minute(): number

    /**
     * Returns the second.
     */
    public abstract get second(): number

    /**
     * Consumes a time.
     * @param hourMinuteSecond the time to consume.
     */
    public abstract consume(hourMinuteSecond: HourMinuteSecond): this
    /**
     * Consumes a time.
     * @param ms time in milliseconds.
     */
    public abstract consume(ms: number): this
    /**
     * Consumes a time.
     * @param time hour-minute-second instance or time in milliseconds to consume.
     */
    public abstract consume(time: number | HourMinuteSecond): this

    /**
     * Extends a time.
     * @param hourMinuteSecond the time to consume.
     */
    public abstract extend(hourMinuteSecond: this): this
    /**
     * Extends a time.
     * @param ms time in milliseconds to extend.
     */
    public abstract extend(ms: number): this
    /**
     * Extends a time.
     * @param time hour-minute-second instance or time in milliseconds to extend.
     */
    public abstract extend(time: number | HourMinuteSecond): this

    /**
     * Returns a clone object.
     */
    public abstract clone(): HourMinuteSecond;

    /**
     * Consumes time in seconds.
     * @param seconds seconds to consume.
     */
    public consumeSecond(seconds: number): this {
        return this.consume(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Consumes time in minutes;
     * @param minutes minutes to consume.
     */
    public consumeMinute(minutes: number): this {
        return this.consume(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Consumes time in hours;
     * @param hours hours to consume.
     */
    public consumeHour(hours: number): this {
        return this.consume(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Extends time in seconds.
     * @param seconds seconds to extend.
     */
    public extendSecond(seconds: number): this {
        return this.extend(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Extends time in minutes;
     * @param minutes minutes to extend.
     */
    public extendMinute(minutes: number): this {
        return this.extend(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Extends time in hours;
     * @param hours hours to extend.
     */
    public extendHour(hours: number): this {
        return this.extend(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Converts this hour-minute-second instance to string.
     * @see moment
     */
    public toString(format: string = 'hh:mm:ss'): string {
        const h = this.hour.toString()
        const m = this.minute.toString()
        const s = this.second.toString()
        const hh = h.padStart(2, '0')
        const mm = m.padStart(2, '0')
        const ss = s.padStart(2, '0')

        return format.toLowerCase()
            .replace('hh', hh)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('h', h)
            .replace('m', m)
            .replace('s', s)
    }

    /**
     * Converts this hour-minute-second instance to seconds.
     * @since v1.2.0
     */
    public toSeconds(): number {
        return this.ms / HourMinuteSecond.MILLISECONDS_IN_SECOND
    }

    /**
     * Converts this hour-minute-second instance to minutes.
     * @since v1.2.0
     */
    public toMinutes(): number {
        return this.ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE
    }

    /**
     * Converts this hour-minute-second instance to hours.
     * @since v1.2.0
     */
    public toHours(): number {
        return this.ms / HourMinuteSecond.MILLISECONDS_IN_HOUR
    }

    /**
     * Converts this hour-minute-second instance to seconds (floor value).
     * @since v1.2.0
     */
    public toSecondsInt(): number {
        return Math.floor(this.toSeconds())
    }

    /**
     * Converts this hour-minute-second instance to minutes (floor value).
     * @since v1.2.0
     */
    public toMinutesInt(): number {
        return Math.floor(this.toMinutes())
    }

    /**
     * Converts this hour-minute-second instance to hours (floor value).
     * @since v1.2.0
     */
    public toHoursInt(): number {
        return Math.floor(this.toHours())
    }
}
