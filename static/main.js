let version = "v4.4.2"
let keyOut = document.getElementById('key_display');
let button = document.getElementById('generate_button');
let name = document.getElementById('name');
let counter = document.getElementById('counter');
let versionDisplay = document.getElementById('version_tag');
let generating = false;

versionDisplay.innerText = version;

async function initializeCounter(){
    baseNumberResponse = await fetch('https://site.sabrina-rdc.com/keygen-backend/baseNumber')
    baseNumber = await baseNumberResponse.text();
    counter.textContent = baseNumber;
    localStorage.setItem('baseCounterNumber', baseNumber);
    localStorage.setItem('timesTried', 0);
};

if (!localStorage.getItem('baseCounterNumber')) {
    initializeCounter();
} else {
    counter.textContent = Number(localStorage.getItem('timesTried')) + Number(localStorage.getItem('baseCounterNumber'))
};

async function startKeyGen() {
    if (!generating) {
        let reqObject = {
            name: name.value,
        }
        keyOut.textContent = 'Attempting to contact server, please wait patiently. This process can take up to 60 seconds.';
        button.disabled = true;
        generating = true;
        const res = await fetch(`https://site.sabrina-rdc.com/keygen-backend/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqObject)
        });
        resObject = await res.json();
        keyOut.textContent = resObject.message;
        counter.textContent = resObject.timesTried + resObject.baseCounterNumber;
        localStorage.setItem('timesTried', resObject.timesTried);
        localStorage.setItem('baseCounterNumber', resObject.baseCounterNumber);
        console.log(`Times Tried: ${resObject.timesTried}`);
        console.log('What are you looking at? :3');
        button.disabled = false;
        generating = false;
    }
};

console.log('What are you looking at? :3');

alert("Read the instructions before using! Do not ignore the instructions and then complain the keygen doesn't work! It takes MANY tries before you can get a working key and you WILL get errors before successfully getting one!");