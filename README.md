# [Better Clock Time](https://github.com/TypingHare/better-clock-time/)

Better Clock Time is a lightweight, intuitive TypeScript library designed to simplify working with clock-style durations. It offers a clean and expressive API for creating, manipulating, and formatting time represented in milliseconds. Whether you're dealing with milliseconds, seconds, minutes, or hours, Better Clock Time makes it easy to construct and adjust time values with chainable methods like .extend() and .consume().

With convenient accessors for hours, minutes, and seconds, as well as custom string formatting and conversion utilities, this library is ideal for applications involving timers, countdowns, scheduling, and more—without the overhead of a full date-time solution.

## Create Clock Time

```typescript
import { ClockTime } from 'better-clock-time'

// Create a ClockTime instance with 12345 milliseconds
ClockTime.of(12345)

// By default, the time is set to 0 milliseconds
ClockTime.of()

// Create a ClockTime instance with 100 seconds
ClockTime.ofSeconds(100)

// Create a ClockTime instance with 80 minutes
ClockTime.ofMinutes(80)

// Create a ClockTime instance with 5 hours
ClockTime.ofHours(5)
```

## Access Time

```typescript
import { ClockTime } from 'better-clock-time'

// It represents 01:15:32
const clockTime = ClockTime.of(4532500)

// Print the milliseconds, which should be 4532500
console.log(clockTime.ms)

// Print the second, which should be 32
console.log(clockTime.second)

// Print the minute, which should be 15
console.log(clockTime.minute) // 15

// Print the hour, which should be 1
console.log(clockTime.hour) // 1
```

## Consume Time

Consuming time reduces a ClockTime instance's internal time by the given time.

```typescript
import { ClockTime } from 'better-clock-time'

const clockTime = ClockTime.of()

// Extend 500 milliseconds
clockTime.extend(500)

// Extend 20 seconds
clockTime.extendSecond(20)

// Extend 5 minutes
clockTime.extendMinute(5)

// Extend 1 hour
clockTime.extendHour(1)

// You can pass another ClockTimeInstance
clockTime.extend(ClockTime.of(35000))

// Supports chaining programming
clockTime.extendHour(1).extendMinute(5).extendSecond(20)
```

## Extend Time

Extending time increases a ClockTime instance's internal time by the given time.

```typescript
import { ClockTime } from 'better-clock-time'

const clockTime = ClockTime.of(10000000)

// Consume 500 milliseconds
clockTime.consume(500)

// Consume 20 seconds
clockTime.consumeSecond(20)

// Consume 5 minutes
clockTime.consumeMinute(5)

// Consume 1 hour
clockTime.consumeHour(1)

// You can pass another ClockTimeInstance
clockTime.consume(ClockTime.of(35000))

// Supports chaining programming
clockTime.consumeHour(1).consumeMinute(5).consumeSecond(20)
```

## Clone Time

```typescript
import { ClockTime } from 'better-clock-time'

const clockTime = ClockTime.of(500)
const clonedClockTime = time.clone()

clockTime.extend(500)

// The `clonedClockTime` is not affected and thus the ms is still 500
console.log(clonedClockTime.ms)
```

## toString

```typescript
import { ClockTime } from 'better-clock-time'

// This ClockTime instance represents 1:15:32
const clockTime = new SlowHourMinuteSecond(4532500)

// The toString() method is overried; this will output `01:15:32`
console.log(clockTime)

// You can specify the format of the string
// The following will output `01-15-32`
console.log(clockTime.toString('hh-mm-ss'))
```

## To Seconds, Minutes, and Hours

```typescript
import { ClockTime } from 'better-clock-time'
const clockTIme = ClockTIme.of(75048245)

// 75048.245
console.log(time.toSeconds())

// 1250.8040833333334
console.log(time.toMinutes())

// 20.846734722222223
console.log(time.toHours())
```

```typescript
import { ClockTime } from 'better-clock-time'

const clockTIme = ClockTIme.of(75048245)

// 75048
console.log(time.toSecondsInt()) // >> 75048

// 1250
console.log(time.toMinutesInt())

// 20
console.log(time.toHoursInt())
```
