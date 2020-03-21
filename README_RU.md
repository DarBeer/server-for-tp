# Сервер для сайта техно-парка Полесского Государственного Университета
## Перед запуском
1. Для корректной работы сервера создайте файл `keys.js` в корневой деректории, с данным содержимым:
```javascript
const mongodbKey = 'url_for_your_mongodb';

module.exports = mongodbKey;
```
2. Установите nodemon:
    - `npm install -g nodemon` - nodemon будет установлен глобально на ваш системный путь
    - `npm install --save-dev nodemon` - как зависимость для разработки
## Список команд
* `npm start` - запуск сервреа
```json
"scripts": {
        "start": "nodemon ./index.js"
      },
```