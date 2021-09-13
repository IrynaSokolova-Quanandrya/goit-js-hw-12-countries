// импорт файлов и библиотек
import fetchCountries from './js/fetch-countries';
import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
// import '@pnotify/core/dist/BrightTheme.css';

import countriesTpl from './templates/countries-list.hbs';
import countryTpl from './templates/country.hbs';
const debounce = require ('lodash.debounce');

// Окно предупреждения неправильного запроса
defaultModules.set(PNotifyMobile, {});

alert({
  text: 'Too many matches found. Please enter a more specific query!'
});

// доступ к элементам
const refs = {
    searchForm: document.querySelector('.js-search-form'),
    countryList: document.querySelector('.js-countries-search'),
    countryData: document.querySelector('.js-country-data'),
    input: document.getElementById('searchQuery'),
}
 console.dir(refs.input);

//  слушатель события на инпут с функцией дебаунс
refs.searchForm.addEventListener('input', debounce(fetchCountries, 500));

// рендер разметки
refs.countryData.insertAdjacentHTML('beforeend', countryTpl(countries));
 refs.countryList.insertAdjacentHTML('beforeend', countriesTpl(countries));


// условия набора запроса в инпуте 
