# Server for the site of the techno-park of Polesie State University
## Before the start
1. For the server to work correctly, create the `keys.js` file in the root directory with the given contents:
```javascript
const mongodbKey = 'url_for_your_mongodb';

module.exports = mongodbKey;
```
2. Setup nodemon
    - `npm install -g nodemon` - nodemon will be installed globally to your system path
    - `npm install --save-dev nodemon` - install nodemon as a development dependency
## Command list
* `npm start` - start server
```json
"scripts": {
        "start": "nodemon ./app.js"
      },
```