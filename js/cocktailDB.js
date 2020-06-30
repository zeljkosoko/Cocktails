let db;
const dbRequest = indexedDB.open('FavoriteCocktails', 1);

dbRequest.onsuccess = function(event) {
    db = event.target.result;
};

dbRequest.onupgradeneeded = function(event) {
    db = event.target.result;

    const objStore = db.createObjectStore('cocktails', { keyPath: 'id'});

    objStore.transaction.oncomplete = function() {
        db.transaction('cocktails','readwrite').objectStore('cocktails');
    };
};

dbRequest.onerror = function(){
    console.log('ERROR');
};

export class CoctailDB {
   
    saveToLs(cocktail) {
        const cocktails = this.getCoctailsFromLS();
        cocktails.push(cocktail);
        localStorage.setItem('cocktails', JSON.stringify(cocktails));
        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));
        document.cookie = `cocktails=${JSON.stringify(cocktails)}; max-age=10`;

        if(!db){
            return;
        }
        const favCocktails = db.transaction('cocktails','readwrite').objectStore('cocktails');
        favCocktails.add(cocktail);
    }

    getCoctailsFromLS(){

        if(localStorage.getItem('cocktails') === null){
            this.cocktails = [];
        } else {
            this.cocktails = JSON.parse(localStorage.getItem('cocktails'));
        }
        
        return this.cocktails;
    }

    removeFromLS(cocktailID) {
        const cocktails = this.getCoctailsFromLS();
        
        for(let i = 0; i < cocktails.length; i++){
            if(cocktails[i].id === cocktailID){
                cocktails.splice(i, 1);       
            }
        }
        localStorage.setItem('cocktails', JSON.stringify(cocktails));
        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));
    }
}