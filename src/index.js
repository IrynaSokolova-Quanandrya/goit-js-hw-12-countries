
import fetchCountries from './js/fetch-countries.js';
import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
// // import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
import countriesTpl from './templates/countries-list.hbs';
import countryTpl from './templates/country.hbs';
// const debounce = require ('lodash.debounce');
import { debounce } from 'lodash';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    countryList: document.querySelector('.js-countries-search'),
    countryData: document.querySelector('.js-country-data'),
    input: document.getElementById('searchQuery'),
};

const onSearchResault = () => {
  let query = refs.input.value;
  let promisCountriesArray = fetchCountries(query);
  promisCountriesArray.then(array=>{
    console.log(array)
  
      if(array > 10){
    alert({
    title: 'Too many matches found.',
    text: ' Please enter a more specific query!',
    type: 'error',
    delay: 3000,
    hide: true,
});
return;
}
      if((array >= 1) && (array <= 10)){
        refs.countryList.insertAdjacentHTML('beforeend', countriesTpl());
        return;
}
      if(array === 1){
        refs.countryData.insertAdjacentHTML('beforeend', countryTpl(countries));
        return;
}
})
.catch(() => {
  alert({
    title: "Error",
    text: "Something went wrong",
    type: 'error',
    delay: 3000,
    hide: true,
  });
});
}
console.log(onSearchResault);


refs.searchForm.addEventListener('input', debounce(onSearchResault, 500));