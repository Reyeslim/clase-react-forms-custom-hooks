import { useEffect, useState } from "react"
import { getReviewsByMovieId } from "../api/reviews"

export function useReviews(movieId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true)
        setError("")
        const data = await getReviewsByMovieId(movieId)
        setReviews(data)
      } catch (fetchError) {
        setError("No se pudieron cargar las reviews")
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [movieId])

  return { reviews, loading, error }
}
