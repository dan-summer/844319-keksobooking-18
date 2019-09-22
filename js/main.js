'use strict';

var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXTENSHION = '.png';
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
var LOCATION_X_MAX = 890;
var LOCATION_X_MIN = 130;
var LOCATION_Y_MAX = 630;
var COUNT = 8;

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

// Функция генерации случайного числа в диапазоне
// var getRandomInRange = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// Функция генерации случайного массива
var getRandomArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
	var j = Math.floor(Math.random() * (i + 1));
	var temp = arr[j];
	arr[j] = arr[i];
	arr[i] = temp;
  }

  return arr.slice(getRandomNumber(arr.length), arr.length);
};

// Функция создания объекта
var createAnnouncement = function () {
  return {
    author: {
      avatar: AVATAR_PATH + getNumberImg() + AVATAR_EXTENSHION
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: getRandomArrayElement(ADDRESS),
      price: getRandomArrayElement(PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomArrayElement(ROOMS),
      guests: getRandomArrayElement(GUESTS),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomArray(FEATURES),
      description: 'Описание',
      photos:
    },
    location: {
      x:
      y:
    }
  };
};
