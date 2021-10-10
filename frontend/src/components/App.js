import { useEffect, useState } from "react";
import { Switch, Route, withRouter, Link, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import tooltipIconOk from "../images/logo/tooltip-ok.svg";
import tooltipIconError from "../images/logo/tooltip-error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState({ icon: "", message: "" });
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogined) {
      auth.checkToken()
        .then((res) => {
          Promise.all([api.getUser(), api.getInitialCards()])
            .then(([user, cards]) => {
              setCurrentUser(user.user);
              setCards(cards);
              setIsLogined(true);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoaded(true));
        })
        .catch((err) => console.log(err));

      // eslint-disable-next-line
    }
  }, [isLogined]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    const closeByClick = (e) => {
      if (e.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    };

    document.addEventListener("mousedown", closeByClick);

    return () => document.removeEventListener("mousedown", closeByClick);
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const confirmCardDelete = (card) => {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);
  };

  const handleUpdateUser = (data) => {
    api.updateUser(data)
      .then((user) => {
        setCurrentUser(user.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data)
      .then((user) => {
        setCurrentUser(user.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api.createCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleSignUp = (userData) => {
    auth.signUp(userData)
      .then((json) => {
        if (json?.user) {
          setUserEmail(json.user.email);
          setTooltipData({
            icon: tooltipIconOk,
            message: "Вы успешно зарегистрировались!",
          });
          setIsTooltipOpen(true);
          setIsLogined(true)
        }
      })
      .then(() => history.push('/'))
      .catch((error) => {
        setTooltipData({
          icon: tooltipIconError,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsTooltipOpen(true);
        console.log(error);
      });
  };

  const handleSignIn = (userData) => {
    auth.signIn(userData)
      .then(() => {
        setUserEmail(userData.email);
        setIsLogined(true);
      })
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    auth.logout()
      .then(() => {
        history.push("sign-in");
        setUserEmail("");
        setIsLogined(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/sign-up">
            <Header>
              <Link to="/sign-in" className="header__link link">
                Войти
              </Link>
            </Header>
            <Register
              title="Регистрация"
              buttonText="Зарегистрироваться"
              onRegister={handleSignUp}
            />
          </Route>
          <Route path="/sign-in">
            <Header>
              <Link to="/sign-up" className="header__link link">
                Регистрация
              </Link>
            </Header>
            <Login title="Вход" buttonText="Войти" onLogin={handleSignIn} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={isLogined}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={confirmCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onLogout={handleLogout}
            isLoaded={isLoaded}
            userEmail={userEmail}
            component={Main}
          />
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmationPopup
          card={selectedCard}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          data={tooltipData}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
