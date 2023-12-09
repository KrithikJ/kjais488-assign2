const songsListFilter = [
    { header: "Title", type: 'p', values: ["title"], valueFunction: (obj, values) => obj[values[0]], classList: ['title'], prefix: "", sufix: "" },
    { header: "Artist", type: 'p', values: ["artist", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], classList: ['artist'], prefix: "", sufix: "" },
    { header: "Year", type: 'p', values: ["year"], valueFunction: (obj, values) => obj[values[0]], classList: ['year'], prefix: "", sufix: "" },
    { header: "Genre", type: 'p', values: ["genre", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], classList: ['genre'], prefix: "", sufix: "" },
    { header: "Popularity", type: 'p', values: ["details", "popularity"], valueFunction: (obj, values) => obj[values[0]][values[1]], classList: ['popularity'], prefix: "", sufix: "" },
    { header: "", type: 'button', values: ["song_id"], valueFunction: (obj, values) => obj[values[0]], classList: ['fav-button'], prefix: "", sufix: "" } // favorites column
];

const genresListFilter = [
    { header: "Genre", type: 'p', values: ["name"], valueFunction: (obj, values) => obj[values[0]], classList: [], prefix: "", sufix: "", spacing: "1" }
];

const artistsListFilter = [
    { header: "Artist", type: 'p', values: ["name"], valueFunction: (obj, values) => obj[values[0]], classList: [], prefix: "", sufix: "", spacing: "1" },
    { header: "Type", type: 'p', values: ["type"], valueFunction: (obj, values) => obj[values[0]], classList: [], prefix: "", sufix: "", spacing: "1" }
];
let songs = [];
let rawSongs = [];
let songsHeaders = generateListHeader(songsListFilter);
let favs = [];


// listData([...data], songsListFilter, "search-songs-list", ['song-list-format'])
function songRetrival() {
    if (localStorage.getItem("songs") === null) {
        localStorage.clear();
        console.log("fetching");
        fetch(api)
            .then(response => response.json())
            .then(data => {
                rawSongs = [...data];
                [...data].forEach((s) => {
                    songs.push(generateListRow(s, songsListFilter));
                });
                localStorage.setItem("songs", JSON.stringify(rawSongs));
                // console.log(songs);
            })
            .catch(error => console.error(error));
    } else {
        console.log("retrieving");
        rawSongs = JSON.parse(localStorage.getItem("songs"));
        [...rawSongs].forEach((s) => {
            songs.push(generateListRow(s, songsListFilter));
        })
        // console.log(songs);
    }
    let canvasElement = document.createElement("canvas");
    canvasElement.id = "test";
    document.querySelector("body").appendChild(canvasElement);
    generateSongRadar(1168, canvasElement);
    loadFavs();
    // listData(songs, songsListFilter, 'all-songs', ['song-list-format']);
}

function loadFavs() {
    if (localStorage.getItem("favs") === null) {
        localStorage.setItem("favs", JSON.stringify([]));
    } else {
        favs = JSON.parse(localStorage.getItem("favs"));
    }
    favs.forEach(id => {
        songs.forEach(s => {
            if (s.id == id && s.hasClass("favs")) {
                id.classList.add("favs");
            }
        });
    });
}

function saveFavs() {
    if (localStorage.getItem("favs") === null) {
        localStorage.setItem("favs", JSON.stringify([]));
    } else {
        localStorage.setItem("favs", JSON.stringify(favs));
    }
}

function generateSongRadar(id, canvas) {
    let song = rawSongs.find((s) => s.song_id == id);
    console.log("test");
    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Acousticness', 'Danceability', 'Energy', 'Liveness', 'Speechiness', 'Valence'],
            datasets: [{
                label: song.title,
                data: [song['analytics']['acousticness'], song['analytics']['danceability'], song['analytics']['energy'], song['analytics']['liveness'], song['analytics']['speechiness'], song['analytics']['valence']],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
}

// Title s => s.querySelector('.title p').textContent.includes(searchquery))
// year s => s.querySelector('.year p').textContent > #

function songsLimiter(filtering, sorting) {
    let songsFiltered = songs.filter(filtering(s));
    return songsFiltered.sort(sorting(s));
}

function listData(data, columns, listName, parentNodeQuery = "body", extraclasses = []) {
    // console.log(data);
    let container = document.createElement('table');;
    container.id = listName;
    container.style.backgroundColor = "red";
    container.classList.add("data-list");
    container.replaceChildren(songsHeaders);
    for (const obj of data) {
        //console.log(obj);
        container.appendChild(obj);
    }
    extraclasses.forEach((c) => { container.classList.add(c) });
    if (document.querySelector("#" + listName) !== null) {
        container = document.querySelector("#" + listName);
    } else {
        document.querySelector(parentNodeQuery).appendChild(container);
    }
}

function generateListHeader(columns) {
    let headers = document.createElement('tr');
    headers.classList.add("list-headers");
    for (let column of columns) {
        let header = document.createElement('button');
        header.textContent = column.header;
        let c = document.createElement('th');
        c.appendChild(header);
        headers.appendChild(c);
    }
    return headers;
}

function generateListRow(obj, columns) {
    let row = document.createElement('tr');
    row.classList.add('table-row');
    row.id = obj.song_id;
    for (let column of columns) {
        let value = document.createElement(column['type']);
        switch (column['type']) {
            case 'p':
                value.textContent = column.valueFunction(obj, column.values);
                break;
            case 'button':
                value.textContent = column.valueFunction(obj, column.values);
                break;
            default:
                console.warn('Missing/Incorrect List Column Type');
                break;
        }
        let cell = document.createElement('td');
        cell.appendChild(value);
        column['classList'].forEach(c => { cell.classList.add(c); });
        row.appendChild(cell);
    }
    return row;
}

