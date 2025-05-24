import { ClockTime } from './clock-time.js'

/**
 * The default implementation of ClockTime.
 *
 * @since v1.0.0
 */
export class DefaultClockTime extends ClockTime {
    /**
     * The internal milliseconds of this ClockTime instance.
     */
    private internalMs: number

    /**
     * Creates a ClockTime instance.
     *
     * @param milliseconds - The number of milliseconds to initialize the
     *   ClockTime with.
     * @since v1.0.0
     */
    public constructor(milliseconds: number) {
        super()
        this.internalMs = milliseconds
    }

    public override get ms(): number {
        return this.internalMs
    }

    public override get second(): number {
        return (
            Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_SECOND) %
            ClockTime.SECOND_IN_MINUTE
        )
    }

    public override get minute(): number {
        return (
            Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_MINUTE) %
            ClockTime.MINUTE_IN_HOUR
        )
    }

    public override get hour(): number {
        return Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_HOUR)
    }

    public override consume(ms: number): this
    public override consume(clockTime: this): this
    public override consume(time: number | ClockTime): this {
        const ms = typeof time == 'number' ? time : (time as ClockTime).ms
        this.internalMs -= ms

        if (this.internalMs <= 0) {
            this.internalMs = 0
        }

        return this
    }

    public override extend(ms: number): this
    public override extend(clockTime: this): this
    public override extend(time: number | ClockTime): this {
        const ms = typeof time == 'number' ? time : (time as ClockTime).ms
        this.internalMs += ms

        return this
    }
}
