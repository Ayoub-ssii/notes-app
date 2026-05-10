import axios from 'axios'

// Hna nhadhrou el axios mte3na elli bech nastaamlouh f ay blasa f el app
// El baseURL houwa el trik el asasi mte3 el backend
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Hna n'zidou el token mte3na l ay request bech n'baathouha lel backend
// Interceptor request bech yethabet f localStorage w yzid el Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Hna nthabtou f el response elli jeya mel backend
// Ken rjaalna error 401 (yaani mahouch mconnecti wala token wfet), nhazouh direct lel login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
