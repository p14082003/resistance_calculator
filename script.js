const t = document.getElementById('display');
const out = document.getElementById('output');
const colours = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
let digits, multiplier, tolerance, temperature, number;

let colourArray = [];

function colourChosen(object) {
    if (t.childElementCount < 5) {
        let el = document.createElement('TD');
        el.setAttribute('class', object.className);
        el.setAttribute('height', 60);
        el.setAttribute('width', 6);
        t.appendChild(el);
        colourArray.push(object.className);
    } else {
        out.value = "Can't add any more colours";
    }
}

function calculate() {
    digits = '';
    if (colourArray.length < 5) {
        out.value = "Enter at least 5 colours";
        return;
    }
    //check first three digits and get number
    for (let a = 0; a < 3; ++a) {
        if (colourArray[a] == 'gold' || colourArray[a] == 'silver') {
            out.value = "Can't use gold or silver on first three stripes";
            return;
        } else {
            for (let v = 0; v < colours.length; ++v) {
                if (colourArray[a] == colours[v]) {
                    digits += v;
                }
            }
        }
    }
    digits = parseInt(digits); //we get an int of the first three numbers.

    for (let v = 0; v < colours.length; ++v) {
        if (colourArray[3] == colours[v]) {
            if (v > 7) {
                out.value = "Fourth strip is incorrect, try blue or lower";
                return;
            }
            multiplier = Math.pow(10, v);
        } else if (colourArray[3] == 'gold') {
            multiplier = Math.pow(10, -1);
        } else if (colourArray[3] == 'silver') {
            multiplier = Math.pow(10, -2);
        }
    }

    number = roundup(digits * multiplier);

    if (colourArray[4] == 'brown') {
        tolerance = 1;
    } else if (colourArray[4] == 'red') {
        tolerance = 2;
    } else if (colourArray[4] == 'green') {
        tolerance = 0.5;
    } else if (colourArray[4] == 'blue') {
        tolerance = 0.25;
    } else if (colourArray[4] == 'violet') {
        tolerance = 0.1;
    } else if (colourArray[4] == 'gold') {
        tolerance = 5;
    } else if (colourArray[4] == 'silver') {
        tolerance = 10;
    } else {
        out.value = "Fifth strip is incorrect";
        return;
    }
    out.value = number + "Ω" + "  ± " + tolerance + "%";
    console.log(colourArray);
    console.log(digits);
    console.log(multiplier);
    console.log(tolerance);
}

function remove(){
    t.removeChild(t.lastChild);
        colourArray.pop();
}

function reset() {
    while (t.firstChild) {
        t.removeChild(t.firstChild);
        colourArray.pop();
    }
        digits = 0;
        multiplier = 0;
        tolerance = 0;
        temperature = 0;
        number = 0;
        out.value = '';
}


function roundup(n) {
    if (n >= 1000) {
        if (n >= 1000000) {
            if (n >= 1000000000) {
                if (n >= 1000000000000) {
                    str = ((n / 1000000000000).toFixed(2)) + ' T';
                } else {
                    str = ((n / 1000000000).toFixed(2)) + ' G';
                }
            } else {
                str = ((n / 1000000).toFixed(2)) + ' M';
            }
        } else {
            str = ((n / 1000).toFixed(2)) + ' k';
        }
    } else {
        str = n.toFixed(2) + '';
    }
    return str;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 65) {
        remove();
    } else if (event.keyCode === 83) {
        reset();
    } else if (event.keyCode === 68) {
        calculate();
    }
    console.log(event.keyCode);
});