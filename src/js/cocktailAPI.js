export class CoctailAPI {

    async searchCocktailByName(name){
        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }

    async getCocktailsByIngredient(ingredient){
        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }

    async getCocktailDetailsById(id){
        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }

    async getCocktailCategories(){
        this.apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }
    
    async getCocktailsByCategory(category) {
        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }
    
    async getCocktailsByAlcoholic(type) {
        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`);
        this.jsonResponse = await this.apiResponse.json();

        return this.jsonResponse;
    }
}