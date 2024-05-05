let version = "v3.4.2"
let keyOut = document.getElementById('key_display');
let button = document.getElementById('generate_button');
let name = document.getElementById('name');
let counter = document.getElementById('counter');
let versionDisplay = document.getElementById('version_tag');
let generated;
let generating = false;

versionDisplay.innerText = version;

async function test(){
    console.log(await fetchKey.send());   
};

function updateCounter() {
    let timeSinceStart = Math.floor((Date.now() - 1710162000000)/1000);
    counter.innerText = Math.floor(timeSinceStart/180)+generated-20000;
};


if (localStorage.getItem('generated') === null | undefined) {
    generated = 0;
    localStorage.setItem('generated', 0)
} else {
    generated = Number(localStorage.getItem('generated'))
};

async function startKeyGen() {
    if (!generating) {
        let reqObject = {
            name: name.value,
        }
        keyOut.textContent = 'Attempting to contact server, please wait patiently. This process can take up to 60 seconds.';
        button.disabled = true;
        generating = true;
        const res = await fetch(`http://127.0.0.1:8001/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqObject)
        });
        console.log(res)
        resObject = await res.json();
        keyOut.textContent = resObject.message;
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

alert("Read the instructions before using! Do not ignore the instructions and then complain the keygen doesn't work! It takes MANY tries before you can get a working key and you WILL get errors before successfully getting one!");