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
            if((data.indexOf(obj) % 2) == 1){
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
    
    return artistsArr;
}

function loadGenres() {
    // for (genre of genresArr) {
    //     console.log("genre id:" + genre["id"]);
    // }
    
    return genresArr;
}

function loadSampleSongs() {
    // for (song of sampleSongsArr) {
    //     console.log("song id:" + song["song_id"]);
    // }
    return sampleSongsArr;
}

function dissableInput(radioOne, radioTwo, radioThree, selectOne, selectTwo, inputOne, form) {


    function formHandler(e) {

        if (e.target.tagName == "INPUT" && e.target.className == "radio")

        {
            if (e.target == radioOne) {

                selectOne.setAttribute("disabled", "disabled");
                selectTwo.setAttribute("disabled", "disabled");

                if (inputOne.getAttribute("disabled")) {
                    inputOne.removeAttribute("disabled");
                }



            } else if (e.target == radioTwo) {

                inputOne.setAttribute("disabled", "disabled");
                selectTwo.setAttribute("disabled", "disabled");

                if (selectOne.getAttribute("disabled")) {
                    selectOne.removeAttribute("disabled");
                }


            } else if (e.target == radioThree) {

                inputOne.setAttribute("disabled", "disabled");
                selectOne.setAttribute("disabled", "disabled");

                if (selectTwo.getAttribute("disabled")) {
                    selectTwo.removeAttribute("disabled");
                }

            }

        }
    }

    //Event delegation onto the form tag
    form.addEventListener('click', formHandler);
}

function songSearchForm() {

    //This function loads the form via JS


    const artists = artistsArr;

    const genres = genresArr;

    const form = document.querySelector("form");

    //Section 1 Song name

    const radioOne = document.createElement("input");
    radioOne.setAttribute('id', 't');
    radioOne.setAttribute('type', 'radio');
    radioOne.setAttribute('name', 'typeSelection');
    radioOne.className = "radio";

    form.appendChild(radioOne);

    const labelOne = document.createElement("label");
    labelOne.setAttribute('for', 'title');
    labelOne.textContent = "Title";

    form.appendChild(labelOne);

    const inputOne = document.createElement("input");
    inputOne.setAttribute('type', 'text');
    inputOne.setAttribute('id', 'title');

    form.appendChild(inputOne);

    // Section 2 Artists

    const radioTwo = document.createElement("input");
    radioTwo.setAttribute('id', 'a');
    radioTwo.setAttribute('type', 'radio');
    radioTwo.setAttribute('name', 'typeSelection');
    radioTwo.className = "radio";


    form.appendChild(radioTwo);

    const labelTwo = document.createElement("label");
    labelTwo.setAttribute('for', 'title');
    labelTwo.textContent = "Artist";

    form.appendChild(labelTwo);

    const selectOne = document.createElement("select");
    selectOne.setAttribute('id', 'selectOne');


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

    form.appendChild(selectOne);

    // Section 3 Genres

    const radioThree = document.createElement("input");
    radioThree.setAttribute('id', 'g');
    radioThree.setAttribute('type', 'radio');
    radioThree.setAttribute('name', 'typeSelection');
    radioThree.className = "radio";


    form.appendChild(radioThree);


    const labelThree = document.createElement("label");
    labelThree.setAttribute('for', 'title');
    labelThree.textContent = "Genre";

    form.appendChild(labelThree);

    const selectTwo = document.createElement("select");
    selectTwo.setAttribute('id', 'selectTwo');

    const blankOption2 = document.createElement("option");

    selectTwo.appendChild(blankOption2);

    //Loading genre names into the select via option tags

    for (genre of genres) {

        const option = document.createElement("option");

        option.setAttribute("value", genre['id']);

        option.textContent = genre['name'];

        selectTwo.appendChild(option);

    }

    form.appendChild(selectTwo);


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




    dissableInput(radioOne, radioTwo, radioThree, selectOne, selectTwo, inputOne, form);


}
function displaySongSearch() {

    document.addEventListener("DOMContentLoaded", function() {

        songSearchForm();

    });



}

displaySongSearch();
document.querySelector('body').appendChild(listData(sampleSongs, songsListFilter, 'all-songs'));
// document.querySelector('body').appendChild(listData(genres, genresListFilter, 'all-genres'));
// document.querySelector('body').appendChild(listData(artists, artistsListFilter, 'all-artists'));