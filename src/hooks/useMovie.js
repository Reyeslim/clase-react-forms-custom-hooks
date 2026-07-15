import { useEffect, useState } from "react"
import { getMovieById } from "../api/movies"

export function useMovie(movieId) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true)
        setError("")
        const data = await getMovieById(movieId)
        setMovie(data)
      } catch (fetchError) {
        setError("No se pudo cargar la pelicula.")
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [movieId])

  return { movie, loading, error }
}
