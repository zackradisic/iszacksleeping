import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            Made with ❤️ by{' '}
            <a
              href="https://twitter.com/zackinsomnia"
              className="text-teal-400 hover:text-teal-500">
              @zackinsomnia
            </a>
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            View this site&apos;s source code on{' '}
            <a
              href="https://github.com/zackradisic/iszacksleeping"
              className="text-teal-400 hover:text-teal-500">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
