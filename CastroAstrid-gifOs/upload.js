let recorder;
async function getStreamAndRecord() {
    let video = document.getElementById("video");
    let stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: 434,
            width: 832
        }
    });
    video.srcObject = stream;
    video.play();
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
    });
}
getStreamAndRecord();

async function capturar() {
    document.querySelector("#chequeo").textContent = "Capturando Tu Guifo";
    document.querySelector(".recording").classList.toggle("no_display");
    document.querySelector(".listo").classList.toggle("no_display");
    document.querySelector(".camara").classList.toggle("no_display");
    document.querySelector(".capturar").classList.toggle("no_display");
    recorder.startRecording();
}

let form;
let url;

async function stop() {
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(2000);

    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        let video = document.getElementById("video");
        let gif = document.getElementById("gif")
        video.classList.toggle("no_display");
        video.pause();
        gif.classList.toggle("no_display");

        url = URL.createObjectURL(blob)
        gif.setAttribute("src", url);

        const apikey = 'ncL4TrhLMIjx6Qg8XGc3OtY2FrAcmQG1'
        form = new FormData();
        form.append('file', blob, 'myGif.gif');
        form.append('api_key', apikey);

        const buttons = ['.recording', '.listo', '.repetir', '.subir'];
        buttons.map(function (el) {
            toggleDisplay(el)
        });

    });
}

function toggleDisplay(selector) {
    const elemento = document.querySelector(selector);
    elemento.classList.toggle('no_display');
}

const load = document.querySelector(".load");
for (let i = 0; i < 22; i++) {
    const cuadro = document.createElement('div');
    const color = i < 5 ? 'rosado' : 'gris';
    cuadro.setAttribute('class', color);
    load.appendChild(cuadro);
}

async function subir() {
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(2000);

    document.querySelector("#chequeo").textContent = "Subiendo Guifo";
    toggleDisplay('#gif');
    toggleDisplay('.subiendo');
    toggleDisplay('.cancelar2');
    toggleDisplay('.repetir');
    toggleDisplay('.subir');

    const path = `http://upload.giphy.com/v1/gifs`;
    const response = await fetch(path, {
        method: 'POST',
        body: form
    });
    const data = await response.json();

    toggleDisplay('.done');
    toggleDisplay('.container_chequeo');

    const gif = document.querySelector('.gif_subido');
    gif.setAttribute("src", url);

    data.data.type = 'gif';
    localStorage.setItem('gif' + data.data.id, JSON.stringify(data.data));
}

function redirectMiGuifos() {
    window.location.href = "./guifos.html";
}

function devolver() {
    window.location.href = "./CrearGuifos.html";
}