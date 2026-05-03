const BASEURL = "https://restcountries.com/v3.1/";
const input = document.querySelector("#filter")
console.log(input);
const container = document.querySelector(".js-list")
console.log(container);




input.addEventListener("input", _.debounce(onInputChange, 300));

function onInputChange(e) {
    const name = e.target.value

    if (!name.trim()) {
    container.innerHTML = "";
    return;
}
    
    fetchCountryByName(name)
    
.then(data => {

    container.innerHTML = "";

        // check for 1 or more contry


    if (data.length > 1) {
        renderCountryList(data);
        return;
    }

    renderCountryCard(data[0]);
})
.catch(() => {
    iziToast.error({
        title: "Error",
        message: "Country not found",
        position: "topRight",
    });
});
}

function fetchCountryByName(name) {
    return fetch(`${BASEURL}name/${name}`)

.then(resp => {
if (!resp.ok) {
    throw new Error("Country not found");
}
return resp.json();
})
}

function renderCountryCard(country) {
    const languages = Object.values(country.languages || {}).join(", ")

    const markup = `<div class="card">
            <div class="card-img-top">
                <img src="${country.flags.svg}" alt="${country.name.common}">
            </div>
            <div class="card-body">
                <h1 class="card-title">Ім'я: ${country.name.common}</h1>
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text">Population: ${country.population}</p>
                <p class="languages">Languages:</p>
                <ul class="list-group">
    ${Object.values(country.languages || {})
        .map(lang => `<li>${lang}</li>`)
        .join("")}
</ul>
            </div>
        </div>`
        console.log(markup);

        container.innerHTML = markup
}

function renderCountryList(countries) {
    const names = `<ul class="country-list-group">
            ${countries
                .map(country => `<li>${country.name.common}</li>`)
                .join("")}
        </ul>`

    container.innerHTML = names;
}