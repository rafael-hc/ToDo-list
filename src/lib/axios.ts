import { Axios } from 'axios'

// const baseUrl = process.env.BASE_URL

export const api = new Axios({
  baseURL: 'https://to-do-backend-psi.vercel.app/',
  headers: { 'Content-type': 'application/json' },
})
