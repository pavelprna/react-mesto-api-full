import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Изменить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label htmlFor="avatar-link-input" className="form__label">
        <input ref={avatarRef} type="url" name="avatar" id="avatar-link-input" placeholder="Ссылка на картинку"
          className="form__input" required />
        <span className="form__input-error form__input-error_visible avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}