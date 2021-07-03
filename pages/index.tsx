import DateTicker from '@components/DateTicker'
import FAQ from '@components/FAQ'
import Footer from '@components/Footer'
import Modal from '@components/Modal'
import SleepyZs from '@components/SleepyZs'
import Stats from '@components/Stats'
import axios from 'axios'
import { format, formatDistance } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import { ZackState } from 'typings/ZackState'

export const getServerSideProps: GetServerSideProps = async ctx => ({
  props: {
    spam: ctx.query.spam !== undefined
  }
})

const IndexPage = ({
  spam
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, error } = useSWR<ZackState, number>(
    '/api/is',
    async (url: string) => {
      try {
        const { data } = await axios.get<ZackState>(url)
        return data
      } catch (err) {
        throw err.response?.status ? err.response.status : 500
      }
    }
  )
  const [open, setOpen] = useState<boolean>(spam)
  const [zackState, setZackState] = useState<ZackState | undefined>()

  useEffect(() => {
    if (data) setZackState(data)
    if (error)
      setZackState({
        timezone: 'Asia/Riyadh',
        state: 'doing something',
        date: Date.now()
      })
  }, [data, error])

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
      <div className="bg-gray-900">
        <Toaster />
        <div className="z-50 max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center h-full">
          <div className="text-center">
            <h1 className="mt-1 text-4xl font-extrabold text-gray-50 sm:text-5xl sm:tracking-tight lg:text-6xl">
              iszacksleeping.com
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
              Zack&apos;s time is{' '}
              <b className="text-gray-200">
                {!zackState ? (
                  'loading..'
                ) : (
                  <DateTicker
                    timezone={zackState.timezone}
                    format={(time, timezone) =>
                      format(zonedTimeToUtc(time, timezone), 'h:mm a')
                    }
                  />
                )}
              </b>
            </p>
          </div>

          <div className="flex justify-center items-center mt-12">
            <ul className="space-y-4 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:grid-cols-1 lg:gap-8 shadow-md">
              <li
                key="Zack"
                className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                <div className="space-y-6 xl:space-y-10">
                  <div className="space-y-0 space-x-0 relative">
                    {!zackState ? (
                      ''
                    ) : zackState!.state === 'sleeping' ? (
                      <SleepyZs className="absolute inset-3/4 bg-gray-700" />
                    ) : (
                      ''
                    )}
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 shadow-md"
                      src="/zack.jpeg"
                      alt="Zack"
                    />
                  </div>
                  <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-gray-400 font-normal">Zack is...</h3>
                      <p className="text-green-400 xl:w-3/4">
                        {!zackState
                          ? 'loading...'
                          : zackState!.state[0].toUpperCase() +
                            zackState!.state.slice(1)}
                      </p>
                      <p className="text-gray-400 text-sm font-normal">
                        {!zackState ? (
                          'loading...'
                        ) : (
                          <DateTicker
                            timezone={zackState.timezone}
                            format={(time, _) =>
                              formatDistance(zackState.date, time, {
                                addSuffix: true
                              })
                            }
                          />
                        )}
                      </p>
                    </div>

                    <ul className="flex justify-center space-x-5">
                      <li>
                        <a
                          href="https://twitter.com/zackinsomnia"
                          className="text-gray-400 hover:text-blue-500">
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="pt-12">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="cursor-pointer z-50 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              {!zackState
                ? 'loading...'
                : zackState!.state === 'sleeping'
                ? 'Wake Zack up'
                : 'Tell Zack to go to bed'}
            </button>
          </div>
          {/* Hard coded stats for now ( ͡° ͜ʖ ͡°) */}
          <Stats
            title="Desired Sleep Cycle"
            stats={[
              {
                name: 'Waking time',
                stat: '7:30 PM'
              },
              {
                name: 'Sleeping time',
                stat: '10:30 AM'
              }
            ]}
          />
          <Stats
            title="Current Sleep Cycle"
            timeRange="avg. from last 30 days"
            stats={[
              {
                name: 'Waking time',
                stat: '7:45 PM',
                previousStat: '8:00 PM',
                change: '15 min',
                changeType: 'decrease'
              },
              {
                name: 'Sleeping time',
                stat: '11:21 AM',
                previousStat: '12:11 AM',
                change: '50 min',
                changeType: 'decrease'
              }
            ]}
          />
          <FAQ />
        </div>
        {open ? <Modal state={zackState} open={open} setOpen={setOpen} /> : ''}
      </div>
      <Footer />
    </GoogleReCaptchaProvider>
  )
}

export default IndexPage
