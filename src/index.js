import './css/styles.css'
import fetchCountries from './js/fetch-countries.js';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
import countriesTpl from './templates/countries-list.hbs';
import countryTpl from './templates/country.hbs';
const debounce = require('lodash.debounce');
// import { debounce } from 'lodash';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  countryList: document.querySelector('.js-countries-search'),
  countryData: document.querySelector('.js-country-data'),
  input: document.getElementById('searchQuery'),
};

const onSearchResault = () => {
  let query = refs.input.value;
  console.log(query);
  if (!query) return;
  let promisCountriesArray = fetchCountries(query);
  promisCountriesArray
    .then(res => {
      if (res.status === 404) {
        return alert({
          title: "I don't know such country.",
          text: 'Please ask something more simple.',
          type: 'error',
          delay: 3000,
          hide: true,
        });
      } else {
        return res.json();
      }
    })
    .then(array => {
      console.log(array);
      if (array.length > 10 || array.length === 0) {
        return alert({
          title: 'Too many matches found.',
          text: ' Please enter a more specific query!',
          type: 'error',
          delay: 3000,
          hide: true,
        });
      }
      if (array.length > 1 && array.length <= 10) {
        createCountryListMarckup(array);
      }
      if (array.length === 1) {
        createCountryDataMarckup(array);
      }
    })
    .finally(() => (refs.input.value = ''));
};

function createCountryListMarckup(array) {
  refs.countryList.insertAdjacentHTML('beforeend', countriesTpl(array));
}

function createCountryDataMarckup(array) {
  refs.countryData.insertAdjacentHTML('beforeend', countryTpl(array[0]));
}

refs.input.addEventListener('input', debounce(onSearchResault, 500));
