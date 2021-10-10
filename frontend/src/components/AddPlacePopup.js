import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({
    name: '',
    link: ''
  });

  useEffect(() => {
    setValues({
      name: '',
      link: ''
    });
  }, [isOpen]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name={'add-card'}
      title={'Новое место'}
      buttonText={'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} >
      <label htmlFor="place-name-input" className="form__label">
        <input type="text" name="name" value={values.name} onChange={handleChange} id="place-name-input" placeholder="Название" className="form__input"
          minLength="2" required />
        <span className="form__input-error form__input-error_visible place-name-input-error"></span>
      </label>
      <label htmlFor="place-link-input" className="form__label">
        <input type="url" name="link" value={values.link} onChange={handleChange} id="place-link-input" placeholder="Ссылка на картинку"
          className="form__input" required />
        <span className="form__input-error form__input-error_visible place-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}