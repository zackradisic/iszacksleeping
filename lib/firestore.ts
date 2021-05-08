import { Firestore } from '@google-cloud/firestore'

export const firestore = new Firestore({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  credentials: {
    client_email: process.env.NEXT_PUBLIC_EMAIL,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY
  }
})
