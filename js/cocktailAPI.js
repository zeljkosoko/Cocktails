//  Different methods used to query rest API
class CoctailAPI {

    //get coctails by name
    async searchCocktailByName(name){
                                        // one URI (Endpoint) in API service
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const jsonResponse = await apiResponse.json();

        return jsonResponse;
    }

    //get cocktails by ingredient
    async getCocktailsByIngredient(ingredient){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const jsonResponse = await apiResponse.json();
        
        return jsonResponse;
    }

    async getCocktailDetailsById(id) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const jsonResponse = await apiResponse.json();
        
        return jsonResponse;
    }

    async getCocktailCategories() {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        const jsonResponse = await apiResponse.json();
        
        return jsonResponse;
    }
    
    async getCocktailsByCategory(category) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const jsonResponse = await apiResponse.json();
        
        return jsonResponse;
    }
    
    async getCocktailsByAlcoholic(type) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`);
        const jsonResponse = await apiResponse.json();
        
        return jsonResponse;
    }
}