//  class and methods related to local storage
class CoctailDB {

    // Local Storage is array initially !!!!!!!!!!!!!!!!!!!!!!!

    //save object to LS 
    saveToLs(coctail) {
        //this single object save to array of object and that array save to LS
        //js array pushing item >
        const coctails = this.getCoctailsFromLS();
        coctails.push(coctail);
        // < js array fullfilled

        // js array ---> LS
        localStorage.setItem('coctails', JSON.stringify(coctails));
    }

    //get object from and array
    getCoctailsFromLS(){
        //return [] or [{},{}...]
        let coctails; // object -------->ls(JSON)
            //KEY in storage
        //empty object in ls
        if( localStorage.getItem('coctails') === null ){
            coctails = []; //return empty array
        } else {
            //coctails will hold that single object
            coctails = JSON.parse(localStorage.getItem('coctails'));
        }

        return coctails;
    }

    removeFromLS(coctailID) {
        //js object
        const coctails = this.getCoctailsFromLS(); //[]
        
        for(let i = 0; i< coctails.length; i++){
            
            if(coctails[i].id === coctailID){
                coctails.splice(i, 1); //i-start index, 1-count       
            }
        }
        
        //setting item with new stringify value
        localStorage.setItem('coctails', JSON.stringify(coctails));
    }
}