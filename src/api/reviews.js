import apiClient from "./axios"

export async function getReviewsByMovieId(movieId) {
  const response = await apiClient.get(`/reviews/movie/${movieId}`)
  return response.data.data
}
