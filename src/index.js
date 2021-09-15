import fetchCountries from './js/fetch-countries.js';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
// import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
import countriesTpl from './templates/countries-list.hbs';
import countryTpl from './templates/country.hbs';
const debounce = require ('lodash.debounce');
// import { debounce } from 'lodash';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    countryList: document.querySelector('.js-countries-search'),
    countryData: document.querySelector('.js-country-data'),
    input: document.getElementById('searchQuery'),
};

const onSearchResault = () => {
  let query = refs.input.value;
  if(!value) return
  let promisCountriesArray = fetchCountries(query);
  promisCountriesArray.then(array=>{
    console.log(array)
    if (array.status === 404) {
      alert({
       title: "I don't know  such country.",
       text: "Please ask something more simple.",
       type: 'error',
       delay: 3000,
       hide: true,
      });
      return
  }
      if((array.length > 10) || (array.length === 0)){
    alert({
    title: 'Too many matches found.',
    text: ' Please enter a more specific query!',
    type: 'error',
    delay: 3000,
    hide: true,
});
return;
}
      if((array.length > 1) && (array.length <= 10)){
        createCountryListMarckup();
        return;
}
      if(array.length === 1){
        createCountryDataMarckup();
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

function createCountryListMarckup (){
  refs.countryList.insertAdjacentHTML('beforeend', countriesTpl(query));
};

function createCountryDataMarckup (){
  refs.countryData.insertAdjacentHTML('beforeend', countryTpl(query[0]));
};

refs.searchForm.addEventListener('input', debounce(onSearchResault, 500));