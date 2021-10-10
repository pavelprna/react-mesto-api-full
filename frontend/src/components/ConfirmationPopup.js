import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({ card, isOpen, onClose, onConfirm }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onConfirm(card);
  }

  return (
    <PopupWithForm
      name='confirmation'
      title={'Вы уверены?'}
      buttonText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} />
  )
}