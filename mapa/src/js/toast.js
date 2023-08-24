// Crear toast con diferentes variabes para los mensajes
export function createToast(id, icon, color, titulo, texto, posicion) {
    posicion === 'top' ? posicion = 'absolute top-2 left-1/2 transform -translate-x-1/2' : null
    posicion === 'bottom' ? posicion = 'absolute bottom-24 left-1/2 transform -translate-x-1/2' : posicion = 'absolute centrearXY';

    var div = document.createElement('div');
    div.id = id;
    div.setAttribute('class', posicion + ' ' + 'z-[1010] flex justify-between w-full max-w-sm mx-auto bg-white rounded-lg shadow-md opacity-90');
    div.innerHTML = `
          <div class="flex items-center justify-center w-12 bg-${color}">
          ${icon}  
          </div>
          <div class="px-4 py-2 mr-auto">
              <div class="mx-3">
              <span class="font-semibold text-${color}">${titulo}</span>
              <p class="text-sm ">${texto}</p>
              </div>
          </div>
          <button id="cancel${id}" type="button" class="flex items-center justify-center w-12 cursor-pointer">
              <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 512 512">
                  <path fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z">
                  </path>
              </svg>
          </button>`;
    document.body.appendChild(div);
  }
