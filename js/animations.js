// 0.2126 * r + 0.7152 * g + 0.0722 * b is luminace and < 80 = white text

let rgbAnimation = [0, 0, 0];
let colorVector = [1, 0, 0];

function animateLists(closed, listContainer) {

    if (closed) {
        console.log("opening");
        setTimeout(() => {
            if (x.classList.contains("hidden")) {
                x.classList.toggle("hidden");
            }
        }, time);
    }
}

function updateAnimation() {
    let songListTable = document.querySelector("#all-songs th, #all-songs tr");
    console.log(songListTable);
}