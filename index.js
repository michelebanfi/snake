var larghezza = window.innerWidth;
var altezza = window.innerHeight + screen.height - window.innerHeight;
var array = [];
var cont = 2;
var posizioni = [{}];
var food = {
    status: true,
    x: Math.random() * larghezza,
    y: Math.random() * altezza
};
window.addEventListener("resize", () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
})
function setup() {
    var myCanvas = createCanvas(larghezza, altezza);
    myCanvas.parent('container');
    array.push({
        x: larghezza / 2,
        y: altezza / 2,
        dir: "nord"
    });
    array.push({
        x: larghezza / 2,
        y: altezza / 2 + 10,
        n: 1
    });
    array.push({
        x: larghezza / 2,
        y: altezza / 2 + 22,
        n: 2
    });
    for (var i = 0; i < 14; i++) {
        posizioni.push({
            y: altezza / 2 + (i * 2),
            x: larghezza / 2
        });
    }
}
function draw() {
    eat();
    check_border();
    background(192, 93, 0);
    check_dir();
    movements();
    fill(0, 255, 0);
    if (food.status === true) {
        rect(food.x, food.y, 10, 10);
    } else {
        food.status = true;
        food.x = (Math.random() * larghezza);
        food.y = (Math.random() * (altezza - (screen.height - window.innerHeight + (20)) + screen.height - window.innerHeight + (20)));
    }
    fill(255, 0, 0);
    rect(array[0].x, array[0].y, 10, 10);
    for (var i = 1; i < array.length; i++) {
        rect(posizioni[posizioni.length - (array[i].n * 5)].x, posizioni[posizioni.length - (array[i].n * 5)].y, 10, 10);
    }
    if (posizioni.length > array.length * (cont + 2)) {
        posizioni.shift();
    }
}
function movements() {
    if (keyIsPressed) {
        if (keyCode === LEFT_ARROW) {
            array[0].dir = "west";
        } else if (keyCode === RIGHT_ARROW) {
            array[0].dir = "est";
        } else if (keyCode === UP_ARROW) {
            array[0].dir = "nord";
        } else if (keyCode === DOWN_ARROW) {
            array[0].dir = "sud";
        }
    }
}
function check_dir() {
    if (array[0].dir === "west") {
        array[0].x -= 2;
    } else if (array[0].dir === "est") {
        array[0].x += 2;
    } else if (array[0].dir === "nord") {
        array[0].y -= 2;
    } else if (array[0].dir === "sud") {
        array[0].y += 2;
    }
    posizioni.push({
        x: array[0].x,
        y: array[0].y
    });
}
function check_border() {
    if (array[0].x <= 0 || array[0].y <= screen.height - window.innerHeight || array[0].x >= larghezza || array[0].y >= altezza) {
        alert("hai perso F5 + invio per ricominciare");
    }
}
function eat() {
    if (array[0].x + 10 > food.x && array[0].x < food.x + 10 &&
        array[0].y + 10 > food.y && array[0].y < food.y + 10) {
        food.status = false;
        cont++;
        array.push({
            x: posizioni[posizioni.length - (array[array.length - 1].n * 5)].x,
            y: posizioni[posizioni.length - (array[array.length - 1].n * 5)].y,
            n: cont
        });
    }
}
