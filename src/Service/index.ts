import axios from 'axios'
import Cookies from 'js-cookie'

const httpClient = axios.create({})


httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response) {
      const { response: { status } } = error
      if (status === 401) {
        Cookies.remove('token')
        Cookies.remove('refresh-token')
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
