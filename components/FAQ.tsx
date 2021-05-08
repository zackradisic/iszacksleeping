import React from 'react'
const faqs = [
  {
    question: 'What is all of this?',
    answer: (
      <>
        <p>
          This was made in a day to track my sleep habits and see if people on
          the internet could hold me accountable to adhering to a fixed sleep
          routine.
        </p>
        <p>
          If you see me awake/asleep at an unfavorable hour, simply click the
          button above to notify me and a Slack bot will{' '}
          <a
            href="https://www.youtube.com/watch?v=AxhNTy3D4kU"
            className="text-teal-400 hover:text-teal-500">
            spam
          </a>{' '}
          my phone with notifications until I respond.
        </p>
      </>
    )
  },
  {
    question: 'Why is your sleep schedule so messed up...?',
    answer: (
      <>
        <p>
          I&apos;m currently in Saudi, my job/school requires me to be available
          at Canadian hours, and I&apos;m working on a startup with my
          co-founder{' '}
          <a
            href="https://twitter.com/CryogenicPlanet"
            className="text-teal-400 hover:text-teal-500">
            @CryogenicPlanet
          </a>{' '}
          who is based in India and has an equally discombobulating sleep
          schedule.
        </p>
      </>
    )
  }
]
const FAQ = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-50">
              Explaining this absurdity
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              You can also ask me questions on{' '}
              <a
                href="https://twitter.com/zackinsomnia"
                className="font-medium text-teal-500 hover:text-teal-400">
                Twitter
              </a>
              .
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-12">
              {faqs.map(faq => (
                <div key={faq.question}>
                  <dt className="text-lg leading-6 font-medium text-gray-50">
                    {faq.question}
                  </dt>
                  <dd className="faq-answer mt-2 text-base text-gray-400">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
