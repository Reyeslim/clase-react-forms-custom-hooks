import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./LoginPage.module.css"
import { loginUser } from "../../api/auth"

function LoginPage() {
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev, // spread operator copia los datos que ya había
      [name]: value, // actualizar solo el campo que cambió
      // name='email'    → actualiza formData.email
      // name='password' → actualiza formData.password
      // Si el usuario estaba escribiendo en el input donde name="email",
      // esto se convierte mágicamente en email: value.
      // Si cambia al input donde name="password",
      // se convierte en password: value.
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault() // evita la recarga
    setError("")

    if (!formData.email || !formData.password) {
      setError("Email y contraseña son obligatorios.")
      return
    }

    try {
      setIsSubmitting(true)
      await loginUser(formData)
      navigate("/")
    } catch (submitError) {
      setError("Login incorrecto o backend no disponible")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Login</p>
        <h2 className={styles.title}>Acceder a la aplicacion</h2>

        {error && (
          <StatusMessage
            title="No se pudo iniciar sesion"
            description={error}
            variant="error"
          />
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              value={formData.email}
              placeholder="tu@email.com"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="******"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cargando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
