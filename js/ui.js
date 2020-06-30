import { CoctailDB } from './cocktailDB.js';
const cocktailDB = new CoctailDB();

export class UI {
    
    displayTemplate(drinks) {
        const mainDiv = document.querySelector('.results-wrapper');
        mainDiv.style.display = 'block';
        const resultsRow = document.querySelector('#results');        

        drinks.forEach(drink => {
           resultsRow.innerHTML += `
            <div class="col-md-6 mt-5">
                <div class="card">
                    <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                    +
                    </button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width=200>
                    
                    <div class="card-body">
                        <div class="card-text">
                            <h4 class="card-title text-center">${drink.strDrink}</h4>
                            <h6 class="font-weight-bold">Instructions:</h6>
                            <p>${drink.strInstructions}</p>
                        </div>
                        <div class="card-text">
                            <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li> 
                                ${this.displayIngredientAndMeasureTemplate(drink)}
                            </ul>
                        </div>
                        <div class="card-text">
                            <h6 class="font-weight-bold mt-2">Extra information:</h6>
                            <span class="badge badge-pill badge-success">${drink.strAlcoholic}</span>
                            <span class="badge badge-pill badge-danger">${drink.strCategory}</span>
                        </div>
                    </div>
                </div>
            </div>`; 

           this.isFavorite(drink.idDrink);
        });   
    }

    displayTemplateIng(drinks) {
        const mainDiv = document.querySelector('.results-wrapper');
        mainDiv.style.display = 'block';
        const resultsRow = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsRow.innerHTML += ` 
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                        +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}">
                        <div class="card-body">
                            <div class="card-text text-center">
                            <h4 class="card-title text-center">${drink.strDrink}</h4>
                            <a data-target="#recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}" class="btn btn-success btn-recipe">Get Details</a>
                            </div>
                        </div>
                    </div>
                </div>`;
        
        });
       
        this.isFavorite();
    }

    displayIngredientAndMeasureTemplate(drink){
        this.objectsArray = [];
       
        for(let i = 1; i <= 15; i++){
            const ingredientAndMeasure = {};
            if(drink[`strIngredient${i}`] !== null) {
                ingredientAndMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientAndMeasure.measure = drink[`strMeasure${i}`];
                this.objectsArray.push(ingredientAndMeasure);
            }
        }
        
        let template = '';
        this.objectsArray.forEach(obj => {
            template += `
                <li class="list-group-item">${obj.ingredient}:${obj.measure}</li>
            `;
        });

        return template;
    }

    printMessage(message, className) {
        this.parentElement = document.querySelector('.jumbotron');
        const childElement = document.querySelector('.jumbotron h1');

        const alertContainer = document.createElement('div');
        alertContainer.innerHTML = `
            <div class='alert alert-${className} alert-dismissable'>
                <button class='close' data-dismiss='alert'>X</button>
                ${message}
            </div>
        `;

        this.parentElement.insertBefore(alertContainer,childElement);
        
        setTimeout(() => {
            alertContainer.remove();
        }, 3000);
    }

    clearPrevious(){
       this.resultDiv = document.getElementById('results');
        while(this.resultDiv.hasChildNodes()){
            this.resultDiv.removeChild(this.resultDiv.firstChild);
        }
    }

    displayModalDetails(details) {
        const modalTitle = document.querySelector('.modal-title'),
            modalDescription = document.querySelector('.modal-body .description-text'),
            ingredientList = document.querySelector('.modal-body .ingredient-list .list-group');
        
        modalTitle.innerHTML = details['strDrink'];
        modalDescription.innerHTML = details['strInstructions'];
        ingredientList.innerHTML = this.displayIngredientAndMeasureTemplate(details);
    }

    displayCategories(categories){
        this.categorySelect = document.querySelector('.search-category');

        let template = '<option>-SELECT-</option>';
        categories.forEach(category => {
                category.strCategory = category.strCategory.split(' ').join('_');

                template += `
                    <option value="${category.strCategory}">${category.strCategory}</option>`;
        });
        this.categorySelect.innerHTML = template;
    }

    isFavorite(){
        this.coctails = cocktailDB.getCoctailsFromLS();
        
        this.coctails.forEach(elem => {
            const favBtn = document.querySelector(`[data-id="${elem.id}"]`);
            
            if(favBtn !== null){
                favBtn.classList.add('.is-favorite');
                favBtn.textContent = '-';
            }
        });    
    }

    displayFavorites(coctails) {
        this.favoritesElement = document.querySelector('#favorites > tbody');
        let template = '';
        
        coctails.forEach(element => {
          template += `
            <tr>
                <td>
                    <img src="${element.image}" width=100 alt="${element.strDrink}">
                </td>
                <td>${element.name}</td>
                <td>
                    <a href="#" data-toggle="modal" data-target="#recipe" data-id="${element.id}" class="btn btn-success btn-recipe">
                    Get Details
                    </a>
                </td>
                <td>
                    <a href="#" class="btn btn-danger btn-remove" data-id="${element.id}">Remove
                    </a>
                </td>
            </tr>
          `;
        });

        this.favoritesElement.innerHTML = template;
    }

    removeDOMelement(elem){
        elem.remove();
    }
}
