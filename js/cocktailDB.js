export class CoctailDB {

    saveToLs(coctail) {
        const coctails = this.getCoctailsFromLS();
        coctails.push(coctail);
        localStorage.setItem('coctails', JSON.stringify(coctails));
    }

    getCoctailsFromLS(){
        let coctails; 
        if( localStorage.getItem('coctails') === null ){
            coctails = [];
        } else {
            coctails = JSON.parse(localStorage.getItem('coctails'));
        }
        return coctails;
    }

    removeFromLS(coctailID) {
        const coctails = this.getCoctailsFromLS();
        
        for(let i = 0; i< coctails.length; i++){
            if(coctails[i].id === coctailID){
                coctails.splice(i, 1);       
            }
        }
        localStorage.setItem('coctails', JSON.stringify(coctails));
    }
}