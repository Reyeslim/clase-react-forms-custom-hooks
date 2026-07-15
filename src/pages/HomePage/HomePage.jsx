import MovieGrid from "../../components/MovieGrid/MovieGrid"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import { useMovies } from "../../hooks/useMovies"
import styles from "./HomePage.module.css"

function HomePage() {
  const { movies, loading, error } = useMovies()
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 2</p>
        <h2 className={styles.title}>
          Custom hooks y formularios sobre datos reales
        </h2>
        <p className={styles.copy}>
          El listado ya funciona, pero la logica de fetch se esta repitiendo y
          toca refactorizar.
        </p>
      </section>

      {loading && (
        <StatusMessage
          title="Cargando peliculas"
          description="Consultando el backend..."
        />
      )}

      {error && (
        <StatusMessage
          title="Error al cargar"
          description={error}
          variant="error"
        />
      )}

      {!loading && !error && <MovieGrid movies={movies} />}
    </main>
  )
}

export default HomePage
