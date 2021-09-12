// export default 
const debounce = require ('lodash.debounce');
import countriesTpl from '/templates/countries-list.hbs';
import countryTpl from '/templates/country.hbs';



const refs = {
    searchForm: document.querySelector('.js-search-form'),
    countryList: document.querySelector('.js-countries-search'),
countryData: document.querySelector('.js-country-data')
}

console.dir(refs.searchForm);
refs.searchForm.addEventListener('input', debounce(fetchCountries, 500));



function fetchCountries(searchQuery){
    searchQuery.preventDefault();
    const name = searchQuery.target.value;
    console.log(name);
const url = (`https://restcountries.eu/rest/v2/name/${name}`);

 return fetch(url)
.then(response => response.json())
.then(data=> {
    console.log(data)});

return data;
};

refs.countryList.insertAdjacentHTML('beforeend', countriesTpl(data));
refs.countryData.insertAdjacentHTML('beforeend', countryTpl(data));