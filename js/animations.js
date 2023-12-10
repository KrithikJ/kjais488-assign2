// 0.2126 * r + 0.7152 * g + 0.0722 * b is luminace and < 80 = white text

let filter;

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
    console.log(rgbAnimation);
    let songListTable = document.querySelectorAll("#all-songs tr");
    // console.log(songListTable);
    let counter = 0;
    let rgbAnimationTemp = [...rgbAnimation];
    let colorVectorTemp = [...colorVector];
    console.log(rgbAnimation);
    songListTable.forEach(row => {
        row.style.backgroundColor = 'rgb(' + rgbAnimationTemp.join(',') + ')';
        row.querySelectorAll('* button').forEach((c) => {
            c.style.backgroundColor = 'rgb(' + rgbAnimationTemp.join(',') + ')';
        });
        row.querySelectorAll('*').forEach((c) => {
            c.style.color = ((0.2126 * rgbAnimationTemp[0] + 0.7152 * rgbAnimationTemp[1] + 0.0722 * rgbAnimationTemp[2]) < 80) ? "white" : "black";
        });
        for (let i = 0; i < 3; i++) {
            if ((rgbAnimationTemp[i] + colorVectorTemp[i]) > 255 || (rgbAnimationTemp[i] + colorVectorTemp[i]) < 0) {
                console.log(colorVectorTemp[i] + colorVectorTemp[(i + 2) % 3] + colorVectorTemp[(i + 1) % 3]);
                if (Math.abs(colorVectorTemp[i]) + Math.abs(colorVectorTemp[(i + 2) % 3]) + Math.abs(colorVectorTemp[(i + 1) % 3]) != 3) {
                    colorVectorTemp[(i + 1) % 3] = colorVectorTemp[(i + 2) % 3] * colorVectorTemp[i];
                }
                colorVectorTemp[i] = ((colorVectorTemp[(i + 1) % 3] == 0 || (colorVectorTemp[(i + 2) % 3]) == 0) ? -colorVectorTemp[i] : 0);
            }
            rgbAnimationTemp[i] += colorVectorTemp[i];
        }
    });

    for (let i = 0; i < 3; i++) {
        if ((rgbAnimation[i] + colorVector[i]) > 255 || (rgbAnimation[i] + colorVector[i]) < 0) {
            console.log(colorVector[i] + colorVector[(i + 2) % 3] + colorVector[(i + 1) % 3]);
            if (Math.abs(colorVector[i]) + Math.abs(colorVector[(i + 2) % 3]) + Math.abs(colorVector[(i + 1) % 3]) != 3) {
                colorVector[(i + 1) % 3] = colorVector[(i + 2) % 3] * colorVector[i];
            }
            colorVector[i] = ((colorVector[(i + 1) % 3] == 0 || (colorVector[(i + 2) % 3]) == 0) ? -colorVector[i] : 0);
        }
        rgbAnimation[i] += colorVector[i];
    }
    // console.log(rgbAnimation);
}

function sortListEvent(e) {
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.tagName === 'TH') {
        // e.target.parentElement.classList[0]
        if (e.target.parentElement.classList.contains("sorted")) {
            e.target.parentElement.classList.add("descending");
        } else {
            e.target.parentElement.classList.add("sorted");
        }
        document.querySelectorAll("#all-songs tr th").filter((s) => s != e.target.parentElement).forEach(coloum => {
            if (coloum.classList.contains('sorted')) {
                coloum.classList.remove('sorted');
            }
            if (coloum.classList.contains('descending')) {
                coloum.classList.remove('descending');
            }
        });
        listData(songsLimiter(filter), songsListFilter, 'all-songs', "#centerDiv", ['song-list-format']);
    }
}

function filterListEvent(e) {
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.tagName === 'TH') {
        // Title s => s.querySelector('.title p').textContent.includes(searchquery))
        // year s => s.querySelector('.year p').textContent > #
        switch (e.target.parentElement.classList[0]) {
            case 'title':
                filter = (s1) => s1.querySelector('.title p').textContent.includes(e.target.value);
                break;
            case 'artist':
                filter = (s1) => s1.querySelector('.artist p').textContent.includes(e.target.value);
                break;
            case 'genre':
                filter = (s1) => s1.querySelector('.genre p').textContent.includes(e.target.value);
                break;
            case 'clear':
                filter = (s1) => true;
                break;
            default:
                console.warn("unfilterable option");
        }
        listData(songsLimiter(filter, sort), songsListFilter, 'all-songs', "#centerDiv", ['song-list-format']);
    }
}

function rgbEdges() {
    const leftSpeakers = document.querySelector("#leftDiv");
    const rightSpeakers = document.querySelector("#rightDiv");
    
    leftSpeakers.style.backgroundColor = 'rgb(' + rgbAnimation2.join(',') + ')';
    rightSpeakers.style.backgroundColor = 'rgb(' + rgbAnimation2.join(',') + ')';
    
    for (let i = 0; i < 3; i++) {
        if ((rgbAnimation2[i] + colorVector2[i]) > 255 || (rgbAnimation2[i] + colorVector2[i]) < 0) {
            console.log(colorVector2[i] + colorVector2[(i + 2) % 3] + colorVector2[(i + 1) % 3]);
            if (Math.abs(colorVector2[i]) + Math.abs(colorVector2[(i + 2) % 3]) + Math.abs(colorVector2[(i + 1) % 3]) != 3) {
                colorVector2[(i + 1) % 3] = colorVector2[(i + 2) % 3] * colorVector2[i];
            }
            colorVector2[i] = ((colorVector2[(i + 1) % 3] == 0 || (colorVector2[(i + 2) % 3]) == 0) ? -colorVector2[i] : 0);
        }
        rgbAnimation2[i] += colorVector2[i];
    }
    console.log("its running");
    //setTimeout(rgbEdges(), 20000);
}

    