function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_content_place-image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_content_place-image">
        <button onClick={onClose} className="popup__close button"/>
        <figure className="view-fullscreen">
          <img src={card?.link} alt={card?.name} className="view-fullscreen__image"/>
          <figcaption
            className="view-fullscreen__caption">{card?.name} — {card?.owner.name}, {card?.owner.about}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
