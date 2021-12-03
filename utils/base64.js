const imageToBase64 = require('image-to-base64');

exports.imageToBase64 = (file) => {
    console.log("image changed")
    return imageToBase64(file)
}
