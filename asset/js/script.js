const gallery = document.querySelector('.image__gallery');
const searchKey = document.getElementById("input__search");
const searchBtn = document.getElementById('search__button');

const API_KEY = "Y5qN3vbov74jTCVNbP11Y28IU7zpVybrJ-IMcqGVaZM";
const apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=300";
const searchUrl = "https://api.unsplash.com/search/photos/?client_id="+API_KEY+"&page=5&query=";

let imageURLS = [];

window.onload = (event) => {


    //fetchSearchData('robot');

    let input = searchKey.focus();

    if (localStorage.getItem('search')){
        searchKey.value = localStorage.getItem('search');
        fetchSearchData(localStorage.getItem('search'));

    } else{
        fetchSearchData('robot');

    }
    console.log(localStorage.getItem('search'));
}

const fetchData = async () => {
    let tempUrl = apiUrl;
    const response = await (fetch(apiUrl).catch(handleError));
    const myJson = await response.json();
    let imageArrays = myJson;

    imageArrays.forEach(element => {
        //imageURLS.push(element.urls.small);
        imageURLS.push(element.urls.regular);
    });

    displayImage();

}

let handleError = function(err) {
    console.warn(err);
    gallery.innerHTML = "<h4>Unable to fetch data "+err+"</h5>";
}


function displayImage() {
    gallery.innerHTML = "";


    if(imageURLS.length == 0) {
        gallery.innerHTML = "<h4>Не удается получить данные. Обратите внимание, что поиск работает по словам на английском языке.</h5>";
        return;
    }
    imageURLS.forEach((url,index) => {
        // dynamic image tag
        let image = document.createElement('img');
        image.src = url;
        image.className="pt-4";
        image.setAttribute("width", "100%");
        image.setAttribute("onclick","displayFullImage(this.src)");

        gallery.appendChild(image);
    });

}

    searchBtn.addEventListener("click",function() {
        if(searchKey.value != ''){
            fetchSearchData(searchKey.value);
            localStorage.setItem('search',searchKey.value);
            console.log(localStorage.getItem('search'));
        }
    });

    searchKey.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            //console.log('enter')
            if(searchKey.value != ''){
                fetchSearchData(searchKey.value);
                localStorage.setItem('search',searchKey.value);
                console.log(localStorage.getItem('search'));
            }
        }
    });

const fetchSearchData = async (key) => {
    imageURLS = [];
    let tempUrl = searchUrl + key;

    // if(orderbyvar != '') {
    //     tempUrl += ("&order_by="+orderbyvar);
    // }

    //searchQuery.innerHTML = searchKey.value;


    let response = await (fetch(tempUrl).catch(handleError));
    let myJson = await response.json();
    // tempUrl += "&orientation=landscape&per_page="+myJson.total;
    tempUrl += "&orientation=landscape&per_page=9";

    response = await (fetch(tempUrl).catch(handleError));
    myJson = await response.json();
    console.log(myJson);
    let imageArrays = myJson.results;
    imageArrays.forEach(element => {
        imageURLS.push(element.urls.regular);
    });
    displayImage();
}



