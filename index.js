const BASEURL = "https://restcountries.com/v3.1/";
const input = document.querySelector("#filter")
console.log(input);
const container = document.querySelector(".js-list")
console.log(container);




input.addEventListener("input", _.debounce(onInputChange, 300));

function onInputChange(e) {
    const id = input.value

    if (!id.trim()) {
    container.innerHTML = "";
    return;
}
    
    fetchCountryByName(id)

    // check for 1 or more contry
    // if (condition) {
        
    // }
    
.then(data => {
    console.log(data[0].name.official);
    renderCountryCard(data[0]);
})
.catch(error => {
    console.log(error)
})
}

function fetchCountryByName(id) {
    return fetch(`${BASEURL}name/${id}`)

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
                <img src="${country.flags.svg}" alt="${country.name.official}">
            </div>
            <div class="card-body">
                <h1 class="card-title">Ім'я: ${country.name.official}</h1>
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text">Population: ${country.population}</p>
                <p class="languages">Languages:</p>
                <ul class="list-group"> ${languages}</ul>
            </div>
        </div>`
        console.log(markup);

        container.innerHTML = markup
}