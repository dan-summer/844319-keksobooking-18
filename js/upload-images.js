'use strict';

// Модуль загрузки изображений
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HOUSNIG_PHOTO_WIDTH = 70;
  var HOUSNIG_PHOTO_HEIGTH = 70;

  var avatarfileChooser = document.querySelector('.ad-form__field input[type=file]'); // Кнопка выбора файла для загрузки аватарки пользователя
  var avatarPreview = document.querySelector('.ad-form-header__preview img'); // Иконка аватарки пользователя

  var housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]'); // Кнопка выбора файла для загрузки фотографии жилья
  var housingPhotoPreview = document.querySelector('.ad-form__photo'); // Блок фотографии жилья

  // Функция загрузки изображений
  var getImagePreview = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (imageType) {
      return fileName.endsWith(imageType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  // Обработчик события загрузки аватарки пользователя
  avatarfileChooser.addEventListener('change', function () {
    getImagePreview(avatarfileChooser, avatarPreview);
  });

  // Обработчик события загрузки фотографии жилья
  housingPhotoChooser.addEventListener('change', function () {
    var imgElement = housingPhotoPreview.querySelector('img');

    if (!imgElement) {
      imgElement = document.createElement('img');
      imgElement.style.width = HOUSNIG_PHOTO_WIDTH + 'px';
      imgElement.style.height = HOUSNIG_PHOTO_HEIGTH + 'px';
      housingPhotoPreview.appendChild(imgElement);
    }

    getImagePreview(housingPhotoChooser, imgElement);
  });

  // Функция удаления изображений из разметки
  var deleteImages = function () {
    var photoPreview = housingPhotoPreview.querySelectorAll('img');

    photoPreview.forEach(function (photo) {
      photo.remove();
    });

    avatarPreview.src = 'img/avatars/default.png';
  };

  window.uploadImages = {
    deleteImages: deleteImages
  };

})();
