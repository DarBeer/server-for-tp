# Server for the site of the techno-park of Polesie State University
For the server to work correctly, create the `keys.js` file in the root directory with the given contents:
```javascript
const mongodbKey = 'url_for_your_mongodb';

module.exports = mongodbKey;
```