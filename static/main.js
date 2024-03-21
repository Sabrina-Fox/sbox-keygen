let version = "v3.2.0"
let keyOut = document.getElementById('key_display');
let button = document.getElementById('generate_button');
let name = document.getElementById('name');
let counter = document.getElementById('counter');
let versionDisplay = document.getElementById('version_tag');
let generated;
let generating = false;

versionDisplay.innerText = version;

if (localStorage.getItem('generated') === null | undefined) {
    generated = 0;
    localStorage.setItem('generated', 0)
} else {
    generated = Number(localStorage.getItem('generated'))
};

function updateCounter() {
    let timeSinceStart = Math.floor((Date.now() - 1710162000000)/1000);
    counter.innerText = Math.floor(timeSinceStart/180)+generated-1000;
};

async function startKeyGen() {
    if (!generating) {
        keyOut.textContent = 'Attempting to contact server, please wait patiently. This process can take up to 60 seconds.';
        button.disabled = true;
        generating = true;
        const res = await fetch(`https://site.sabrina-rdc.com/keygen-backend${name.value}`)
        keyOut.textContent = await res.text();
        generated++;
        button.disabled = false;
        generating = false;
    }
};

updateCounter();

setInterval(() => {
    if (Math.random() < 0.075) {
        generated++;
        localStorage.setItem('generated', generated)
    }
}, 500);

console.log('What are you looking at? :3');

alert("Read the instructions before using! Do not ignore the instructions and then complain the keygen doesn't work! It takes MULTIPLE tries before you can get a working key!");