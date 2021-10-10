import { useState } from "react"

export default function Login({ title, buttonText, onLogin }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values)
  }

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <main className="content">
      <form className="form auth__form" onSubmit={handleSubmit}>
        <h2 className="form__title auth__title">{title}</h2>
        <label htmlFor="email-input" className="form__label">
          <input type="email" name="email" value={values.email} id="email-input" placeholder="Email" className="form__input auth__input"
            required onChange={handleChange} />
          <span className="form__input-error form__input-error_visible name-input-error"></span>
        </label>
        <label htmlFor="about-input" className="form__label">
          <input type="password" name="password" value={values.password} id="pessword-input" placeholder="Пароль" className="form__input auth__input" minLength="5" maxLength="30"
            required onChange={handleChange} />
          <span className="form__input-error form__input-error_visible about-input-error"></span>
        </label>
        <button type="submit" className="form__submit-button auth__button button">{buttonText}</button>
      </form>
    </main>
  )
}