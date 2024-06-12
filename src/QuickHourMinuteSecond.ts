import {HourMinuteSecond} from './HourMinuteSecond'

/**
 * @author James Chan
 */
export class QuickHourMinuteSecond extends HourMinuteSecond {
    private _ms: number
    private _second: number = 0
    private _minute: number = 0

    /**
     * Creates a quick hour minute second.
     * @param ms time in milliseconds.
     */
    public constructor(ms: number);
    /**
     * Creates a quick hour minute second.
     * @param hour hours.
     * @param minute minutes.
     * @param second seconds.
     */
    public constructor(hour: number, minute: number, second: number);
    public constructor(hour: number, minute ?: number, seconds?: number) {
        super()

        if (minute === undefined || seconds === undefined) {
            this._ms = hour

            this.compute()
        } else {
            this._hour = hour
            this._minute = minute
            this._second = seconds

            this._ms = this._hour * HourMinuteSecond.MILLISECONDS_IN_HOUR +
                this._minute * HourMinuteSecond.MILLISECONDS_IN_MINUTE +
                this.second * HourMinuteSecond.MILLISECONDS_IN_SECOND
        }
    }

    public override get ms(): number {
        return this._ms
    }

    public override get second(): number {
        return this._second
    }

    public override get minute(): number {
        return this._minute
    }

    /**
     * Hours.
     * @private
     */
    private _hour: number = 0

    public override get hour(): number {
        return this._hour
    }

    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    public static ofSeconds(seconds: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    public static ofMinutes(minutes: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    public static ofHours(hours: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    public override consume(hourMinuteSecond: HourMinuteSecond): this;
    public override consume(ms: number): this;
    public override consume(time: number | HourMinuteSecond): this {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms = Math.max(this._ms - ms, 0)
        this.compute()

        return this
    }

    public override extend(hourMinuteSecond: HourMinuteSecond): this;
    public override extend(ms: number): this;
    public override extend(time: number | HourMinuteSecond): this {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms += ms
        this.compute()

        return this
    }

    public override clone(): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(this._ms)
    }

    /**
     * Computes hours, minutes, and seconds.
     * @private
     */
    private compute(): void {
        this._hour = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
        this._minute = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE) % HourMinuteSecond.MINUTE_IN_HOUR
        this._second = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND) % HourMinuteSecond.SECOND_IN_MINUTE
    }
}
