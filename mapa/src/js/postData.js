var urlPost;
debug ?
  urlPost = 'http://127.0.0.1:8000/api/cliente/create/' :
  urlPost = 'https://pozosscz.com/api/cliente/create/';

export function postDatos (name, phone, cost, marker, status, user){
    var data = {
        'name': name,
        'tel1': phone,
        'cost': cost,
        'lat': marker._latlng.lat.toFixed(6),
        'lon': marker._latlng.lng.toFixed(6),
        'status': status,
        'user':user
    }
    return fetch(urlPost, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrft
        }
      }).then(res => res.json())
      .then((response) => {
        return response
      })
      .catch(error => console.error('Error:', error));
  };