import { useInterval } from 'hooks/useInterval'
import React, { useState } from 'react'
import { FormatFunc } from 'typings/formatFunc'

type Props = {
  timezone: string
  format: FormatFunc
}

const DateTicker = ({ timezone, format }: Props) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  useInterval(() => setCurrentTime(new Date()), 1000)
  return <>{format(currentTime, timezone)}</>
}

export default DateTicker
