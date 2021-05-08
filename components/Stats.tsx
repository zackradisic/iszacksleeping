import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import React from 'react'

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

type Stat = {
  name: string
  stat: string
  previousStat?: string
  change?: string
  changeType?: 'increase' | 'decrease'
}

type Props = {
  stats: Stat[]
  title: string
  timeRange?: string
}

const Stats: React.FC<Props> = ({ stats, title, timeRange }) => {
  return (
    <div className="w-3/4">
      <h3 className="mt-8 lg:mt-4 text-lg text-center font-bold text-gray-50 sm:text-5xl sm:tracking-tight lg:text-xl lg:text-left">
        {title}{' '}
        <span className="text-sm text-gray-400 font-normal">{timeRange}</span>
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-gray-800 overflow-hidden shadow divide-y divide-gray-900 md:grid-cols-2 md:divide-y-0 md:divide-x">
        {stats.map(item => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-50">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-teal-500">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-400">
                  {item.changeType ? `from ${item.previousStat}` : ''}
                </span>
              </div>

              <div
                className={classNames(
                  !item.changeType
                    ? ''
                    : item.changeType === 'increase'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                )}>
                {!item.changeType ? (
                  ''
                ) : item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>{' '}
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Stats
