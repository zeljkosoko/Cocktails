//  CLASS methods related to html inner project
// for removing favorite drink from LS we need a cocktailDB instance
class UI {
    //display the cocktails without ingredients
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
            </div>
             `; 

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
            </div>
        `;
        
        });
        //check is {drink.idDrink} = id in LocalStorage
        this.isFavorite();
    }

    displayIngredientAndMeasureTemplate(drink){
        // drink has array: [ {strIngredient1, strMeasure1}, {strIng2, strMeas2}....] 
        let objectsArray = [];
        //there is 15 objects in array
        for(let i = 1; i <=15; i++){
            const imObject = {};
            const strIng = 'strIngredient'+i;
            const strMeas = 'strMeasure'+i;
            imObject.ingredient = drink[strIng];
            imObject.measure = drink[strMeas]; //filled object
            if(imObject.ingredient !== '')
            objectsArray.push(imObject);
        }
        
        let template = ``;
        objectsArray.forEach(obj => {
            template += `
                <li class="list-group-item">${obj.ingredient}:${obj.measure}</li>
            `;
        });
        return template;
    }

    //In class => 'function' keyword DONT GO !!!!!!!!
    printMessage(message, className) {
        //print alert message div in front of .jumbotron h1
        const parentElement = document.querySelector('.jumbotron');
        const childElement = document.querySelector('.jumbotron h1');

        //alert div
        var alertContainer = document.createElement("div");
        alertContainer.innerHTML = `
            <div class='alert alert-${className} alert-dismissable'>
                <button class='close' data-dismiss='alert'>X</button>
                ${message}
            </div>
        `;

        parentElement.insertBefore(alertContainer,childElement);
        
        setTimeout(() => {
            alertContainer.remove();
        }, 3000);
    }

    clearPrevious(){
       const resultDiv = document.getElementById("results");
        while(resultDiv.hasChildNodes()){
            resultDiv.removeChild(resultDiv.firstChild);
        }
    }

    //display details on bootstrap modal plugin
    displayModalDetails(details) {
        
        //fill h2 with drink name, #description-text with cocktail details
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              ingredientList = document.querySelector('.modal-body .ingredient-list .list-group');
        
        modalTitle.innerHTML = details['strDrink'];
        modalDescription.innerHTML = details['strInstructions'];
        ingredientList.innerHTML = this.displayIngredientAndMeasureTemplate(details);
    }

    //search category : Orginary_Drink
    displayCategories(categories){
        const categorySelect = document.querySelector('.search-category');

        let template = `<option>-SELECT-</option>`;
        categories.forEach( category => {
                //array of strings join to one big string with "_" between words
                category.strCategory = category.strCategory.split(" ").join("_");

               template += `
               <option value="${category.strCategory}">${category.strCategory}</option>`;
        });
        categorySelect.innerHTML = template;
    }

    // first get coctails from LS, then foreach cocktail checks does exist bnt with [data-id]=coctail.id.!!!!
    isFavorite() {
        //get all cocktails from ls
        const coctails = cocktailDB.getCoctailsFromLS();
        
        coctails.forEach( elem => {
           //is there button where data-id=elem.id
            let favBtn = document.querySelector(`[data-id="${elem.id}"]`);
            
            if(favBtn !== null ){
                favBtn.classList.add('.is-favorite');
                favBtn.textContent = '-';
            }
        });
        
    }

    displayFavorites(coctails) {
        
        const favoritesElement = document.querySelector('#favorites > tbody');
        let template = '';
        
        coctails.forEach(element => {
          console.log(element);
          template +=`
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

        favoritesElement.innerHTML = template;
    }

    //remove dom element
    removeDOMelement(elem){
        elem.remove();
    }
}

