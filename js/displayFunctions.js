// columns objects has a list of the following  {header: str, type: str, values: array/list, valueFunction: func, prefix: str, sufix: str}
function listData(data, columns, listName) {
    let container = document.createElement('div');
    container.id = listName;
    constainer.style.display = 'grid';
    let grid;
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
                    value.textContent = column.valueFunction(obj);
                    break;
                case 'link':
                    value = document.createElement('a');
                    value.textContent = obj[column.values[0]];
                    value.href = column.valueFunction(obj);
                    break;
                case 'img':
                    value = document.createElement('img');
                    value.src = column.valueFunction(obj);
                    break;
                default:
                    value = document.createElement('div');
                    console.warn('Missing/Incorrect List Column Type');
                    break;
            }
            container.appendChild(value);
        }
    }
}

function loadArtists () {

    const artists = artistsArr;

    //test

    for(artist of artists)
    {
        console.log(artist["id"]);
    }

}

function loadGenres () {

    const genres = genresArr;

    for (genre of genres)
    {
        console.log(genre["id"]);
    }

}

function loadSampleSongs() {

    const sampleSongs = sampleSongsArr;

    for (song of sampleSongs) 
    {
        console.log(song["song_id"]);
    }
}
