import React from 'react'

type Props = {
  className?: string
}

const SleepyZs: React.FC<Props> = ({ className }) => {
  return (
    <div id="sleeping" className={className}>
      <div className="sleeping-bubble">
        <div className="char1">Z</div>
        <div className="char2">Z</div>
        <div className="char3">Z</div>
        <div className="triangle"></div>
      </div>
    </div>
  )
}

export default SleepyZs
