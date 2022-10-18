import axios from 'axios'
import Cookies from 'js-cookie'

// export const DilyorApiService= 'http://192.168.112:8080'
// export const BoburApiService= 'http://192.168.106:8080'
const herokuApiService = 'https://tashkec.herokuapp.com/'

const httpClient = axios.create({
  baseURL: herokuApiService,
  headers: {
    'Content-Type': 'application/json',
    'accept':'*/*'
  }
})

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error && error.response) {
      const { response: { status } } = error
      if (status === 401) {
        Cookies.remove('token')
        window.location.replace('/sign-in')
      } else if (status === 400) {
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

httpClient.interceptors.request.use((config) => {
  const token: string | undefined = Cookies.get('token')

  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
    return config
  }
  delete config?.headers?.Authorization
  return config
})

export default httpClient
