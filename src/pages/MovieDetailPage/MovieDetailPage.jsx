import { useParams } from "react-router-dom"
import ReviewList from "../../components/ReviewList/ReviewList"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./MovieDetailPage.module.css"
import { useMovie } from "../../hooks/useMovie"

function MovieDetailPage() {
  const { movieId } = useParams()
  const { movie, loading, error } = useMovie(movieId)

  if (loading) {
    return (
      <StatusMessage
        title="Cargando detalle"
        description="Consultando la pelicula..."
      />
    )
  }

  if (error) {
    return (
      <StatusMessage
        title="Error al cargar detalle"
        description={error}
        variant="error"
      />
    )
  }

  return (
    <>
      {movie && (
        <main className={styles.page}>
          <p className={styles.label}>Detalle</p>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.meta}>
            {movie.director} · {movie.year} · {movie.genre}
          </p>
          <p className={styles.synopsis}>{movie.synopsis}</p>
          <ReviewList movieId={movieId} />
        </main>
      )}
    </>
  )
}

export default MovieDetailPage
