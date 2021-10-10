import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
    const [values, setValues] = useState({ name: '', about: '' });
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
      setValues({
        name: (currentUser.name || ''),
        about: (currentUser.about || ''),
      });
    }, [currentUser, isOpen]);

    const handleChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
    }

    return (
        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
          <label htmlFor="name-input" className="form__label">
            <input type="text" name="name" value={values.name} id="name-input" placeholder="Имя" className="form__input" minLength="2" maxLength="40"
                  required onChange={handleChange} />
            <span className="form__input-error form__input-error_visible name-input-error"></span>
          </label>
          <label htmlFor="about-input" className="form__label">
            <input type="text" name="about" value={values.about} id="about-input" placeholder="Занятие" className="form__input" minLength="2" maxLength="200"
                  required onChange={handleChange} />
            <span className="form__input-error form__input-error_visible about-input-error"></span>
          </label>
        </PopupWithForm>
    )
}