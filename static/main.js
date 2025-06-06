let version = "v4.9.2"
let keyOut = document.getElementById('key_display');
let button = document.getElementById('generate_button');
let nameInput = document.getElementById('name');
let counter = document.getElementById('counter');
let versionDisplay = document.getElementById('version_tag');
let generating = false;
const alertString = "Read the instructions before using! Do not ignore the instructions and then complain the keygen doesn't work! It takes MANY tries before you can get a working key and you WILL get errors before successfully getting one!";

versionDisplay.innerText = version;

async function initializeCounter(){
    baseNumberResponse = await fetch('/keygen-backend/baseNumber');
    baseNumber = await baseNumberResponse.text();
    counter.textContent = baseNumber;
    localStorage.setItem('baseCounterNumber', baseNumber);
    localStorage.setItem('timesTried', 0);
    alert(alertString);
};

nameInput.addEventListener('input', () => {
    localStorage.setItem('nameInput', nameInput.value);
});

if (localStorage.getItem('nameInput') && localStorage.getItem('autofillName') === 'true') {
    nameInput.value = localStorage.getItem('nameInput');
};

if (!localStorage.getItem('baseCounterNumber') || !localStorage.getItem('timesTried')) {
    initializeCounter();
} else {
    counter.textContent = Number(localStorage.getItem('timesTried')) + Number(localStorage.getItem('baseCounterNumber'));
    alert(alertString);
};

async function startKeyGen() {
    if (!generating) {
        let reqObject = {
            name: nameInput.value,
        }
        keyOut.textContent = 'Attempting to contact server, please wait patiently. This process can take up to 60 seconds.';
        button.disabled = true;
        generating = true;
        const res = await fetch(`/keygen-backend/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqObject)
        });
        if (res.headers.get('cf-mitigated') !== 'challenge') {
            let resObject = await res.json();
            localStorage.setItem('timesTried', resObject.timesTried);
            localStorage.setItem('baseCounterNumber', resObject.baseCounterNumber);
            let resMessage = resObject.message;
            switch(true){
                case resMessage === 'JtuMcN2hyy3K898BXt4NqQ3g2iPai79q':
                    const foxRes = await fetch('https://randomfox.ca/floof/');
                    let foxJSON = await foxRes.json();
                    let foxImg = `<img src="${foxJSON.image}" width=70%>`
                    keyOut.innerHTML = foxImg;
                    break;
                case resMessage === '3uPgvK2ZWnVr9CvXYpReorhF9ZUN9dQK':
                    const catRes = await fetch('https://api.thecatapi.com/v1/images/search');
                    let catJSON = await catRes.json();
                    let catImg = `<img src="${catJSON[0].url}" alt="Cat ID: ${catJSON[0].id}" width=70%>`
                    keyOut.innerHTML = catImg;
                    break;
                case resMessage === '9tSi9aEvsU2nn8qo87Lo4pgX2dyqbhq3':
                    const dogRes = await fetch('https://dog.ceo/api/breeds/image/random');
                    let dogJSON = await dogRes.json();
                    let dogImg = `<img src="${dogJSON.message}" width=70%>`
                    keyOut.innerHTML = dogImg;
                    break;
                default:
                    keyOut.innerHTML = resMessage;
                    break;
            };
            counter.textContent = resObject.timesTried + resObject.baseCounterNumber;
            console.log(`Times Tried: ${resObject.timesTried}`);
            console.log('What are you looking at? :3');
            button.disabled = false;
            generating = false;
        } else {
            keyOut.innerHTML = 'Unknown Error! Please refresh the page and try again.'
        }
    }
};

console.log('What are you looking at? :3');

