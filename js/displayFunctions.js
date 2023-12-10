// columns objects has a list of the following  {header: str, type: str, values: array/list, valueFunction: func, prefix: str, sufix: str}
document.addEventListener("DOMContentLoaded", function () {
    let canvasElement = document.createElement('canvas');

    songRetrival(canvasElement);

    setInterval(rgbEdges, 1);
    setInterval(updateAnimation, 1);
    createPlaylistSnackbar();
    //setInterval(function () { alert("alerttt")    }, 500)

    // listData(songs, songsListFilter, 'all-songs', '#parentDiv', ['song-list-format']);
    // let canvasElement = document.createElement('canvas');
    // canvasElement.setAttribute("id", "test");
    // console.log(canvasElement);
    // let content = document.querySelector("#centerDiv");

    // content.appendChild(canvasElement);
    //generateSongRadar(1168, canvasElement);

    //need to simplify this

    const view = document.createElement("button");
    view.textContent = "View Playlist";
    view.setAttribute("id", "view");
    view.setAttribute("type", "button");



    document.querySelector("#span").appendChild(view);
    createCreditsButton()

    const songUl = document.createElement("div");
    songUl.classList.add("info");
    songUl.classList.add("hidden");
    document.querySelector("#centerDiv").appendChild(songUl);

    const backBtn = document.createElement("button");

    backBtn.textContent = "Back";
    backBtn.setAttribute("id", "back");
    backBtn.classList.add("hidden");
    document.querySelector("#span").appendChild(backBtn);

    backBtn.addEventListener("click", function () {

        const trs = document.querySelectorAll(".table-row");

        trs.forEach(function (tr) {


            if (tr.classList.contains("hidden")) {
                tr.classList.remove("hidden");
            }

            if (document.querySelector("form").classList.contains("hidden")) {

                document.querySelector("form").classList.remove("hidden");
            }
            if (document.querySelector(".list-headers").classList.contains("hidden")) {
                document.querySelector(".list-headers").classList.remove("hidden");
            }



            songUl.classList.add("hidden");

            document.querySelector("#canvas").style.display = "none";

            document.querySelector("#view").classList.remove("hidden");

        });


        backBtn.classList.add("hidden");
        //remove.classList.add("hidden");

    });


    //const sampleSongs = loadSampleSongs();
    const genres = loadGenres();
    const artists = loadArtists();

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



        if (e.target.tagName == "BUTTON" && e.target.parentElement.classList.contains("fav-button") && e.target.parentElement.tagName != "TH") {

            console.log(e.target);
            //check for favs class, 

            if (e.target.parentElement.parentElement.classList.contains("favs")) {


                e.target.parentElement.parentElement.classList.remove("favs");
                // e.target.parentElement.parentElement.classList.add("hidden");

                favs = favs.filter(function (f) {
                    if (e.target.parentElement.parentElement.id != f) {

                        return f;
                    }

                });

                // e.target.style.backgroundColor = "";

            } else {
                // e.target.style.backgroundColor = "yellow";

                e.target.parentElement.parentElement.classList.add("favs");

                //e.target.parentElement.parentElement.classList.add("verify");

                favs.push(e.target.parentElement.parentElement.id);

                const trs = document.querySelectorAll(".favs");

                const message = document.createElement("div");

                //message.textContent = "The selected song has been added to your playlist";

                message.classList.add("animateBox");

                document.querySelector("#span").appendChild(message);


            }

            favs.forEach(function (f) {

                if (f != e.target.parentElement.parentElement.id && !backBtn.classList.contains("hidden")) {

                    e.target.parentElement.parentElement.classList.add("hidden");

                    console.log(favs);

                }

            });


        }
        saveFavs();

        console.log(favs);
    }


    function viewHandler(e) {

        if (e.target.tagName == "BUTTON" && e.target.id == "view") {


            console.log("hello");

            backBtn.classList.remove("hidden");

            displayFavView();

            if (!document.querySelector("#canvas").classList.contains("hidden")) {
                document.querySelector("#canvas").classList.add("hidden");
                // document.querySelector("#canvas").style.display = "none";


            }


        }
    }

    function viewHandler2(e) {
        if (e.target.tagName == "P" && e.target.parentElement.classList.contains("title")) {
            console.log(document.querySelector("#canvas"));
            if (document.querySelector("#canvas").classList.contains("hidden")) {
                document.querySelector("#canvas").classList.remove("hidden");

            }

            console.log(e.target);

            e.target.classList.add("clicked");



            const tds = document.querySelectorAll(".title");

            backBtn.classList.remove("hidden");


            for (td of tds) {


                td.parentElement.classList.add("hidden");


                if (td.firstChild.classList.contains("clicked")) {

                    generateSongRadar(e.target.parentElement.parentElement.id, canvasElement);

                    document.querySelector("#view").classList.add("hidden");

                    console.log(rawSongs);

                    rawSongs.forEach(function (s) {


                        songUl.classList.remove("hidden");

                        let ul = document.createElement("ul");

                        if (s["song_id"] == e.target.parentElement.parentElement.id) {

                            let listOfDataPoint = [];

                            console.log(s.song_id + s.title + s.year + s.analytics.energy);

                            const bpm = document.createElement("li");
                            bpm.textContent = "BPM: " + s.details.bpm;

                            ul.appendChild(bpm);

                            listOfDataPoint.push(bpm);

                            const energy = document.createElement("li");
                            energy.textContent = "Energy: " + s.analytics.energy;
                            ul.appendChild(energy);

                            listOfDataPoint.push(energy)

                            const danceability = document.createElement("li");
                            danceability.textContent = "Danceability: " + +s.analytics.danceability;
                            ul.appendChild(danceability);

                            listOfDataPoint.push(danceability);


                            const liveness = document.createElement("li");
                            liveness.textContent = "Liveness: " + s.analytics.liveness;
                            ul.appendChild(liveness);

                            listOfDataPoint.push(liveness);

                            const valence = document.createElement("li");
                            valence.textContent = "Valence: " + s.analytics.valence;
                            ul.appendChild(valence);

                            listOfDataPoint.push(valence);

                            const acousticness = document.createElement("li");
                            acousticness.textContent = "Acousticness: " + s.analytics.acousticness;
                            ul.appendChild(acousticness);

                            listOfDataPoint.push(acousticness);

                            const speechiness = document.createElement("li");
                            speechiness.textContent = "Speechiness: " + s.analytics.speechiness;
                            ul.appendChild(speechiness);

                            listOfDataPoint.push(speechiness);

                            const popularity = document.createElement("li");
                            popularity.textContent = "Popularity: " + s.details.popularity;
                            ul.appendChild(popularity);

                            listOfDataPoint.push(popularity.textContent);

                            // document.querySelector("#centerDiv").appendChild(songUl);

                            songUl.replaceChildren(ul);



                        }

                    });

                }


            }



            e.target.classList.remove("clicked");

            if (document.querySelector(".list-headers").classList.contains("hidden")) {
                document.querySelector(".list-headers").classList.remove("hidden");


            }


        }
    }

    function displayFavView() {

        //This function will be responsible for creating the view of the playlist

        const trs = document.querySelectorAll(".table-row");
        trs.forEach(function (tr) {

            if (!tr.classList.contains("favs")) {

                tr.classList.add("hidden");
            }

        })

        document.querySelector("form").classList.add("hidden");
    }


    function filterHandler(e) {

        if (e.target.tagName == "BUTTON" && e.target.textContent == "Filter") {
            const divs = document.querySelectorAll(".formDiv");

            //  e.target.style.backgroundColor = "yellow";

            for (d of divs) {

                if (d.firstChild.checked) {
                    e.target.style.backgroundColor = "yellow";

                    var input = d.querySelectorAll("input[type='text' i], select")[0];

                    //NOW ADD code for using data.
                    //Searching will most likely occur here?
                    // console.log(input);


                    //Test to see if the extracted value stays.
                    // const newDiv = document.createElement("div");

                    // newDiv.textContent = text;

                    // d.appendChild(newDiv);

                    filterListEvent(input.value, input.id); // for creating a filter for the list

                }


            }

        }
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

        credits.addEventListener("mouseover", function () {
            creditPanel.style.display = "block";

            setTimeout(function () {
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
        selectOne.setAttribute('id', 'artist');
        selectOne.setAttribute("disabled", "disabled");


        //loading artist names into the select via option tags


        const blankOption1 = document.createElement("option");

        selectOne.appendChild(blankOption1);

        for (artist of artists) {

            const option = document.createElement("option");

            option.setAttribute("value", artist['name']);

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
        selectTwo.setAttribute('id', 'genre');
        selectTwo.setAttribute("disabled", "disabled");

        const blankOption2 = document.createElement("option");

        selectTwo.appendChild(blankOption2);

        //Loading genre names into the select via option tags

        for (genre of genres) {

            const option = document.createElement("option");

            option.setAttribute("value", genre['name']);

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
    form.addEventListener('reset', (e) => { filterListEvent("", "") });

    document.querySelector("body").addEventListener('click', favouritesHandler);


    document.querySelector("body").addEventListener('click', sortListEvent);

    document.querySelector("body").addEventListener('click', viewHandler);
    document.querySelector("body").addEventListener('click', viewHandler2);

    //leaving this like this for now
    /*
        document.querySelector("body").addEventListener('click', function(e) {

            if (e.target.tagName == "P" && e.target.parentElement.classList.contains("title")) {

                console.log(e.target);

                e.target.classList.add("clicked");

                const tds = document.querySelectorAll(".title");

                let x = false;


                for (td of tds) {
                    if (!td.firstChild.classList.contains("clicked")) {

                        td.parentElement.classList.add("hidden");

                    } else if (td.firstChild.classList.contains("clicked")) {

                        generateSongRadar(e.target.parentElement.parentElement.id, canvasElement);

                    }
                }

                e.target.classList.remove("clicked");


            }

        });
    */


    function loadPageComponents() {
        let list = listData(songs, songsListFilter, 'all-songs');
        document.querySelector('body').appendChild(list);
        animateLists(true, list, songsListFilter);
    }

    function createPlaylistSnackbar() {
        const playlistSnackbar = document.querySelectorAll(".fav-button");

        for (let p of playlistSnackbar) {

            let computedStyle = window.getComputedStyle(p);

            // Get the background color property
            let backgroundColor = computedStyle.backgroundColor;
            console.log('Background Color:', backgroundColor);

            if (backgroundColor = "rgb(240, 240, 240)") {
                p.addEventListener("click", function () {
                    playlistPanelAdd.style.display = "block";

                    setTimeout(function () {
                        playlistPanelAdd.style.display = "none";
                    }, 3000);
                    console.log('Background Color:', backgroundColor);
                });
            } else {
                p.addEventListener("click", function () {
                    playlistPanelAdd.style.display = "block";

                    setTimeout(function () {
                        playlistPanelAdd.style.display = "none";
                    }, 3000);
                    console.log('Background Color:', backgroundColor);
                });
            }

        }

    }


    /*
        function snackBarHandler(e) {

            if (e.target.tagName == "BUTTON" && e.target.classList.contains("fav-button")) {

                if (e.target.style.backgroundColor == "yellow") {

                    setTimeout(function() {
                        playlistPanelAdd.style.display = "block";
                    }, 3000);


                } else if (e.target.style.backgroundColor == "") {

                }



            }


        }

    */



    // loadPageComponents();
    // setTimeout(loadPageComponents, 2000);
    // let list = listData(songs, songsListFilter, 'all-songs');
    // document.querySelector('body').appendChild(list);
    // document.querySelector('body').appendChild(listData(genres, genresListFilter, 'all-genres'));
    // document.querySelector('body').appendChild(listData(artists, artistsListFilter, 'all-artists')); 

});