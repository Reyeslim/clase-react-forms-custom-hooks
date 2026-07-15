import { useEffect, useState } from "react"
import { getMovies } from "../api/movies"

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        setError("")
        const data = await getMovies()
        setMovies(data)
      } catch (fetchError) {
        setError("No se pudo cargar el catalogo.")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return { movies, loading, error }
}
