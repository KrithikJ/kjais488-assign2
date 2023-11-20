// columns objects has a list of the following  {header: str, type: str, values: array/list, valueFunction: func, prefix: str, sufix: str}


const songsListFilter = [
    { header: "Title", type: 'str', values: ["title"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" },
    { header: "Artist", type: 'str', values: ["artist", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "" },
    { header: "Year", type: 'str', values: ["year"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" },
    { header: "Genre", type: 'str', values: ["genre", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "" },
    { header: "Popularity", type: 'str', values: ["details", "popularity"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "" },
    { header: "", type: 'btn', values: ["song_id"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" } // favorites column
];

const genresListFilter = [
    { header: "Genre", type: 'str', values: ["name"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" }
];

const artistsListFilter = [
    { header: "Artist", type: 'str', values: ["name"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" },
    { header: "Type", type: 'str', values: ["type"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "" }
];

const sampleSongs = loadSampleSongs();
const genres = loadGenres();
const artists = loadArtists();

function listData(data, columns, listName) {
    let container = document.createElement('div');
    container.id = listName;
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;
    for (let column of columns) {
        let header = document.createElement('p');
        header.textContent = column.header;
        container.appendChild(header);
    }
    for (const obj of data) {
        for (let column of columns) {
            let value;
            switch (column['type']) {
                case 'str':
                    value = document.createElement('p');
                    value.textContent = column.valueFunction(obj, column.values);
                    break;
                case 'link':
                    value = document.createElement('a');
                    value.textContent = obj[column.values[0]];
                    value.href = column.valueFunction(obj, column.values);
                    break;
                case 'img':
                    value = document.createElement('img');
                    value.src = column.valueFunction(obj, column.values);
                    break;
                case 'btn':
                    value = document.createElement('button');
                    value.textContent = column.valueFunction(obj, column.values);
                    break;
                default:
                    value = document.createElement('div');
                    console.warn('Missing/Incorrect List Column Type');
                    break;
            }
            if ((data.indexOf(obj) % 2) == 1) {
                // console.log('Testing');
                value.classList.add('altRowCell');
            }
            container.appendChild(value);
        }
    }
    return container;
}

function loadArtists() {
    // for (artist of artistsArr) {
    //     console.log("artist id:" + artist["id"]); //test
    // }

    return JSON.parse(artistsArr);
}

function loadGenres() {
    // for (genre of genresArr) {
    //     console.log("genre id:" + genre["id"]);
    // }

    return JSON.parse(genresArr);
}

function loadSampleSongs() {
    // for (song of sampleSongsArr) {
    //     console.log("song id:" + song["song_id"]);
    // }
    return JSON.parse(sampleSongsArr);
}



function formHandler(e) {


    if (e.target.className == "radio") {

        const parent = e.target.parentElement;
        const divs = document.querySelectorAll("div");
        for (div of divs) {

            if (div.firstChild != e.target) {
                div.firstChild.nextSibling.nextSibling.setAttribute("disabled", "disabled");
            } else {

            }
        }
        if (parent.firstChild.checked) {
            parent.firstChild.nextSibling.nextSibling.removeAttribute("disabled");
        }
    }



}

//Event delegation onto the form tag




function generateSearchForm() {

    //This function loads the form via JS

    const form = document.querySelector("form");

    //Section 1 Song name


    const divOne = document.createElement("div");
    const radioOne = document.createElement("input");
    radioOne.setAttribute('id', 't');
    radioOne.setAttribute('type', 'radio');
    radioOne.setAttribute('name', 'typeSelection');
    radioOne.className = "radio";

    divOne.appendChild(radioOne);

    const labelOne = document.createElement("label");
    labelOne.setAttribute('for', 'title');
    labelOne.textContent = "Title";

    divOne.appendChild(labelOne);

    const inputOne = document.createElement("input");
    inputOne.setAttribute('type', 'text');
    inputOne.setAttribute('id', 'title');
    inputOne.setAttribute("disabled", "disabled");

    divOne.appendChild(inputOne);

    form.appendChild(divOne);



    // Section 2 Artists

    const divTwo = document.createElement("div");
    const radioTwo = document.createElement("input");
    radioTwo.setAttribute('id', 'a');
    radioTwo.setAttribute('type', 'radio');
    radioTwo.setAttribute('name', 'typeSelection');
    radioTwo.className = "radio";


    divTwo.appendChild(radioTwo);

    const labelTwo = document.createElement("label");
    labelTwo.setAttribute('for', 'title');
    labelTwo.textContent = "Artist";

    divTwo.appendChild(labelTwo);

    const selectOne = document.createElement("select");
    selectOne.setAttribute('id', 'selectOne');
    selectOne.setAttribute("disabled", "disabled");


    //loading artist names into the select via option tags


    const blankOption1 = document.createElement("option");

    selectOne.appendChild(blankOption1);

    for (artist of artists) {

        const option = document.createElement("option");

        option.setAttribute("value", artist['id']);

        option.textContent = artist['name'];

        selectOne.appendChild(option);

    }

    inputOne.setAttribute('id', 'title');

    divTwo.appendChild(selectOne);

    form.appendChild(divTwo);


    // Section 3 Genres

    const divThree = document.createElement("div");
    const radioThree = document.createElement("input");
    radioThree.setAttribute('id', 'g');
    radioThree.setAttribute('type', 'radio');
    radioThree.setAttribute('name', 'typeSelection');
    radioThree.className = "radio";


    divThree.appendChild(radioThree);


    const labelThree = document.createElement("label");
    labelThree.setAttribute('for', 'title');
    labelThree.textContent = "Genre";

    divThree.appendChild(labelThree);

    const selectTwo = document.createElement("select");
    selectTwo.setAttribute('id', 'selectTwo');
    selectTwo.setAttribute("disabled", "disabled");

    const blankOption2 = document.createElement("option");

    selectTwo.appendChild(blankOption2);

    //Loading genre names into the select via option tags

    for (genre of genres) {

        const option = document.createElement("option");

        option.setAttribute("value", genre['id']);

        option.textContent = genre['name'];

        selectTwo.appendChild(option);

    }

    divThree.appendChild(selectTwo);

    form.appendChild(divThree);


    //clear button

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";

    clearButton.setAttribute("id", "clearBtn");
    clearButton.setAttribute('type', 'reset');

    form.appendChild(clearButton);


    //filter button

    const filterButton = document.createElement("button");
    filterButton.textContent = "Filter";

    filterButton.setAttribute("id", "filterBtn");

    form.appendChild(filterButton);

    return form;
}


document.addEventListener("DOMContentLoaded", function() {

    generateSearchForm();

    form.addEventListener('click', formHandler);


    document.querySelector('body').appendChild(listData(sampleSongs, songsListFilter, 'all-songs'));
    // document.querySelector('body').appendChild(listData(genres, genresListFilter, 'all-genres'));
    // document.querySelector('body').appendChild(listData(artists, artistsListFilter, 'all-artists')); 



});