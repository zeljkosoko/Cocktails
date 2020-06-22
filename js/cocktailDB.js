export class CoctailDB {

    saveToLs(cocktail) {
        const cocktails = this.getCoctailsFromLS();
        cocktails.push(cocktail);
        localStorage.setItem('cocktails', JSON.stringify(cocktails));
        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));
        document.cookie = `cocktails=${JSON.stringify(cocktails)}; max-age=10`;
    }

    getCoctailsFromLS(){
        let cocktails; 
        if(localStorage.getItem('cocktails') === null){
            cocktails = [];
        } else {
            cocktails = JSON.parse(localStorage.getItem('cocktails'));
        }
        return cocktails;
    }

    removeFromLS(cocktailID) {
        const cocktails = this.getCoctailsFromLS();
        
        for(let i = 0; i< cocktails.length; i++){
            if(cocktails[i].id === cocktailID){
                cocktails.splice(i, 1);       
            }
        }
        localStorage.setItem('cocktails', JSON.stringify(cocktails));
        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));
    }
}