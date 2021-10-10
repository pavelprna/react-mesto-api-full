export default function InfoTooltip({ data, isOpen, onClose }) {
  return (
    <div className={`popup popup_content_tooltip ${isOpen?'popup_opened':''}`}>
      <div className="popup__container popup__container_content_tooltip">
        <button
          onClick={onClose}
          className="popup__close button"
        />
        <img src={data.icon} alt="Иконка состояния авторизации" className="popup__icon"/>
        <p className="popup__message">{data.message}</p>
      </div>
    </div>
  )
}