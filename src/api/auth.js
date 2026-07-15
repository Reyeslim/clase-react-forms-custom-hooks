import apiClient from "./axios"

export async function loginUser(credentials) {
  const response = await apiClient.post("/login", credentials)
  return response.data
}

export async function registerUser(credentials) {
  const response = await apiClient.post("/register", credentials)
  return response.data
}
