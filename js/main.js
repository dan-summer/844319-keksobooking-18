'use strict';

var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var TITLES = [
  'Милый дом',
  'Уютное местечко',
  'Шикарный пентхаус',
  'Стильный лофт',
  'Семейное гнёздышко',
  'Шикарный вид',
  'Модное место',
  'Берлога'
];
var ADDRESSES = [
  '600, 350',
  '300, 150',
  '210, 450',
  '310, 130',
  '600, 400',
  '700, 270',
  '450, 650',
  '10, 350'
];
var PRICES = [1000, 2000, 5000, 10000, 15000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4, 5, 6];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = 'Описание';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = document.querySelector('.map__overlay').offsetWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 62;
var COUNT = 8;
var ENTER_KEYCODE = 13;

var map = document.querySelector('.map'); // Карта
var mainMapPin = map.querySelector('.map__pin--main'); // Главная метка
var mapPins = document.querySelector('.map__pins'); // Метки объявлений
var mapFilters = document.querySelector('.map__filters-container'); // Блок фильтрации объявлений
var mapFiltersForm = mapFilters.querySelector('.map__filters'); // Форма фильтраци объявлений
var filterFormSelects = mapFiltersForm.querySelectorAll('select'); // Селекторы формы фильтрации объявлений
var announcementForm = document.querySelector('.ad-form'); // Форма подачи объявления
var announcementFormFieldsets = document.querySelectorAll('fieldset'); // Блоки границ у формы подачи объявлений
var addressInput = announcementForm.querySelector('#address'); // Поле ввода адреса на форме подачи объявлений
var roomsCountSelector = announcementForm.querySelector('#room_number'); // Селектор выбора колличества комнат
var questsCountSelector = announcementForm.querySelector('#capacity'); // Селектор выбора колличества гостей
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон метки
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card'); // Шаблон карточки

var PIN_TOP = parseInt(mainMapPin.style.top, 10);
var PIN_LEFT = parseInt(mainMapPin.style.left, 10);
var PIN_SHARD_END_HEIGHT = 22;

// Функция создания массива чисел
var createNumbersArray = function (count) {
  var numbers = [];

  for (var i = 1; i <= count; i++) {
    numbers.push(i);
  }

  return numbers;
};

// Функция генерации случайного числа
var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

// Функция возвращает случайный удалённый элемент массива
var getNumberImg = function () {
  var numbersArray = createNumbersArray(COUNT);
  var index = getRandomNumber(numbersArray.length);
  var value = numbersArray.splice(index, 1);

  return value[0];
};

// Функция генерации случайного элемента массива
var getRandomArrayElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

// Функция генерации случайного массива
var getRandomArray = function (arr) {
  var copiedArr = arr.slice();
  var count = getRandomNumber(arr.length);

  var newArray = [];

  for (var i = 0; i < count; i++) {
    var index = getRandomNumber(copiedArr.length);
    newArray.push(copiedArr[index]);
    copiedArr.splice(index, 1);
  }

  return newArray;
};

// Функция генерации случайного числа в диапазоне
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция создания объекта объявления
var createAnnouncement = function () {
  return {
    author: {
      avatar: AVATAR_PATH + getNumberImg() + AVATAR_EXTENSION
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: getRandomArrayElement(ADDRESSES),
      price: getRandomArrayElement(PRICES),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomArrayElement(ROOMS),
      guests: getRandomArrayElement(GUESTS),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: getRandomInRange(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomInRange(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
};

// Функция добавления объявлений в массив
var createAnnouncements = function (count) {
  var announcements = [];

  for (var i = 0; i < count; i++) {
    announcements.push(createAnnouncement());
  }

  return announcements;
};

// Функция создания метки объявления
var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// Добавление элементов с метками на страницу
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var announcements = createAnnouncements(COUNT);

  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(createPin(announcements[i]));
  }
  mapPins.appendChild(fragment);
};

// renderPins();

/* -------------------- module3task3 (6. Личный проект: больше деталей) -------------------- */

// Функция выбора типа жилья
var getHousingType = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  }

  return 'Дворец';
};

