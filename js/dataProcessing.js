let songs = [];
fetch(api)
    .then(response => response.json())
    .then(data => {
        songs = [...data];
        console.log(data);
    })
    .catch(error => console.error(error));
