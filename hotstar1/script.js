//https://api.themoviedb.org/3/movie/550?api_key=107b015c85c78c66f8dcac981593668a;
 async function moviesSearch() {
    try {
       var query = document.querySelector('#search').value;
       const url=`https://api.themoviedb.org/3/search/movie?api_key=107b015c85c78c66f8dcac981593668a&query=${query}`;
        let res = await fetch(url);
        let data = await res.json();
        return data.results;
    } catch (err) {
        console.log(err)
    }
};

let id;
const EXTRA_IMG__LINK = 'https://image.tmdb.org/t/p/w500/';

function appendmovie(data) {
    console.log(data)
    let appendhere = document.querySelector('.append');
    appendhere.innerHTML = null;
    var show = document.querySelector('.btn-more');
    show.style.display = 'block';

    data.map(function(el, i) {
        let box = document.createElement('div');
        let img = document.createElement('img');
        img.src = EXTRA_IMG__LINK + el.backdrop_path;
        // backdrop_path poster_path

        let namedetails = document.createElement('div');
        let name = document.createElement('h1');
        name.innerHTML = el.title;
        let slogn = document.createElement('p');
        slogn.innerHTML = el.release_date;
        namedetails.append(name, slogn)
        box.append(img, namedetails)
        appendhere.append(box);
        box.addEventListener('click', function() {
            window.location.href = 'movieinfo.html';
            localStorage.setItem('movieinfo', JSON.stringify(el));
        })

    })
    document.querySelector('.btn-more').addEventListener('click', function() {
        localStorage.setItem('Result', JSON.stringify(data));
        localStorage.setItem('query', JSON.stringify(query));
    });

}
async function main() {
    let data = await moviesSearch();
    if (data === undefined) {
        return false;
    }
    appendmovie(data)
};

let div = document.querySelector('.smallresult');
function debounce(func, delay) {
    div.style.display = 'block';
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function() {
        func();
    }, delay)
}

const appendmoviehomer = document.querySelector('.appendmovie')
async function Fetchmovie() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=107b015c85c78c66f8dcac981593668a&language=en-US&page=1`);
        const data = await res.json();
        append(data.results)
    } catch (err) {
        console.log(err)
    }
}
Fetchmovie()

function append(info) {
    info.forEach(el => {

        let box = document.createElement('div');
        let img = document.createElement('img');
        img.src = EXTRA_IMG__LINK + el.backdrop_path;
        let name = document.createElement('h3');
        name.innerHTML = el.title;
        box.append(img, name)
        appendmoviehomer.append(box);

        box.onclick = function() {
            window.location.href = 'movieinfo.html';
            localStorage.setItem('movieinfo', JSON.stringify(el));
        }
    });

}

//slide show 
var Slideshow = [
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4159/1254159-h-7ab4eb3a7a92",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/5655/1175655-h-50fe5709fab4",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8797/1258797-h-1958ad83f013",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/480/1250480-h-7aa44ec06f31",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/5210/1165210-h-a72a0a95461e",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/2728/1122728-h-bf0246e20e6d",
    
];

var showNum = document.querySelector("#randomNum");
var randNum = Math.floor(Math.random() * 4) + 1;
let i = 0;
var id1;
var appendimg = document.getElementById('slideshow');
let img = document.createElement("img");
img.src = Slideshow[randNum];
appendimg.append(img);

function sliderStart() {

    id1 = setInterval(function() {
        if (i == Slideshow.length) {
            i = 0;
        }
        img.src = Slideshow[i];
        appendimg.append(img)
        i++;
    }, 2000);

}
appendimg.addEventListener("mouseleave", Hoverpdstart);

function Hoverpdstart() {
    sliderStart();

}
appendimg.addEventListener("mouseenter", Hoverpause);

function Hoverpause() {
    clearInterval(id1);
}

window.addEventListener('load', function() {
    sliderStart();
});