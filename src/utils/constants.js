const MOVIES_API_URL = "https://api.nomoreparties.co/";
const MAIN_API_URL = "https://movies-svetlanadelrey.nomoredomains.work";

const ERROR_MESSAGE = {
    BAD_REQUEST: 'Данные неверны',
    CONFLICT: 'Пользователь с данным email уже существует',
    SERVER_ERROR: 'На сервере произошла ошибка',
    KEYWORD: 'Нужно ввести ключевое слово',
    NOT_FOUND: 'Ничего не найдено',
    USER_NOT_FOUND: 'Пользователь не найден',
    SUCCESS: 'Данные успешно обновлены',
};

const MAX_DURATION = 40;

const SCREEN_WIDTH = {
    DESKTOP_WIDTH: 1280,
    TABLET_WIDTH: 768,
    MOBILE_WIDTH: 320,
    VERTICAL_WIDTH: 480,
}

const MAX_NUMBER_OF_CARDS = {
    DESKTOP_NUMBER: 3,
    TABLET_NUMBER: 2,
    VERTICAL_SCREEN_NUMBER: 5,
}

export {
    MOVIES_API_URL,
    MAIN_API_URL,
    ERROR_MESSAGE,
    MAX_DURATION,
    SCREEN_WIDTH,
    MAX_NUMBER_OF_CARDS
};