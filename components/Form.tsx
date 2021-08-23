import axios from 'axios'
import React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ZackState } from 'typings/ZackState'

type Props = {
  state?: ZackState
  setOpen: (b: boolean) => void
}

type FormValue = {
  email: string
  msg: string
}

const Form: React.FC<Props> = ({ state, setOpen }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { register, handleSubmit } = useForm<FormValue>()
  const onSubmit: SubmitHandler<FormValue> = async (data, e) => {
    e?.preventDefault()
    const token = await executeRecaptcha('submit')
    if (!token) {
      toast.error('Invalid captcha 😳')
      return
    }
    try {
      await toast.promise(axios.post('/api/send', { ...data, token }), {
        loading: 'Sending your message to Zack...',
        error: 'Something went wrong! 😱',
        success: 'Zack has received your message!'
      })
    } catch (err) {
      console.error(err)
    } finally {
      setOpen(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {state?.state === 'sleeping'
                ? 'Get me to wake up'
                : 'Tell me to go to sleep'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              This will{' '}
              <a
                href="https://www.youtube.com/watch?v=AxhNTy3D4kU"
                className="text-teal-500 hover:text-teal-400"
              >
                spam
              </a>{' '}
              me with a huge burst of notifications delivered in about ~30
              seconds
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                E-mail
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    {...register('email', {
                      required: true,
                      pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/
                    })}
                    type="email"
                    autoComplete="email"
                    className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Message
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="message"
                  {...register('msg', {
                    validate: s => s.length < 500
                  })}
                  rows={3}
                  placeholder="WAKE UP!!!11!!!1!!"
                  className="max-w-lg shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
                  defaultValue={''}
                />
                <p className="text-left mt-2 text-sm text-gray-500">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a
                    className="text-teal-500 hover:text-teal-600"
                    href="https://policies.google.com/privacy"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    className="text-teal-500 hover:text-teal-600"
                    href="https://policies.google.com/terms"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Seal my fate
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
