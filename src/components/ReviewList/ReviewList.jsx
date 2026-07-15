import { useReviews } from "../../hooks/useReviews"
import StatusMessage from "../StatusMessage/StatusMessage"
import styles from "./ReviewList.module.css"

function ReviewList({ movieId }) {
  const { reviews, loading, error } = useReviews(movieId)

  if (loading) {
    return (
      <StatusMessage
        title="Cargando reviews"
        description="Consultando opiniones de usuarios..."
      />
    )
  }

  if (error) {
    return (
      <StatusMessage
        title="Error al cargar reviews"
        description={error}
        variant="error"
      />
    )
  }

  if (reviews.length === 0) {
    return (
      <StatusMessage
        title="Sin reviews"
        description="La pelicula existe, pero todavia no tiene valoraciones."
      />
    )
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Reviews</h3>
      <div className={styles.list}>
        {reviews.map((review) => (
          <article className={styles.card} key={review.id}>
            <p className={styles.rating}>Rating: {review.rating}/10</p>
            <p className={styles.comment}>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ReviewList
