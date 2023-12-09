// columns objects has a list of the following  {header: str, type: str, values: array/list, valueFunction: func, prefix: str, sufix: str}
songRetrival();
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("body").appendChild(listData(songs, songsListFilter, 'all-songs', ['song-list-format']));

    //need to simplify this

    const view = document.createElement("button");
    view.textContent = "View Playlist";
    view.setAttribute("id", "view");
    view.setAttribute("type", "button");



    document.querySelector("#span").appendChild(view);
    createCreditsButton()


    const backBtn = document.createElement("button");

    backBtn.textContent = "Back";
    backBtn.setAttribute("id", "back");
    backBtn.classList.add("hidden");
    document.querySelector("#span").appendChild(backBtn);


    //favourites = [];

    /*

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
    */
    //const sampleSongs = loadSampleSongs();
    const genres = loadGenres();
    const artists = loadArtists();

    /*
    function listData(data, columns, listName) {
        // console.log(data);
        let container = document.createElement('div');
        container.id = listName;
        container.style.display = 'grid';
        container.style.backgroundColor = "red"
        let spacing = "";
        columns.forEach(element => {
            spacing += element.spacing + "fr ";
        });
        container.style.gridTemplateColumns = spacing;
        container.classList.add("data-list");
        for (let column of columns) {
            let header = document.createElement('button');
            header.textContent = column.header;
            header.classList.add("list-header");
            container.appendChild(header);

            //Working on the sorts here. Using event delegation


            header.addEventListener("click", function(e) {

                if (e.target.tagName == "BUTTON") {

                    if (e.target.textContent == "Title") {

                        data.sort(function(a, b) {

                            if (a.title < b.title) {

                                return -1;

                            } else if (a.title > b.title) {
                                return 1;
                            } else {
                                return 0;
                            }


                        });

                    }
                }
            });
        }

        for (const obj of data) {
            let row = generateListRow(obj, ((data.indexOf(obj) % 2) == 1), columns);
            row.forEach(column => {
                column.classList.toggle("hidden");
                column.setAttribute("disabled", "disabled");
                container.appendChild(column);
            });
        }
        container.childNodes
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

*/
    //Do we even need these anymore?
    function loadArtists() {
        // for (artist of artistsArr) {
        //     console.log("artist id:" + artist["id"]); //test
        // }

        return artistsArr; //JSON.parse(artistsArr);
    }

    function loadGenres() {
        // for (genre of genresArr) {
        //     console.log("genre id:" + genre["id"]);
        // }

        return genresArr; //JSON.parse(genresArr)
    }
    /*
        function loadSampleSongs() {
            // for (song of sampleSongsArr) {
            //     console.log("song id:" + song["song_id"]);
            // }
            return JSON.parse(sampleSongsArr);
        }
     */


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

    function favouritesHandler(e) {

        if (e.target.tagName == "BUTTON" && e.target.classList.contains("fav-button")) {

            //check for favs class, 

            if (e.target.parentElement.parentElement.classList.contains("favs")) {

                e.target.parentElement.parentElement.classList.remove("favs");

                favs = favs.filter(function(f) {
                    if (f.id != e.target.parentElement.parentElement.id) {
                        return f;
                    }

                });

                e.target.style.backgroundColor = "";




            } else {
                e.target.style.backgroundColor = "yellow";

                e.target.parentElement.parentElement.classList.add("favs");
                //e.target.parentElement.parentElement.classList.add("verify");

                favs.push(e.target.parentElement.parentElement.id);


                const trs = document.querySelectorAll(".favs");

                const message = document.createElement("div");

                message.textContent = "The selected song has been added to your playlist";

                message.classList.add("animateBox");

                document.querySelector("#span").appendChild(message);


            }

            /*
                        if (!e.target.parentElement.parentElement.classList.contains("favs") && !backBtn.classList.contains("hidden")) {

                            e.target.parentElement.parentElement.classList.add("hidden");
                        }

                        */
            favs.forEach(function(f) {

                if (f.id != e.target.parentElement.parentElement.id && !backBtn.classList.contains("hidden")) {
                    e.target.parentElement.parentElement.classList.add("hidden");

                    console.log(favs);

                }

            });


        }
        saveFavs();

        console.log(favs);
    }

    /*
    function addHandler(e) {
       
        if (e.target.tagName == "BUTTON" && e.target.id == "add") {

            const trs = document.querySelectorAll(".favs");

            const message = document.createElement("div");

            message.textContent = "The selected song has been added to your playlist";


            message.classList.add("animateBox");


            document.querySelector("#span").appendChild(message);


            for (tr of trs) {
                tr.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.style.backgroundColor = "";
            }

            console.log(localStorage.getItem("favs"));


        }

    }*/



    function viewHandler(e) {

        if (e.target.tagName == "BUTTON" && e.target.id == "view") {

            console.log("gello");

            backBtn.classList.remove("hidden");



            // remove.classList.remove("hidden");

            displayFavView();

        }



    }


    function displayFavView() {



        //This function will be responsible for creating the view of the playlist

        const trs = document.querySelectorAll(".table-row");

        trs.forEach(function(tr) {

            if (!tr.classList.contains("favs")) {

                tr.classList.add("hidden");




            }

        })

        document.querySelector("form").classList.add("hidden");

        /*
                remove.addEventListener("click", function() {
                    trs.forEach(function(tr) {

                        if ((!tr.classList.contains("hidden") && !tr.classList.contains("favs"))) {
                            tr.classList.add("hidden");
                        }
                    })
                })*/

        backBtn.addEventListener("click", function() {


            trs.forEach(function(tr) {


                if (tr.classList.contains("hidden")) {
                    tr.classList.remove("hidden");
                }

                if (document.querySelector("form").classList.contains("hidden")) {

                    document.querySelector("form").classList.remove("hidden");
                }

            })


            backBtn.classList.add("hidden");
            //remove.classList.add("hidden");

        });

    }


    //This is a test function.
    //This function is responsible for extracting the values that the user selected

    //Need to fix this still

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

    function sortHandler(e) {



    }

    //Still need to implement removing from playlist.

    //create side div bars - NOT CALLED HAVENT IMPLEMENTED
    function createLeftDivBar() {
        const body = this.querySelector("body");
        const sideDivBarLeft = document.createElement("div")
        sideDivBarLeft.setAttribute("class", "sidebar-left");
        sideDivBarLeft.style.width = '100px';
        sideDivBarLeft.style.backgroundColor = "red";
        body.appendChild(sideDivBarLeft);
    }

    function createCreditsButton() {
        const header1 = document.querySelector("#header1");
        const credits = document.createElement("button");
        credits.textContent = "Credits";
        credits.setAttribute("id", "creditButton")
            //header1.appendChild(credits);

        credits.addEventListener("mouseover", function() {
            creditPanel.style.display = "block";

            setTimeout(function() {
                creditPanel.style.display = "none";
            }, 3000);
        });
        document.querySelector("#span").appendChild(credits);
    }


    function generateSearchForm() {

        //This function loads the form via JS
        const form = document.querySelector("form");

        const formTitle = document.createElement("p");
        formTitle.textContent = "Song Search";
        formTitle.setAttribute("id", "formTitle")
        form.appendChild(formTitle);

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
        labelOne.setAttribute("id", "labelOne");
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
        labelTwo.setAttribute("id", "labelTwo");
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
        labelThree.setAttribute("id", "labelThree");
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
    }

    generateSearchForm();


    form.addEventListener('click', formHandler);

    form.addEventListener('click', filterHandler);

    document.querySelector("body").addEventListener('click', favouritesHandler);



    document.querySelector("body").addEventListener('click', sortHandler);



    document.querySelector("body").addEventListener('click', viewHandler);




    //add playlist button

    //add add to playlist button




    //console.log(favourites);

    function loadPageComponents() {
        let list = listData(songs, songsListFilter, 'all-songs');
        document.querySelector('body').appendChild(list);
        animateLists(true, list, songsListFilter);
    }








    // loadPageComponents();
    // setTimeout(loadPageComponents, 2000);
    // let list = listData(songs, songsListFilter, 'all-songs');
    // document.querySelector('body').appendChild(list);
    // document.querySelector('body').appendChild(listData(genres, genresListFilter, 'all-genres'));
    // document.querySelector('body').appendChild(listData(artists, artistsListFilter, 'all-artists')); 

});