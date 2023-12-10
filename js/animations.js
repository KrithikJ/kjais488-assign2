// 0.2126 * r + 0.7152 * g + 0.0722 * b is luminace and < 80 = white text

let filter = { 'class': '', 'value': '' };

let rgbAnimation = [0, 0, 0];
let colorVector = [1, 1, 0];

let rgbAnimation2 = [0, 0, 0];
let colorVector2 = [1, 0, 1];

// function animateLists(closed, listContainer) {

//     if (closed) {
//         console.log("opening");
//         setTimeout(() => {
//             if (x.classList.contains("hidden")) {
//                 x.classList.toggle("hidden");
//             }
//         }, time);
//     }
// }

function updateAnimation() {
    // console.log(rgbAnimation);
    let songListTable = document.querySelectorAll("#all-songs tr");
    // console.log(songListTable);
    let counter = 0;
    let rgbAnimationTemp = [...rgbAnimation];
    let colorVectorTemp = [...colorVector];
    // console.log(rgbAnimation);
    songListTable.forEach(row => {
        row.style.backgroundColor = 'rgb(' + rgbAnimationTemp.join(',') + ')';
        row.querySelectorAll('* button').forEach((c) => {
            c.style.backgroundColor = 'rgb(' + rgbAnimationTemp.join(',') + ')';
        });
        row.querySelectorAll('*').forEach((c) => {
            c.style.color = ((0.2126 * rgbAnimationTemp[0] + 0.7152 * rgbAnimationTemp[1] + 0.0722 * rgbAnimationTemp[2]) < 80) ? "white" : "black";
        });
        for (let i = 0; i < 3; i++) {
            if ((rgbAnimationTemp[i] + colorVectorTemp[i]) > 150 || (rgbAnimationTemp[i] + colorVectorTemp[i]) < 0) {
                // console.log(colorVectorTemp[i] + colorVectorTemp[(i + 2) % 3] + colorVectorTemp[(i + 1) % 3]);
                if (colorVectorTemp[(i + 2) % 3] == 0) {
                    colorVectorTemp[(i + 2) % 3] = 1;
                }
                colorVectorTemp[i] = ((colorVectorTemp[(i + 1) % 3] == 0 || (colorVectorTemp[(i + 2) % 3]) == 0) && colorVectorTemp[i] != -1) ? -colorVectorTemp[i] : 0;
            }
            rgbAnimationTemp[i] += colorVectorTemp[i];
        }
    });

    for (let i = 0; i < 3; i++) {
        if ((rgbAnimation[i] + colorVector[i]) > 150 || (rgbAnimation[i] + colorVector[i]) < 0) {
            // console.log(colorVector[i] + colorVector[(i + 2) % 3] + colorVector[(i + 1) % 3]);
            if (colorVector[(i + 2) % 3] == 0) {
                colorVector[(i + 2) % 3] = 1;
            }
            colorVector[i] = ((colorVector[(i + 1) % 3] == 0 || (colorVector[(i + 2) % 3]) == 0) && colorVector[i] != -1) ? -colorVector[i] : 0;
        }
        rgbAnimation[i] += colorVector[i];
    }
    // console.log(rgbAnimation);
}

function sortListEvent(e) {
    console.log(e.target);
    console.log(e.target.parentElement.parentElement);
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.parentElement.classList.contains('list-headers')) {
        // console.log(e.target.parentElement);
        if(sortBy == e.target.parentElement.classList[0]){
            sortBy += " descending";
            
        } else {
            sortBy = e.target.parentElement.classList[0];
        }
        console.log(e.target.parentElement);
        listData(songsLimiter(filter), songsListFilter, 'all-songs', '#parentDiv', ['song-list-format']);
    };
}

function filterListEvent(value, coloum) {
    // console.log(value + coloum);
    // Title s => s.querySelector('.title p').textContent.includes(searchquery))
    // year s => s.querySelector('.year p').textContent > #
    filter['class'] = coloum;
    filter['value'] = value;
    listData(songsLimiter(filter), songsListFilter, 'all-songs', '#parentDiv', ['song-list-format']);
}

function rgbEdges() {
    const leftSpeakers = document.querySelector("#leftDiv");
    const rightSpeakers = document.querySelector("#rightDiv");

    leftSpeakers.style.backgroundColor = 'rgb(' + rgbAnimation2.join(',') + ')';
    rightSpeakers.style.backgroundColor = 'rgb(' + rgbAnimation2.join(',') + ')';

    for (let i = 0; i < 3; i++) {
        if ((rgbAnimation2[i] + colorVector2[i]) > 150 || (rgbAnimation2[i] + colorVector2[i]) < 0) {
            // console.log(colorVector2[i] + colorVector2[(i + 2) % 3] + colorVector2[(i + 1) % 3]);
            if (colorVector2[(i + 2) % 3] == 0) {
                colorVector2[(i + 2) % 3] = 1;
            }
            colorVector2[i] = ((colorVector2[(i + 1) % 3] == 0 || (colorVector2[(i + 2) % 3]) == 0) && colorVector2[i] != -1) ? -colorVector2[i] : 0;
        }
        rgbAnimation2[i] += colorVector2[i];
    }
    // console.log("its running");
    //setTimeout(rgbEdges(), 20000);
}

