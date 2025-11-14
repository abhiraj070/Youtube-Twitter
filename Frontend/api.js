import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, 
})


api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const { token } = JSON.parse(user)
        if (token) {
          config.headers.Authorization = "Bearer ${token}"
          console.log('🔑 Token attached to request:', token.substring(0, 20) + '...')
        } else {
          console.warn('⚠ No token found in user data')
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    } else {
      console.log('📭 No user data in localStorage')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - clearing user data')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
}

export const userAPI = {
  getProfile: (userId) => api.get("/users/${userId}"),
  updateProfile: (userId, data) => api.put("/users/${userId}", data),
}


export const videoAPI = {
  getAllVideos: (params) => api.get('/videos', { params }),
  getVideo: (videoId) => api.get("/videos/${videoId}"),
  createVideo: (data) => api.post('/videos', data),
  likeVideo: (videoId) => api.post("/videos/${videoId}/like"),
}


export const postAPI = {
  getAllPosts: (params) => api.get('/posts', { params }),
  getPost: (postId) => api.get("/posts/${postId}"),
  createPost: (data) => api.post('/posts', data),
  updatePost: (postId, data) => api.put("/posts/${postId}", data),
  deletePost: (postId) => api.delete("/posts/${postId}"),
  likePost: (postId) => api.post("/posts/${postId}"/like),
}


export const commentAPI = {
  getComments: (resourceType, resourceId) => 
    api.get("/comments/${resourceType}/${resourceId}"),
  createComment: (resourceType, resourceId, content) => 
    api.post("/comments/${resourceType}/${resourceId}", { content }),
}

export default api