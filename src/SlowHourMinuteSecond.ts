import { HourMinuteSecond } from './HourMinuteSecond.js'

/**
 * @author James Chan
 */
export class SlowHourMinuteSecond extends HourMinuteSecond {
    /**
     * Creates a slow hour minute second.
     * @param ms time in milliseconds.
     */
    public constructor(ms: number) {
        super()
        this._ms = ms
    }

    /**
     * Milliseconds.
     * @private
     */
    private _ms: number

    public override get ms(): number {
        return this._ms
    }

    public override get hour(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    public override get minute(): number {
        return (
            Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE) %
            HourMinuteSecond.MINUTE_IN_HOUR
        )
    }

    public override get second(): number {
        return (
            Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND) %
            HourMinuteSecond.SECOND_IN_MINUTE
        )
    }

    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    public static ofSeconds(seconds: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(
            seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND
        )
    }

    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    public static ofMinutes(minutes: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(
            minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE
        )
    }

    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    public static ofHours(hours: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(
            hours * HourMinuteSecond.MILLISECONDS_IN_HOUR
        )
    }

    public override consume(hourMinuteSecond: HourMinuteSecond): this
    public override consume(ms: number): this
    public override consume(time: number | HourMinuteSecond): this {
        const ms =
            typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms -= ms

        return this
    }

    public override extend(hourMinuteSecond: HourMinuteSecond): this
    public override extend(ms: number): this
    public override extend(time: number | HourMinuteSecond): this {
        const ms =
            typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms += ms

        return this
    }

    public override clone(): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(this._ms)
    }
}
