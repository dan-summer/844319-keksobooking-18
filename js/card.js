'use strict';

// Модуль работы с карточкой объявления
(function () {
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

    return quests === 1 ? ' гостя' : ' гостей';
  };

  // Функция создания списка удобств
  var getFeatureList = function (features) {
    var liElementString = '';

    features.forEach(function (feature) {
      liElementString += '<li class="popup__feature popup__feature--' + feature + '"></li>';
    });

    return liElementString;
  };

  // Функция создания списка с фото
  var getPhotoList = function (photos) {
    var imgElementString = '';

    photos.forEach(function (photo) {
      imgElementString += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    });

    return imgElementString;
  };

  // Функция создания карточки объявления
  var createCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card'); // Шаблон карточки
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getHousingType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + getRoomWordEnding(card.offer.rooms) + ' для ' + card.offer.guests + getGuestWordEnding(card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    if (card.offer.features.length) {
      cardElement.querySelector('.popup__features').innerHTML = getFeatureList(card.offer.features);
    } else {
      cardElement.querySelector('.popup__features').style.display = 'none';
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = getPhotoList(card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

  window.card = {
    createCard: createCard
  };
})();
