import { Axios } from 'axios'

const baseUrl = process.env.BASE_URL

export const api = new Axios({
  baseURL: baseUrl,
  headers: { 'Content-type': 'application/json' },
})
