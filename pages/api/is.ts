import { firestore } from 'lib/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return await post(req, res)
    case 'GET':
      return await get(req, res)
    default:
      return res.status(405).send('Unsupported method')
  }
}

const get = async (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${60}, stale-while-revalidate=${43200}`
  )
  try {
    const result = await firestore
      .collection('state')
      .orderBy('date', 'desc')
      .limit(1)
      .get()

    if (result.empty && !result.docs[0].exists)
      return res.status(404).json({ err: 'Not found' })

    const { timezone, state, date } = result.docs[0].data()!
    res.status(200).json({
      timezone,
      state,
      date
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error occurred')
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const header = req.headers.authorization
  if (!(header && header !== process.env.NEXT_PUBLIC_PASSWORD)) {
    return res.status(401).send('Unauthorized')
  }
  const { timezone, state } = req.body
  if (!timezone || !state) {
    return res.status(400).send('Timezone or state is required')
  }

  try {
    await firestore.collection('state').add({
      timezone,
      state,
      date: Date.now()
    })
    res.status(200).send('Ok')
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error occurred')
  }
}

export default handler
