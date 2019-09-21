'use strict';

var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXTENSHION = '.png';
var TITLE = 'Заголовок предложения';
var ADDRESS = '600, 350';
var PRICE = 30000;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = 2;
var GUESTS = 3;
var CHECK = ['12:00', '13:00', '14:00'];
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

var getNumbersArray = function (count) {
  var numbers = [];
  for (var i = 1; i <= count; i++) {
    numbers.push(i);
  }

  return numbers;
};

var numbersArray = getNumbersArray(COUNT); // [1, 2, 3, 4, 5, 6, 7, 8]

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

var getNumberImg = function () {
  var index = getRandomNumber(numbersArray.length);
  var value = numbersArray.splice(index, 1);

  return value[0];
};

var createAnnouncement = function () {
  return {
    author: {
      avatar: AVATAR_PATH + getNumberImg() + AVATAR_EXTENSHION
    },
    offer: {
      title:
      address:
      price:
      type:
      rooms:
      guests:
      checkin:
      checkout:
      features:
      description:
      photos:
    },
    location: {
      x:
      y:
    }
  };
};
