import axios from 'axios'
import { firestore } from 'lib/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

type CaptchaResponse = {
  success: boolean
  // eslint-disable-next-line camelcase
  challenge_ts: string
  hostname: string
  'error-codes': any[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, msg, token } = req.body
    const {
      data: { success }
    } = await axios.post<CaptchaResponse>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET}&response=${token}`
    )
    if (!success) throw new Error('Failed captcha verification')
    await Promise.all([
      firestore.collection('messages').add({ email, msg, date: Date.now() }),
      axios.post(process.env.NEXT_PUBLIC_BOT_URL!, {
        author: email,
        msg: msg
      })
    ])
    res.status(200).json({ msg: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
