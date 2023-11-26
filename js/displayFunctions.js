// columns objects has a list of the following  {header: str, type: str, values: array/list, valueFunction: func, prefix: str, sufix: str}

document.addEventListener("DOMContentLoaded", function() {

    const songsListFilter = [
        { header: "Title", type: 'str', values: ["title"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "5" },
        { header: "Artist", type: 'str', values: ["artist", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "", spacing: "2" },
        { header: "Year", type: 'str', values: ["year"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "1" },
        { header: "Genre", type: 'str', values: ["genre", "name"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "", spacing: "2" },
        { header: "Popularity", type: 'str', values: ["details", "popularity"], valueFunction: (obj, values) => obj[values[0]][values[1]], prefix: "", sufix: "", spacing: "1" },
        { header: "", type: 'btn', values: ["song_id"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "1" } // favorites column
    ];

    const genresListFilter = [
        { header: "Genre", type: 'str', values: ["name"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "1" }
    ];

    const artistsListFilter = [
        { header: "Artist", type: 'str', values: ["name"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "1" },
        { header: "Type", type: 'str', values: ["type"], valueFunction: (obj, values) => obj[values[0]], prefix: "", sufix: "", spacing: "1" }
    ];

    const sampleSongs = loadSampleSongs();
    const genres = loadGenres();
    const artists = loadArtists();

    function listData(data, columns, listName) {
        // console.log(data);
        let container = document.createElement('div');
        container.id = listName;
        container.style.display = 'grid';
        let spacing = "";
        columns.forEach(element => {
            spacing += element.spacing + "fr ";
        });
        container.style.gridTemplateColumns = spacing;
        container.classList.add("data-list");
        for (let column of columns) {
            let header = document.createElement('p');
            header.textContent = column.header;
            header.classList.add("list-header");
            container.appendChild(header);
        }
        let n = 50;
        for (const obj of data) {
            let row = generateListRow(obj, ((data.indexOf(obj) % 2) == 1), columns);
            setTimeout(() => { row.forEach(column => { container.appendChild(column) }) }, n);
            n += 50;
        }
        return container;
    }

    function generateListRow(obj, alt, columns) {
        let row = [];
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
            if (alt) {
                value.classList.add('altRowCell');
            }
            // value.style.display = "none";
            row.push(value);
        }
        return row;
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
            const divs = document.querySelectorAll(".formDiv");
            for (div of divs) {

                if (div.firstChild != e.target) {
                    div.firstChild.nextSibling.nextSibling.setAttribute("disabled", "disabled");
                }
            }
            if (parent.firstChild.checked) {
                parent.firstChild.nextSibling.nextSibling.removeAttribute("disabled");
            }
        }



    }

    //This is a test function.
    //This function is responsible for extracting the values that the user selected


    function filterHandler(e) {

        if (e.target.tagName == "BUTTON" && e.target.textContent == "Filter") {
            const divs = document.querySelectorAll(".formDiv");

            //  e.target.style.backgroundColor = "yellow";

            for (d of divs) {

                if (d.firstChild.checked) {


                    e.target.style.backgroundColor = "yellow";

                    var text = d.firstChild.nextSibling.nextSibling.value;

                    //NOW ADD code for using data.
                    //Searching will most likely occur here?

                    console.log(text);


                    //Test to see if the extracted value stays.
                    const newDiv = document.createElement("div");

                    newDiv.textContent = text;

                    d.appendChild(newDiv);


                }


            }

        }
    }




    function generateSearchForm() {

        //This function loads the form via JS

        const form = document.querySelector("form");

        //Section 1 Song name

        const divOne = document.createElement("div");
        divOne.className = "formDiv";
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
        divTwo.className = "formDiv";
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


        divTwo.appendChild(selectOne);

        form.appendChild(divTwo);


        // Section 3 Genres

        const divThree = document.createElement("div");
        divThree.className = "formDiv";
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
        filterButton.className = "filter";
        filterButton.textContent = "Filter";
        filterButton.setAttribute("id", "filterBtn");
        filterButton.setAttribute("type", "button");

        form.appendChild(filterButton);

        console.log("hello");

    }



    generateSearchForm();

    form.addEventListener('click', formHandler);

    form.addEventListener('click', filterHandler);


    function loadPageComponents() {
        let list = listData(songs, songsListFilter, 'all-songs');
        document.querySelector('body').appendChild(list);
    }

    // loadPageComponents();
    setTimeout(loadPageComponents, 1000);
    // let list = listData(songs, songsListFilter, 'all-songs');
    // document.querySelector('body').appendChild(list);
    // document.querySelector('body').appendChild(listData(genres, genresListFilter, 'all-genres'));
    // document.querySelector('body').appendChild(listData(artists, artistsListFilter, 'all-artists')); 

});