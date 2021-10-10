function PopupWithForm(props) {

  return (
    <div className={`popup popup_content_${props.name} ${props.isOpen?'popup_opened':''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close button"
        />
        <form className="form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="form__submit-button button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
