//  instantiate other classes, define global vars, event listeners..

const ui = new UI(), 
        cocktailAPI = new CoctailAPI(),
        cocktailDB = new CoctailDB();

//event listeners FUNCTIONS
function eventListeners() {
    //fill select list automatically
    document.addEventListener('DOMContentLoaded',documentLoad);

    const  searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }
    //when click on #results EL function
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv)
    resultsDiv.addEventListener('click', resultsActions);
}
eventListeners();

//  get coctails from rest api
function getCocktails() {
    
    // search value used for both name and ingredient input value
    const searchTerm = document.querySelector('#search').value;

    if(searchTerm === ''){
       //use ui function printMessage 
        ui.printMessage('Please enter some text','danger');
        
    } else {
                            //first clear previous results and display next result
                            ui.clearPrevious();

        // quering API depends on element <input type="hidden" id="type" value="category"> !!!!!!!!!!! I
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
                                ui.displayTemplateIng(cocktails.drinks); //template for ingredient or category is the same
                            } 
                        }  
        })
        .catch( errorMessage => {
            console.log('Error message...',errorMessage);
            
        })
    }
}

function plusClicked(e) {
    console.log(this.Id);
}

function resultsActions(e) {
    e.preventDefault();
    
    //click on GET COCTAIL button
    if(e.target.classList.contains('btn-recipe')){

        // new endpoint(uri) query 
        cocktailAPI.getCocktailDetailsById(e.target.dataset.id)
        .then(
            details => {
                //displays details into a Bootstrap MODAL plugin......!
                ui.displayModalDetails(details.drinks[0]);
            }
        )
    }
    
    //click on + button
    if(e.target.classList.contains('favorite-btn')){
        //check is there class "is-favorite"
        if(e.target.classList.contains('is-favorite')){ 
           
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            //click on already favorite item(-), then delete from LS
            cocktailDB.removeFromLS(e.target.dataset.id);

        } else {
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            //      Saving object with details to LS

            // info about single coctails is in parentElement(.card)
            const cardDiv = e.target.parentElement;
            //object literal - object with key-value and comas ..{, ,}
            const coctailInfo = {
                id: e.target.dataset.id,
                image: cardDiv.querySelector('.card-img-top').src,
                name: cardDiv.querySelector('.card-title').textContent
            };
            
            console.log(coctailInfo);
            cocktailDB.saveToLs(coctailInfo);
        }
    }
}

function documentLoad() {
   // .is-favorite button related to 
    ui.isFavorite();

    const categorySelect = document.querySelector('.search-category'); //IF there is on page do next

    if(categorySelect){
        cocktailAPI.getCocktailCategories()
        .then( categories => {
            console.log(categories.drinks);
            ui.displayCategories(categories.drinks);
        })
        .catch(
            errorMessage => {
                console.log(errorMessage);  
            }
        )
    }
    
    //when page is loaded display favorite coctails from LS
    const favoritesTable = document.querySelector('#favorites');

    if(favoritesTable){
        const favCoctails = cocktailDB.getCoctailsFromLS();
        
        ui.displayFavorites(favCoctails);

        //inside #favorites element, click on .btn-recipe for details
        favoritesTable.addEventListener('click', (e) => {
            //click on .btn-recipe
            if(e.target.classList.contains('btn-recipe')){
                
                //display modal with details
                cocktailAPI.getCocktailDetailsById(e.target.dataset.id)
                .then(
                details => {
                    //displays details into a Bootstrap MODAL plugin......!
                    ui.displayModalDetails(details.drinks[0]);
                })
            }
            //click on .btn-remove to remove <tr> from DOM
            if(e.target.classList.contains('btn-remove')){
                
                //First remove DOM elem: 1.parent-<td> 2.parent-<tr>
                ui.removeDOMelement(e.target.parentElement.parentElement);
                // Second remove item in LS
                cocktailDB.removeFromLS(e.target.dataset.id);
                
            }

        });
    }
}