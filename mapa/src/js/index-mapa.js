// import {
//   navbar
// } from '../../../src/js/navbar';

import "leaflet";
import {
  urubu_porongo_waypoint,
  torno_waypoint,
  intNorte,
  laguardia,
  satNorte,
  scz,
  urubo,
  warnes
} from "./poligonos";
import "./Leaflet.AccuratePosition";
import "leaflet-control-custom";
import "./leaflet.Control.Center";
import "leaflet.markercluster";
import 'leaflet.markercluster.layersupport';
import 'leaflet-groupedlayercontrol';
import { rutas } from './rutas';
import { postDatos } from './postData';
import { createToast } from './toast';
import { inscrito, poligonoInscrito } from "./inscrito";

document.addEventListener('DOMContentLoaded', function () {
  // navbar(); // js para el navbar

  var marker = "";
  var precio;
  var paths = [];
  var colors = ['#ffff00', '#fba657', '#4ade80', '#52b551', '#ff0000', '#00ffff', '#50dbff', '#5eb9fc', '#6199ee', '#808080'];
  var celular = "+59160880055";


  // INICIALIZA MAPA
  var map = L.map('map', {
    center: [-17.784071, -63.180522],
    zoom: 12,
    zoomControl: true
  });

  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  var Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  });

  OpenStreetMap_Mapnik.addTo(map);

  document.getElementById('map').style.cursor = 'crosshair';

  // Agrega boton para encontrar ubicacion 
  L.control.custom({
    position: 'topright',
    content: `    
            <svg class="sombra" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
              <path  d="M2 12h3m14 0h3M12 2v3m0 14v3" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="3" />
            </svg>`,
    classes: 'block lg:hidden ml-auto h-12 w-12 bg-white rounded-md border border-black',
    id: 'ubicando',
    title: "Encuentra tu ubicación",
    style: {
      cursor: 'pointer',
    },
    events: {
      click: () => {
        ttubicacion.classList.add("invisible");
        LoadOverlay(true);
        map.findAccuratePosition({
          maxWait: 10000,
          desiredAccuracy: 20
        });
      },
    }
  }).addTo(map);

  // Fin - INICIALIZA MAPA

  const precioEle = document.getElementById("precio");
  const precioText = precioEle.querySelector("p");

  // DEFINE UBICACION
  // Coloca pantalla gris y deshabilita funciones 
  function LoadOverlay(status) {
    overlay.classList.toggle("invisible");
    spinner.classList.toggle("invisible");
    status ? map.off('click', onMapClick) : map.on('click', onMapClick);
  }

  function onAccuratePositionProgress(e) {
    console.log(e.accuracy);
    console.log(e.latlng);
  }

  function onAccuratePositionFound(e) {
    LoadOverlay(false);
    console.log(e.accuracy);
    console.log(e.latlng);
    map.flyTo(e.latlng, 15);
    (marker != "") ? map.removeLayer(marker) : null;
    marker = L.marker(e.latlng, {
      icon: iconRed
    }).addTo(map);
    contratanos.classList.remove("invisible");
  }

  function onAccuratePositionError(e) {
    LoadOverlay(false);
    let idToast = 'accesoUbicacion';
    let iconToast = `
      <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path
          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
      </svg>`;
    let colorToast = 'warning';
    let tituloToast = 'UBICACION';
    let textoToast = `No pudimos acceder a tu ubicación... Intentalo manualmente o comunicate con nosotros.`;
    createToast(idToast, iconToast, colorToast, tituloToast, textoToast);
    globoWapp("No se encontro la ubicación");
    cancelaccesoUbicacion.onclick = function (event) {
      accesoUbicacion.remove();
    }
  }

  function onMapClick(e) {
    if (marker != "") {
      map.removeLayer(marker);
    } else {
      contratanos.classList.remove("invisible");
      ttubicacion.classList.remove("animate-bounce-bottom");
    }
    marker = L.marker(e.latlng, {
      icon: iconRed
    }).addTo(map);
    console.log(e.latlng);
  }

  map.on('accuratepositionprogress', onAccuratePositionProgress);
  map.on('accuratepositionfound', onAccuratePositionFound);
  map.on('accuratepositionerror', onAccuratePositionError);
  map.on('click', onMapClick);

  // Cambia el icono del globito
  var iconRed = L.icon({
    iconUrl: static_url + 'img/leaflet/marker-red.svg',
    iconRetinaUrl: static_url + './img/leaflet/marker-red.svg',
    iconSize: [26, 42],
    iconAnchor: [13, 42],
    popupAnchor: [-3, -76],
    shadowUrl: static_url + 'img/leaflet/marker-shadow.png',
    shadowRetinaUrl: static_url + './img/leaflet/marker-shadow.png',
    shadowSize: [68, 50],
    shadowAnchor: [22, 49]
  });

  // Agrega boton de COTIZA que haga fetch al servidor de mapas y encontrar rutas y tiempos
  L.control.custom({
    position: 'bottomcenter',
    content: `<div>
                  <button id="contratanos" class="invisible botonGrande bg-secondary hover:bg-red-700 text-white">
                  COTIZA
                  </button>
                </div>`,
    classes: 'pb-8',
    events: {
      click: contratar
    }
  }).addTo(map);

  // FIN - DEFINE UBICACION

  // Agregar poligonos
  // var polyUrubo = L.polygon(urubo, {
  //   color: 'red'
  // });
  // var polyLaguardia = L.polygon(laguardia, {
  //   color: 'yellow'
  // });
  // var polySatNorte = L.polygon(satNorte, {
  //   color: 'red'
  // });
  // var polyIntNorte = L.polygon(intNorte, {
  //   color: 'yellow'
  // });
  // var polyWarnes = L.polygon(warnes, {
  //   color: 'blue'
  // });

  // var polyScz = L.polygon(scz, {
  //   color: 'gray'
  // });
  // var areasDiferenciadas = L.layerGroup([polyScz, polyUrubo, polyLaguardia, polySatNorte, polyIntNorte, polyWarnes]).addTo(map);


  function contratar() {
    if (inscrito(marker, scz) === true) {
      let colorPath = ['red', 'green', 'orange', 'cyan'];
      LoadOverlay(true);

      //Devolvera el indice del poligono o -1 si es que no esta en ninguno
      const poligonos_waypoints = [urubu_porongo_waypoint, torno_waypoint]
      const indicePoligono = poligonoInscrito(marker, poligonos_waypoints);
      // if (indicePoligono !== -1) {
      //   console.log(`El punto está inscrito en el polígono ${indicePoligono + 1}`);
      // } else {
      //   console.log("El punto no está inscrito en ninguno de los polígonos");
      // }

      async function allPaths() {
        // Archivo rutas.js
        return rutas(marker,indicePoligono) //Devuelve distancia,tiempo,origen y ruta ademas considera waypoints obligatorios por el indice
          .then(result => {
            result.forEach((r, i) => {
              if (r != null) {
                paths[i] = L.polyline(r.ruta, {
                  color: colorPath[i],
                  opacity: 0.5
                }).addTo(map);
              } else {
                alert("Algo paso!!!");
                spinner.classList.add("invisible");
                overlay.classList.add("invisible");
                map.on('click', onMapClick);
              }
            })
            return result;
          })
      }
      async function precios() {
        let result = await allPaths();
        var distancia = 0;
        var menor;
        var factor = 1;
        result.forEach((r, i) => {
          // Despliega distancia y tiempo de los resultados
          console.log("%c" + r.origen + ": " + r.distancia + " km - " + r.tiempo + " min", "color:" + colorPath[i]);

          if (distancia == 0) {
            distancia = r.distancia;
            menor = [
              r.origen,
              (r.distancia * 11 + 260).toFixed(),
              (r.tiempo * 6.25 + 212.5).toFixed()
            ]
          }
          if (r.distancia < distancia) {
            distancia = r.distancia;
            menor = [
              r.origen,
              (r.distancia * 11 + 260).toFixed(),
              (r.tiempo * 6.25 + 212.5).toFixed()
            ]
          }
          console.log("%c" + r.origen + ": " + (r.distancia * 11 + 260).toFixed() + " Bs(km) - " + (r.tiempo * 6.25 + 212.50).toFixed() + " Bs(min)", "color:" + colorPath[i]);

        })
        var zonasDiferenciadas = [satNorte, intNorte, laguardia, urubo, warnes];
        var factorZona = [0.8, 0.8, 0.9, 1.10, 0.83];

        zonasDiferenciadas.forEach((z, i) => {
          inscrito(marker, z) ? factor = factorZona[i] : null
        });

        console.log("Distancia menor: " + menor[0]);
        // Escogemos el mayor entre tiempo y distancia
        precio = menor[1] > menor[2] ? menor[1] : menor[2];
        console.log("Precio: " + precio);
        factor != 1 ?
          console.log("%cFactor: " + factor, "color:red") :
          console.log("Factor: " + factor);

        console.log("___Precio Recomendado___");
        precio = precio * factor;
        precio = precio < 300 ? 300 : Math.floor(precio / 10) * 10;
        console.log(precio);

        precioText.textContent = "Bs. " + precio;
        modal.classList.toggle("invisible");

      }
      precios();

    } else {
      console.log("----------OO---------");
      // Crea el Toast fuera de rango
      let idToast = 'fueraRango';
      let iconToast = `
                  <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <path
                      d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                  </svg>`;
      let colorToast = 'warning';
      let tituloToast = 'FUERA DE RANGO';
      let textoToast = `Comunicate con nosotros para cotizar el servicio!`;
      createToast(idToast, iconToast, colorToast, tituloToast, textoToast, 'center');
      globoWapp("Mi ubicación fuera de rango");
      cancelfueraRango.onclick = () => fueraRango.remove();
    }
  };

  // icono de cancelar pone base de datos si no esta logueado
  xModal.onclick = function () {
    modal.classList.toggle("invisible");
    !auth ?
      postDatos("", "", precio, marker, 'COT', 'CLX')
        .then(console.log) :
      null;
    LoadOverlay(false);
  };

  // boton aceptar, pone base de datos si no esta logueado
  confirmarModal.onclick = function () {
    modal.classList.toggle("invisible");
    !auth ?
      postDatos("", "", precio, marker, 'COT', 'CLC')
        .then(console.log) :
      null;
    LoadOverlay(false);
    let codigo = precio.toString(10).split('');
    codigo.unshift(parseInt(Math.random() * 10));
    codigo.splice(2, 0, parseInt(Math.random() * 10));
    codigo.splice(4, 0, parseInt(Math.random() * 10));
    codigo.splice(6, 0, parseInt(Math.random() * 10));
    codigo = codigo[0] + codigo[1] + codigo[2] + codigo[3] + codigo[4] + codigo[5] + codigo[6];
    let menLatLon = `Código de cotización:${codigo}%0D%0A
    ¡Hola!,Requiero el servicio de limpieza en la siguiente unicación:%0D%0Ahttps://maps.google.com/maps?q=${marker._latlng.lat.toFixed(6)}%2C${marker._latlng.lng.toFixed(6)}&z=17&hl=es`;
    mensajeWapp(menLatLon);
  };

  // Toast de Titulo
  toastTituloButton.onclick = function () {
    toastTitulo.classList.add("invisible");
  }

  function mensajeWapp(mensaje) {
    let link = "https://wa.me/";
    link += celular;
    link += '?text=';
    mensaje = mensaje.replace(/ /g, "%20");
    link += mensaje;
    window.open(link);
  }

  // Mensaje del globo de whatsapp
  function globoWapp(mensaje) {
    wapp.classList.remove("invisible");
    wapp.classList.add("animate-wapp");
    let link = "https://wa.me/";
    link += celular;
    link += '?text=';
    mensaje = mensaje.replace(/ /g, "%20");
    link += mensaje;
    wapp.querySelector("a").href = link;
  }


});