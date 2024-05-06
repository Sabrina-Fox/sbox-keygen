let version = "v4.3.1"
let keyOut = document.getElementById('key_display');
let button = document.getElementById('generate_button');
let name = document.getElementById('name');
let counter = document.getElementById('counter');
let versionDisplay = document.getElementById('version_tag');
let generating = false;

versionDisplay.innerText = version;

if (localStorage.getItem('generated') === null | undefined) {
    generated = 0;
    localStorage.setItem('generated', 0);
    counter.textContent = 0;
} else {
    counter.textContent = Number(localStorage.getItem('generated'))
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
        console.log(res)
        resObject = await res.json();
        keyOut.textContent = resObject.message;
        counter.textContent = resObject.timesTried;
        localStorage.setItem('generated', resObject.timesTried)
        button.disabled = false;
        generating = false;
    }
};

console.log('What are you looking at? :3');

alert("Read the instructions before using! Do not ignore the instructions and then complain the keygen doesn't work! It takes MANY tries before you can get a working key and you WILL get errors before successfully getting one!");