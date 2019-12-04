import './index.css'

let img = require('./img/logo.png').default;
console.log(img)
let newImg  = new Image()
newImg.src = img;
document.body.appendChild(newImg)


document.write('666')