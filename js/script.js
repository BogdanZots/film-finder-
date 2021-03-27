const fetchUrl = "https://api.themoviedb.org/3/search/movie?api_key=d9f13c7901a15a056282735592bf7b8d&language=ru&query=";
const posterUrl = "https://image.tmdb.org/t/p/w500";
const input = document.querySelector('.form-control');
let content = document.querySelector('#movies');
const find = document.querySelector('.find-img');
const noPosterData = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lXFXjln7No8_sR5QfF2HZWIyAI77kmnmcJKf0g5rsKqNrk87a2pT41cksSg4PhHxDnw&usqp=CAU";
let inner = '';

function searchFilm() {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=d9f13c7901a15a056282735592bf7b8d&language=ru&query=' + input.value)
        .then(response => response.json())
        .then(function (data) {
            data.results.forEach(function (item) {
                let imgUlr;
                if (input.value) {
                    inner = `<h3 class = 'col-12 text-center text-info title'>Самые популярные фильмы за неделю!</h3>`
                }
                data.results.forEach(films => {
                    if (films.backdrop_path) {
                        imgUlr = posterUrl + films.backdrop_path;
                    }
                    inner += `
                 <div class="col-md-6 col-lg-4 col-xl-2 item" data-name="films">
                 <img class="poster-img" src="${imgUlr || noPosterData}">
                 <div>${films.title || films.original_name}</div>
                 </div>
                 `
                });
                content.innerHTML = inner
            })
        })
        .catch(() => {
            inner = `<h3 class = 'col-12 text-center text-info title'>Введите название фильма</h3>`
            content.innerHTML = inner

        })
}

find.addEventListener('click', (e) => {
    e.preventDefault()
    searchFilm()
})
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault()
        searchFilm()
    }
})
document.querySelector('#home').addEventListener('click', (e) => {
    e.preventDefault()
    firstRenrededFetch()
})

function openFullInfo(e) {
    const filmTarget = e.target.parentElement;
    if (filmTarget !== null) {

        console.log(filmTarget)
        const filmImgUrl = filmTarget.querySelector('img').getAttribute('src');
        const filmTextContent = filmTarget.querySelector('.film-name').textContent;
        const filmOverview = filmTarget.querySelector('#film-about').textContent;
        const filmRate = filmTarget.querySelector('#film-rate').textContent;
        inner = `             
          <div class="col-md-12 col-lg-12 col-xl-12  item-full" data-name="films">
          <div class="films-left">
          <img class="poster-img" src="${filmImgUrl}">
          <div class="film-inner">
          <div class="film-text">${filmTextContent}</div>
          <div class="film-rate">${filmRate}</div>
          </div>
          </div>
          <div>
          <div class="film-overview">${filmOverview}</div>
          </div>
    `
        content.innerHTML = inner;
    }
}

function checkFavoriteFilm() {
    document.querySelector('svg').classList.add('hidden')

}

async function firstRenrededFetch() {
    const data = await fetch("https://api.themoviedb.org/3/trending/all/week?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru")
        .then(response => response.json())
        .then(function (data) {
            inner = `<h3 class = 'col-12 text-center text-info title'>Самые популярные фильмы за неделю!</h3>`
            data.results.forEach(films => {
                const imgUlr = posterUrl + films.backdrop_path;
                inner += `
             <div class="col-md-6 col-lg-4 col-xl-2 item" data-name="films">
             <img class="poster-img" src="${imgUlr}">
             <span id="film-rate" class="hidden">${films.vote_average}</span>
             <span id="film-about"class="hidden">${films.overview}</span>
             <div class="film-name">${films.title || films.original_name}</div>
             </div>
             `
            });
            content.innerHTML = inner
            content.addEventListener('click', openFullInfo, {
                once: true
            });
            return inner;
        })
}
firstRenrededFetch()
