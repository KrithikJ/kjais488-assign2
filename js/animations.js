function animateLists(closed, listContainer, listFotamt) {
    let numColumns = listFotamt.length - 1;
    if(closed){
        // console.log("opening");
        // console.log(numColumns);
        // console.log(listContainer.childNodes);
        console.log((listContainer.childNodes.length / numColumns));
        listContainer.style.height = ((listContainer.childNodes.length / (numColumns -1)) * 50) + "px";
        listContainer.style.transitionDuration = ((listContainer.childNodes.length / (numColumns -1)) * 50) + "ms";
        for (let i = 0; i < listContainer.childNodes.length; i += numColumns) {
            // console.log("row" + Math.floor(i/numColumns));
            setTimeout(() => {
                for (let i1 = 0; i1 < numColumns; i1++) {   
                    // console.log(listContainer.childNodes[i1]);
                    if(listContainer.childNodes[i + i1].classList.contains("hidden")){
                        listContainer.childNodes[i + i1].classList.toggle("hidden");
                    }
                }
            }, (i * 10));
        }
    }
}