
import  axios from 'axios'
const API_URL = "http://localhost:4000/api/session"

export const startSession = async(sessionData)=>{
    const response =  await axios.post(`${API_URL}/start`,sessionData)
    return response.data
}

export  const pauseSession= async(id)=>{
    const response  = await axios.put(`${API_URL}/pause/${id}`)
    return response.data
}

export const resumeSession = async(id)=>{
  const response  =  await axios.put(`${API_URL}/resume/${id}`)
  return response.data
}

