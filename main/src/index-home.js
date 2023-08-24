import {navbar} from './navbar';
import KUTE from './kute-esm';
import anime from 'animejs';

document.addEventListener('DOMContentLoaded', function (event) {

//   navbar(); // js para el navbar
  
  // animacion fondo
  let bgBox = document.querySelector('.fondoscz');

  KUTE.to(bgBox, {
    backgroundPosition: ['50%', '50%']
  }, {
    duration: 4000,
    easing: 'easingCubicOut',
    delay: 0
  }).start();

    // Se difumina el fondo 
  var tl = anime.timeline();
  tl.add({
      targets: bgBox,
      opacity: 0,
      duration: 2000,
      delay: 2000,
      easing: "linear",
  });




  let widthBanner = bgBanner.offsetWidth,
  heightBanner = bgBanner.offsetHeight,
  widthTitle = titulo.offsetWidth,
  // heightCamion = camion.offsetHeight, 
  widthCamion = camion.offsetWidth,
  despCamion = (widthBanner + widthTitle) / 2 - widthCamion,
  escalaLogo = widthTitle / widthCamion;
  let logoPos 

//   Se pone despues para que se alinee el camion
titulo.classList.add("w-full");

  //   Avanza el camion
  tl.add({
    targets: '#camion',
    translateX: [-widthCamion, despCamion],
    duration: 4000,
    easing: "easeOutQuad",
});

  //   Avanza titulo
  tl.add({
    targets: '#titulo',
    translateX: ['-100%', '0%'],
    duration: 4000,
    easing: "easeOutQuad",
}, '-=4000');

//   Morphing Camion con letras de Santa Cruz
tl.add({
    targets: '#camion',
    translateX: (widthBanner / 2 - widthCamion / 2),
    translateY: -heightBanner * (2 / 5),
    duration: 3000,
    easing: "linear",
    scale: escalaLogo,
    begin: function () {
        KUTE.to('#contorno', {
            path: '#anta',
            attr: {
                fill: "#fff"
            }
        }, {
            duration: 3000,
        }).start();
        KUTE.to('#tanqueCabina', {
            path: '#ruz',
            attr: {
                fill: "#fff"
            }
        }, {
            duration: 3000,
        }).start();
        KUTE.to('#llantas', {
            path: '#S',
            attr: {
                fill: "#fff"
            }
        }, {
            duration: 3000,
        }).start();
        KUTE.to('#tanqueGas', {
            path: '#C',
            attr: {
                fill: "#fff"
            }
        }, {
            duration: 3000,
        }).start();
    },
    complete: function () {
      let svg = camion.querySelector('svg');
      window.addEventListener("resize",  function (event) {   
        let logoPos = svg.getBoundingClientRect();
        let logoAncho = logoPos.right - logoPos.left;
        let anchoWindow = window.innerWidth;
        svg.style.left = `${(anchoWindow - logoAncho)/2-logoPos.left}px`;
      });
    }
});

tl.add({
  targets: '#contratanos',
  opacity: [0,1],
  duration: 2000,
  easing: "linear",
},'-=3000');

tl.add({
  targets: '#wapp',
  translateY: ['-100%', '0%'],
  opacity: [0,1],
  duration: 1000,
})

  






});