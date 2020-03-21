# Сервер для сайта техно-парка Полесского Государственного Университета
Для корректной работы сервера создайте файл `keys.js` в корневой деректории, с данным содержимым:
```javascript
const mongodbKey = 'url_for_your_mongodb';

module.exports = mongodbKey;
```