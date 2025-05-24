import { ClockTime } from './clock-time.js';
/**
 * The default implementation of ClockTime.
 *
 * @since v1.0.0
 */
export class DefaultClockTime extends ClockTime {
    /**
     * The internal milliseconds of this ClockTime instance.
     */
    internalMs;
    /**
     * Creates a ClockTime instance.
     *
     * @param milliseconds - The number of milliseconds to initialize the
     *   ClockTime with.
     * @since v1.0.0
     */
    constructor(milliseconds) {
        super();
        this.internalMs = milliseconds;
    }
    get ms() {
        return this.internalMs;
    }
    get second() {
        return (Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_SECOND) %
            ClockTime.SECOND_IN_MINUTE);
    }
    get minute() {
        return (Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_MINUTE) %
            ClockTime.MINUTE_IN_HOUR);
    }
    get hour() {
        return Math.floor(this.internalMs / ClockTime.MILLISECONDS_IN_HOUR);
    }
    consume(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this.internalMs -= ms;
        if (this.internalMs <= 0) {
            this.internalMs = 0;
        }
        return this;
    }
    extend(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this.internalMs += ms;
        return this;
    }
}
