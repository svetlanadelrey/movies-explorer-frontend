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

export { MOVIES_API_URL, MAIN_API_URL, ERROR_MESSAGE };