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

// Карта
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Метки объявлений
var mapPins = document.querySelector('.map__pins');

// Блок фильтрации объявлений
var mapFilters = document.querySelector('.map__filters-container');

// Шаблон метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Шаблон карточки
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Функция создания массива чисел
var createNumbersArray = function (count) {
  var numbers = [];

  for (var i = 1; i <= count; i++) {
    numbers.push(i);
  }

  return numbers;
};

// [1, 2, 3, 4, 5, 6, 7, 8]
var numbersArray = createNumbersArray(COUNT);

// Функция генерации случайного числа
var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

// Функция возвращает случайный удалённый элемент массива
var getNumberImg = function () {
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

// Функция создания объекта
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

// Функция отрисовки меток объявлений
var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// Добавление элементов с метками на страницу
var documentfragment = document.createDocumentFragment();
var announcements = createAnnouncements(COUNT);

for (var j = 0; j < announcements.length; j++) {
  documentfragment.appendChild(renderPin(announcements[j]));
}
mapPins.appendChild(documentfragment);

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
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var liElement = document.createElement('li');
    liElement.classList.add('popup__feature', 'popup__feature--' + features[i]);
    fragment.appendChild(liElement);
  }

  return fragment;
};

// Функция создания списка с фото
var getPhotoList = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var imgElement = document.createElement('img');
    imgElement.classList.add('popup__photo');
    imgElement.src = photos[i];
    imgElement.width = 45;
    imgElement.height = 40;
    imgElement.alt = 'Фотография жилья';
    fragment.appendChild(imgElement);
  }

  return fragment;
};

// Функция отрисовки карточки объявления
var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var liNodeList = cardElement.querySelectorAll('.popup__feature');
  cardElement.querySelector('.popup__photo').remove();

  for (var i = 0; i < liNodeList.length; i++) {
    liNodeList[i].remove();
  }

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getHousingType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomWordEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestWordEnding(card.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').appendChild(getFeatureList(card.offer.features));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(getPhotoList(card.offer.photos));
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

// Вставка карточки на страницу
var announcementCard = renderCard(announcements[0]);
map.insertBefore(announcementCard, mapFilters);
