
// https://stackoverflow.com/questions/56153172/fetch-data-from-multiple-apis-with-async-await
    // const prueba1 = [-17.68524100, -63.08830261, 'prueba1'];
    // const prueba2 = [-17.72252621, -63.04779052, 'prueba2'];
    const saguapac = [-17.74620847, -63.12672898, 'saguapac'];
    const garaje = [-17.78595813, -63.12451243, 'garaje'];
    var bases = [saguapac, garaje];

    const waypointPuenteUrubo = [-17.7498515, -63.2154661];
    const waypoinPuenteTorno = [-17.988987, -63.389942];

export function rutas(marker, indice) {
    const request = (lat, lon, marker, origen, indice) => {
        let waypoint;
        if (indice==0) {
            waypoint = ";" + waypointPuenteUrubo[1] + "," + waypointPuenteUrubo[0] + ";";
        } else if (indice==1) {
            waypoint = ";"+ waypoinPuenteTorno[1] + "," + waypoinPuenteTorno[0] + ";";
        } else {
            waypoint = ";";
        }

        const profile = '/driving/';
        let url = 'http://router.project-osrm.org/route/v1';
        // var url = 'https://osrm.pozosscz.com/route/v1';
        url = url + profile + lon + "," + lat + waypoint + marker._latlng.lng + "," + marker._latlng.lat + "?steps=true&geometries=geojson&overview=full&continue_straight=true";
        // url = url + profile + lon + "," + lat + ";" + marker._latlng.lng + "," + marker._latlng.lat + "?steps=true&geometries=geojson";
        let result = new Object();

        // Rough implementation. Untested.
        function timeout(ms, promise) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error("timeout"))
                }, ms)
                promise.then(resolve, reject)
            })
        }

        return timeout(5000, fetch(url))
            .then(resp => resp.json())
            .then(resp => {
                let ruta = resp.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

                let distancia = parseFloat((resp.routes[0].distance / 1000).toFixed(2)); //kilometros
                // Multiplicamos por dos para tener un tiempo estimado de recorrido de un camion
                let tiempo = parseInt(Math.round(resp.routes[0].duration / 60) * 2); //minutos
  
                result.distancia = distancia;
                result.tiempo = tiempo;
                result.ruta = ruta;
                result.origen = origen;
                return result;
            })
            .catch(function (error) {
                return null;
            })


    }
    console.log("---------------------");
    const promises = [];
    bases.map((o) => {
        promises.push(request(o[0], o[1], marker, o[2], indice))
    });
    return Promise.all(promises);
};