// Функция правильного окончания слова "Комната"
var getRoomWordEnding = function (rooms) {
  if (rooms === 1) {
    return ' комната';
  }
  if (rooms >= 2 && rooms <= 4) {
    return ' комнаты';
  }

  return ' комнат';
};

// Функция правильного окончания слова "Гость"
var getGuestWordEnding = function (quests) {
  if (quests === 1) {
    return ' гостя';
  }

  return ' гостей';
};

// Функция создания списка удобств
var getFeatureList = function (features) {
  var liElementString = '';

  for (var i = 0; i < features.length; i++) {
    liElementString += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
  }

  return liElementString;
};

// Функция создания списка с фото
var getPhotoList = function (photos) {
  var imgElementString = '';

  for (var i = 0; i < photos.length; i++) {
    imgElementString += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return imgElementString;
};

// Функция отрисовки карточки объявления
var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getHousingType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomWordEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestWordEnding(card.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = getFeatureList(card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = getPhotoList(card.offer.photos);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

// Вставка карточки на страницу
var renderCard = function () {
  var announcements = createAnnouncements(COUNT);
  var announcementCard = createCard(announcements[0]);
  map.insertBefore(announcementCard, mapFilters);
};

// renderCard();

/* --------------------------- module4-task2 8. (Личный проект: подробности) ---------------------------*/

// Функция отключения полей ввода
var disableInputTags = function (select, fieldset) {
  for (var i = 0; i < select.length; i++) {
    select[i].setAttribute('disabled', 'disabled');
  }
  for (i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute('disabled', 'disabled');
  }
};

disableInputTags(filterFormSelects, announcementFormFieldsets);

// Функция включения полей ввода
var enableInputTags = function (select, fieldset) {
  for (var i = 0; i < select.length; i++) {
    select[i].removeAttribute('disabled', 'disabled');
  }
  for (i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled', 'disabled');
  }
};

// Функция активации страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  announcementForm.classList.remove('ad-form--disabled');
  getPinSharpEndCoordinate();
  getInputsValidation(roomsCountSelector, questsCountSelector);
};

// Событие mousedown на главной метке
mainMapPin.addEventListener('mousedown', function () {
  activatePage();
  enableInputTags(filterFormSelects, announcementFormFieldsets);
});

// Событие нажатия Enter по главной метке
mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
    enableInputTags(filterFormSelects, announcementFormFieldsets);
  }
});

// Функция нахождения координат центра главной метки
var getPinCenterCoordinate = function () {
  addressInput.setAttribute('value', Math.round(PIN_LEFT + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP + PIN_HEIGHT / 2));
};

getPinCenterCoordinate();

// Функция нахождения координат острого конца главной метки
var getPinSharpEndCoordinate = function () {
  addressInput.setAttribute('value', Math.round(PIN_LEFT + PIN_WIDTH / 2) + ', ' + Math.round(PIN_TOP + PIN_HEIGHT + PIN_SHARD_END_HEIGHT));
};

// var roomsCountSelector = announcementForm.querySelector('#room_number'); // Селектор выбора колличества комнат
// var questsCountSelector = announcementForm.querySelector('#capacity'); // Селектор выбора колличества гостей

// Функция валидации соответствия колличества комнат от колличества гостей
var getInputsValidation = function (roomsSelector, questsSelector) {
  if (questsSelector.value !== questsSelector.options[2].value) {
    roomsSelector.setCustomValidity('1 комната — "для 1 гостя"');
  } else if (questsSelector.value !== questsSelector.options[1].value || questsSelector.value !== questsSelector.options[2].value) {
    roomsSelector.setCustomValidity('2 комнаты — "для 2 гостей" или "для 1 гостя"');
  } else if (questsSelector.value !== questsSelector.options[0].value || questsSelector.value !== questsSelector.options[1].value || questsSelector.value !== questsSelector.options[2].value) {
    roomsSelector.setCustomValidity('3 комнаты — "для 3 гостей", "для 2 гостей" или "для 1 гостя"');
  } else if (questsSelector.value !== questsSelector.options[3].value) {
    roomsSelector.setCustomValidity('100 комнат — "не для гостей"');
  } else {
    roomsSelector.setCustomValidity('');
  }
};

questsCountSelector.addEventListener('change', function () {
  getInputsValidation(roomsCountSelector, questsCountSelector);
});
