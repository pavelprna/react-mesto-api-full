import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import PageLoader from "./PageLoader";
import Header from "./Header";
import { Link } from "react-router-dom";

function Main({ cards, onCardLike, onCardDelete, onCardClick, onEditProfile, onEditAvatar, onAddPlace, onLogout, userEmail, isLoaded }) {
  const currentUser = React.useContext(CurrentUserContext);

  return !isLoaded
    ? <PageLoader />
    : (
      <>
        <Header>
          <p className="header__email">{userEmail}</p>
          <Link to="/logout" onClick={onLogout} className='header__link link'>Выйти</Link>
        </Header>
        <main className="content">

          <section className="profile">
            <button
              onClick={onEditAvatar}
              className="button profile__avatar-button">
              <img src={currentUser.avatar} alt=" " className="profile__avatar" />
            </button>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button button" />
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              onClick={onAddPlace}
              type="button" className="profile__add-button button" />
          </section>

          <section className="elements" aria-label="Карточки мест">
            <ul className="elements__list">
              {cards.map(item => {
                return (
                  <Card
                    card={item}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    key={item._id}
                  />
                )
              })}
            </ul>
          </section>

        </main>
      </>
    )
}

export default Main;
