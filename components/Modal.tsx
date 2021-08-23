import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { ZackState } from 'typings/ZackState'

type Props = {
  open: boolean
  setOpen: (b: boolean) => void
  state?: ZackState
}

const DynamicForm = dynamic(() => import('../components/Form'))

const Modal: React.FC<Props> = ({ open, setOpen, state }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition
          show={open}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 "
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </Transition>

        <Transition
          show={open}
          enter="ease-out duration-300"
          enterFrom="opacity-100 translate-y-0 sm:scale-100"
          enterTo="opacity-100 translate-y-0 sm:scale-100 "
          leave="transition duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <div className="mt-2">
                  <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                      <DynamicForm setOpen={setOpen} state={state} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-900 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Go back
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Modal
