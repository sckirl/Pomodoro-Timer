let root = document.querySelector(":root");

// ----- Available Themes -----
const _default = document.getElementById("default");
let defaultTheme = {
    _primary: 'black',
    _secondary: 'limegreen',

    background: 'rgb(80, 80, 80)',
    font: 'monospace'
}

const olivia = document.getElementById("olivia");
let oliviaTheme = {
    _primary: 'rgb(204, 158, 165)',
    _secondary: 'white',
    
    background: 'black',
    font: 'monospace'
}

function changeTheme(theme) {
    for (let [key, value] of Object.entries(theme)){
        console.log(`--${key}, ${value}`);

        root.style.setProperty(`--${key}`, `${value}`);
    }
}

olivia.addEventListener("click", function() {changeTheme (oliviaTheme)});
_default.addEventListener("click", function() {changeTheme (defaultTheme)});