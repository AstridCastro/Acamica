
function crearGuifos() {
    window.location.href = "./CrearGuifos.html";
}

function input_onpress(event) {
    const query = event.target.value;
    const button = document.querySelector("#buscar_guifo");
    const busqueda = document.querySelector('.busqueda');

    if (query.length > 0) {
        busqueda.classList.remove('no-display');
        button.disabled = false;
        buscarSugerencias(query)
            .then(function(data) {
                busqueda.firstElementChild.textContent = data.data[1].name;
                busqueda.childNodes[3].textContent = data.data[2].name;
                busqueda.lastElementChild.textContent = data.data[3].name;
            })
    }
    else {
        busqueda.classList.add('no-display');
        button.disabled = true
    }
}

function buscar(event) {
    event.preventDefault();
    const query = event.target.firstElementChild.value;
    const busqueda = document.querySelector('.busqueda');
    const sugerencias = document.querySelector('.sugerencias');
    const tituloSugerencias = document.querySelector('#titulo-sugerencias');
    const tituloBusqueda = document.querySelector('#tituloBusqueda');
    const results = document.querySelector('#results');
    buscarByQuery(query)
        .then(function(data) {
            busqueda.classList.add('no-display');
            sugerencias.classList.add('no-display');
            tituloSugerencias.classList.add('no-display');
            tituloBusqueda.innerText = query;
            results.innerHTML = "";
            data.data.forEach(function (data, index) {
                if (index < 12) {
                    this.showResults(data);
                }
            });
        })
}

function showResults(data) {
    const url = data.images.downsized_large.url;
    const gif = getMigif(url);
    const results = document.querySelector("#results");
    results.appendChild(gif)
    debugger;

}

function comenzar() {
    window.location.href = "./upload.html";
}


function swapStyle(type) {
    const sheet = type === 'dark' ? "styles/stylestheme2.css" : "styles/styles.css";
    const srcLogo = type === 'dark' ? "./assets/gifOF_logo_dark.png" : "./assets/gifOF_logo.png";
    document.getElementById("pagestyle").setAttribute("href", sheet);
    document.querySelector(".logo").setAttribute("src", srcLogo)
}

function elegirtema() {
    const buttonTheme = document.querySelector(".themes");
    buttonTheme.classList.toggle("no-display");
}

callserver("beach_volleyball")
callserver("golden_retriever")
callserver("nature")
callserver("bicycle")
function callserver(query) {
    const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1'
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}`
    const found = fetch(path).then(function (response) {
        return response.json()
    }).then(function (data) {
        this.getSugerencias(data.data[0], query)
    })
        .catch(function (error) {
            return error
        });
}
function getSugerencias(gif, query) {
    const item = document.createElement("div");
    const header = getHeader(query)
    const ver = document.createElement("button");
    ver.setAttribute("class", "ver");
    var veMas = document.createTextNode("Ver más...");
    ver.appendChild(veMas);
    item.appendChild(header)
    item.appendChild(ver)
    const migif = getMigif(gif.images.downsized_large.url)
    item.appendChild(migif);
    const sugerencias = document.querySelector(".sugerencias");
    sugerencias.appendChild(item);

}

function getHeader(query) {
    const header = document.createElement("header");
    header.setAttribute("class", "encabezado");
    var textnode = document.createTextNode(`#${query}`);
    header.appendChild(textnode);
    const miimagen = document.createElement("img");
    miimagen.setAttribute("src", "./assets/button close.svg")
    miimagen.setAttribute("alt", "cerrar");
    header.appendChild(miimagen);
    return header
}
function getMigif(url) {
    const migif = document.createElement("img");
    migif.setAttribute("src", url);
    migif.setAttribute("width", 280);
    migif.setAttribute("height", 280);
    return migif
}

function callserverTrending() {
    const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1'
    const path = `http://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=${12}`
    fetch(path).then(function (response) {
        return response.json()
    }).then(function (data) {
        this.getTrending(data.data)
    })
        .catch(function (error) {
            return error
        });
}
function getTrending(data) {
    data.forEach(function (item) {
        const url = item.images.downsized_large.url
        const migif = getMigif(url)
        const trending = document.querySelector(".trending");
        trending.appendChild(migif)
    });

}
callserverTrending();

function toggleDisplay(selector) {
    const elemento = document.querySelector(selector);
    elemento.classList.toggle('no-display');
}

async function buscarSugerencias (query) {
    const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1'
    const path = `http://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${query}`
    const response = await fetch(path);
    const data = await response.json();

    return data;
}

async function buscarByQuery (query) {
    const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1'
    const path = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}`
    const response = await fetch(path);
    const data = await response.json();

    return data;
}

async function showMiGuifos() {
    const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1';
    const resultsGuifos = document.querySelector('#resultsGuifos');
    for(let i = 0; i < localStorage.length; i++) {
        let item = localStorage.getItem(localStorage.key(i));
        let id = JSON.parse(item).id;

        const response = await fetch(`http://api.giphy.com/v1/gifs/${id}?api_key=${apikey}`);
        const data = await response.json();
        const url = data.data.images.downsized_large.url;
        const gif = getMigif(url);

        if (resultsGuifos) {
            resultsGuifos.appendChild(gif);
        }
    }
}
showMiGuifos();

function devolver() {
    window.location.href = "./index.html";
}

function misGuifos(){
    window.location.href= "./guifos.html";
}