import { UI } from './ui.js';
import { CoctailAPI } from './cocktailAPI.js';
import { CoctailDB } from './cocktailDB.js';

const ui = new UI(), cocktailAPI = new CoctailAPI(), cocktailDB = new CoctailDB();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', documentLoad);

    const searchForm = document.querySelector('#search-form');
    
    if(searchForm)
    searchForm.addEventListener('submit', getCocktails);
    
    const resultsDiv = document.querySelector('#results');
    
    if(resultsDiv)
    resultsDiv.addEventListener('click', resultsActions);
}
eventListeners();

function getCocktails() {
    const searchTerm = document.querySelector('#search').value;

    if(searchTerm === ''){
        ui.printMessage('Please enter some text', 'danger');
    } else {                    
        ui.clearPrevious();

        const typeValue = document.querySelector('#type').value;
        let jsonResponse;

        switch (typeValue) {
            case 'name':
                jsonResponse = cocktailAPI.searchCocktailByName(searchTerm);
                break;
            case 'ingredient':
                jsonResponse = cocktailAPI.getCocktailsByIngredient(searchTerm);
                break;
            case 'category':
                jsonResponse = cocktailAPI.getCocktailsByCategory(searchTerm);
                break;
            case 'alcohol':
                jsonResponse = cocktailAPI.getCocktailsByAlcoholic(searchTerm);
                break;
            default:
                break;
        }

        jsonResponse.then( 
            cocktails => {
                if(cocktails.drinks === null) {
                    ui.printMessage('There \'s no such cocktails','danger');
                } else {
                    if(typeValue === 'name'){
                        ui.displayTemplate(cocktails.drinks); 
                    } else {
                        ui.displayTemplateIng(cocktails.drinks); 
                    } 
                }  
        })
        .catch(errorMessage => {
            console.log('Network error..',errorMessage);
        })
    }
}

function resultsActions(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('btn-recipe')){
        cocktailAPI.getCocktailDetailsById(e.target.dataset.id)
        .then(
            details => {
                ui.displayModalDetails(details.drinks[0]);
            }
        )
    }
    
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){    
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
            cocktailDB.removeFromLS(e.target.dataset.id);
        } else {
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
            const cardDiv = e.target.parentElement;
            const coctailInfo = {
                id: e.target.dataset.id,
                image: cardDiv.querySelector('.card-img-top').src,
                name: cardDiv.querySelector('.card-title').textContent
            };

            cocktailDB.saveToLs(coctailInfo);
        }
    }
}

function documentLoad() {
    ui.isFavorite();
    const categorySelect = document.querySelector('.search-category'); 

    if(categorySelect){
        cocktailAPI.getCocktailCategories()
        .then(categories => {
            ui.displayCategories(categories.drinks);
        })
        .catch(errorMessage => {
            console.log('Network error', errorMessage);  
        })
    }

    const favoritesTable = document.querySelector('#favorites');

    if(favoritesTable){
        const favCoctails = cocktailDB.getCoctailsFromLS();
        ui.displayFavorites(favCoctails);

        favoritesTable.addEventListener('click', e => {

            if(e.target.classList.contains('btn-recipe')){
                cocktailAPI.getCocktailDetailsById(e.target.dataset.id)
                .then(
                details => {
                    ui.displayModalDetails(details.drinks[0]);
                })
            }
           
            if(e.target.classList.contains('btn-remove')){
                ui.removeDOMelement(e.target.parentElement.parentElement);
                cocktailDB.removeFromLS(e.target.dataset.id);
            }
        });
    }
}