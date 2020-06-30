/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/js/ui.js\");\n/* harmony import */ var _cocktailAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cocktailAPI.js */ \"./src/js/cocktailAPI.js\");\n/* harmony import */ var _cocktailDB_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cocktailDB.js */ \"./src/js/cocktailDB.js\");\n\r\n\r\n\r\n\r\nconst ui = new _ui_js__WEBPACK_IMPORTED_MODULE_0__[\"UI\"](), cocktailAPI = new _cocktailAPI_js__WEBPACK_IMPORTED_MODULE_1__[\"CoctailAPI\"](), cocktailDB = new _cocktailDB_js__WEBPACK_IMPORTED_MODULE_2__[\"CoctailDB\"]();\r\n\r\nfunction eventListeners() {\r\n    document.addEventListener('DOMContentLoaded', documentLoad);\r\n\r\n    const searchForm = document.querySelector('#search-form');\r\n    \r\n    if(searchForm)\r\n    searchForm.addEventListener('submit', getCocktails);\r\n    \r\n    const resultsDiv = document.querySelector('#results');\r\n    \r\n    if(resultsDiv)\r\n    resultsDiv.addEventListener('click', resultsActions);\r\n}\r\neventListeners();\r\n\r\nfunction getCocktails() {\r\n    const searchTerm = document.querySelector('#search').value;\r\n\r\n    if(searchTerm === ''){\r\n        ui.printMessage('Please enter some text', 'danger');\r\n    } else {                    \r\n        ui.clearPrevious();\r\n\r\n        const typeValue = document.querySelector('#type').value;\r\n        let jsonResponse;\r\n\r\n        switch (typeValue) {\r\n            case 'name':\r\n                jsonResponse = cocktailAPI.searchCocktailByName(searchTerm);\r\n                break;\r\n            case 'ingredient':\r\n                jsonResponse = cocktailAPI.getCocktailsByIngredient(searchTerm);\r\n                break;\r\n            case 'category':\r\n                jsonResponse = cocktailAPI.getCocktailsByCategory(searchTerm);\r\n                break;\r\n            case 'alcohol':\r\n                jsonResponse = cocktailAPI.getCocktailsByAlcoholic(searchTerm);\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n\r\n        jsonResponse.then( \r\n            cocktails => {\r\n                if(cocktails.drinks === null) {\r\n                    ui.printMessage('There \\'s no such cocktails','danger');\r\n                } else {\r\n                    if(typeValue === 'name'){\r\n                        ui.displayTemplate(cocktails.drinks);\r\n                        \r\n                    } else {\r\n                        ui.displayTemplateIng(cocktails.drinks); \r\n                    } \r\n                }  \r\n        })\r\n        .catch(errorMessage => {\r\n            console.log('Network error..',errorMessage);\r\n        })\r\n    }\r\n}\r\n\r\nfunction resultsActions(e) {\r\n    e.preventDefault();\r\n    \r\n    if(e.target.classList.contains('btn-recipe')){\r\n        cocktailAPI.getCocktailDetailsById(e.target.dataset.id)\r\n        .then(\r\n            details => {\r\n                ui.displayModalDetails(details.drinks[0]);\r\n            }\r\n        )\r\n    }\r\n    \r\n    if(e.target.classList.contains('favorite-btn')){\r\n        if(e.target.classList.contains('is-favorite')){    \r\n            e.target.classList.remove('is-favorite');\r\n            e.target.textContent = '+';\r\n            cocktailDB.removeFromLS(e.target.dataset.id);\r\n        } else {\r\n            e.target.classList.add('is-favorite');\r\n            e.target.textContent = '-';\r\n            const cardDiv = e.target.parentElement;\r\n            const coctailInfo = {\r\n                id: e.target.dataset.id,\r\n                image: cardDiv.querySelector('.card-img-top').src,\r\n                name: cardDiv.querySelector('.card-title').textContent\r\n            };\r\n\r\n            cocktailDB.saveToLs(coctailInfo);\r\n        }\r\n    }\r\n}\r\n\r\nfunction documentLoad() {\r\n    ui.isFavorite();\r\n    const categorySelect = document.querySelector('.search-category'); \r\n\r\n    if(categorySelect){\r\n        cocktailAPI.getCocktailCategories()\r\n        .then(categories => {\r\n            ui.displayCategories(categories.drinks);\r\n        })\r\n        .catch(errorMessage => {\r\n            console.log('Network error', errorMessage);  \r\n        })\r\n    }\r\n\r\n    const favoritesTable = document.querySelector('#favorites');\r\n\r\n    if(favoritesTable){\r\n        const favCoctails = cocktailDB.getCoctailsFromLS();\r\n        ui.displayFavorites(favCoctails);\r\n\r\n        favoritesTable.addEventListener('click', e => {\r\n\r\n            if(e.target.classList.contains('btn-recipe')){\r\n                cocktailAPI.getCocktailDetailsById(e.target.dataset.id)\r\n                .then(\r\n                details => {\r\n                    ui.displayModalDetails(details.drinks[0]);\r\n                })\r\n            }\r\n           \r\n            if(e.target.classList.contains('btn-remove')){\r\n                ui.removeDOMelement(e.target.parentElement.parentElement);\r\n                cocktailDB.removeFromLS(e.target.dataset.id);\r\n            }\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/cocktailAPI.js":
/*!*******************************!*\
  !*** ./src/js/cocktailAPI.js ***!
  \*******************************/
/*! exports provided: CoctailAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CoctailAPI\", function() { return CoctailAPI; });\nclass CoctailAPI {\r\n\r\n    async searchCocktailByName(name){\r\n        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n\r\n    async getCocktailsByIngredient(ingredient){\r\n        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n\r\n    async getCocktailDetailsById(id){\r\n        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n\r\n    async getCocktailCategories(){\r\n        this.apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n    \r\n    async getCocktailsByCategory(category) {\r\n        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n    \r\n    async getCocktailsByAlcoholic(type) {\r\n        this.apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`);\r\n        this.jsonResponse = await this.apiResponse.json();\r\n\r\n        return this.jsonResponse;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/cocktailAPI.js?");

/***/ }),

/***/ "./src/js/cocktailDB.js":
/*!******************************!*\
  !*** ./src/js/cocktailDB.js ***!
  \******************************/
/*! exports provided: CoctailDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CoctailDB\", function() { return CoctailDB; });\nlet db;\r\nconst dbRequest = indexedDB.open('FavoriteCocktails', 1);\r\n\r\ndbRequest.onsuccess = function(event) {\r\n    db = event.target.result;\r\n};\r\n\r\ndbRequest.onupgradeneeded = function(event) {\r\n    db = event.target.result;\r\n\r\n    const objStore = db.createObjectStore('cocktails', { keyPath: 'id'});\r\n\r\n    objStore.transaction.oncomplete = function() {\r\n        db.transaction('cocktails','readwrite').objectStore('cocktails');\r\n    };\r\n};\r\n\r\ndbRequest.onerror = function(){\r\n    console.log('ERROR');\r\n};\r\n\r\nclass CoctailDB {\r\n   \r\n    saveToLs(cocktail) {\r\n        const cocktails = this.getCoctailsFromLS();\r\n        cocktails.push(cocktail);\r\n        localStorage.setItem('cocktails', JSON.stringify(cocktails));\r\n        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));\r\n        document.cookie = `cocktails=${JSON.stringify(cocktails)}; max-age=10`;\r\n\r\n        if(!db){\r\n            return;\r\n        }\r\n        const favCocktails = db.transaction('cocktails','readwrite').objectStore('cocktails');\r\n        favCocktails.add(cocktail);\r\n    }\r\n\r\n    getCoctailsFromLS(){\r\n\r\n        if(localStorage.getItem('cocktails') === null){\r\n            this.cocktails = [];\r\n        } else {\r\n            this.cocktails = JSON.parse(localStorage.getItem('cocktails'));\r\n        }\r\n        \r\n        return this.cocktails;\r\n    }\r\n\r\n    removeFromLS(cocktailID) {\r\n        const cocktails = this.getCoctailsFromLS();\r\n        \r\n        for(let i = 0; i < cocktails.length; i++){\r\n            if(cocktails[i].id === cocktailID){\r\n                cocktails.splice(i, 1);       \r\n            }\r\n        }\r\n        localStorage.setItem('cocktails', JSON.stringify(cocktails));\r\n        sessionStorage.setItem('cocktails', JSON.stringify(cocktails));\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/cocktailDB.js?");

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UI\", function() { return UI; });\n/* harmony import */ var _cocktailDB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cocktailDB.js */ \"./src/js/cocktailDB.js\");\n\r\nconst cocktailDB = new _cocktailDB_js__WEBPACK_IMPORTED_MODULE_0__[\"CoctailDB\"]();\r\n\r\nclass UI {\r\n    \r\n    displayTemplate(drinks) {\r\n        const mainDiv = document.querySelector('.results-wrapper');\r\n        mainDiv.style.display = 'block';\r\n        const resultsRow = document.querySelector('#results');        \r\n\r\n        drinks.forEach(drink => {\r\n           resultsRow.innerHTML += `\r\n            <div class=\"col-md-6 mt-5\">\r\n                <div class=\"card\">\r\n                    <button type=\"button\" data-id=\"${drink.idDrink}\" class=\"favorite-btn btn btn-outline-info\">\r\n                    +\r\n                    </button>\r\n                    <img class=\"card-img-top\" src=\"${drink.strDrinkThumb}\" alt=\"${drink.strDrink}\" width=200>\r\n                    \r\n                    <div class=\"card-body\">\r\n                        <div class=\"card-text\">\r\n                            <h4 class=\"card-title text-center\">${drink.strDrink}</h4>\r\n                            <h6 class=\"font-weight-bold\">Instructions:</h6>\r\n                            <p>${drink.strInstructions}</p>\r\n                        </div>\r\n                        <div class=\"card-text\">\r\n                            <ul class=\"list-group\">\r\n                                <li class=\"list-group-item alert alert-danger\">Ingredients</li> \r\n                                ${this.displayIngredientAndMeasureTemplate(drink)}\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"card-text\">\r\n                            <h6 class=\"font-weight-bold mt-2\">Extra information:</h6>\r\n                            <span class=\"badge badge-pill badge-success\">${drink.strAlcoholic}</span>\r\n                            <span class=\"badge badge-pill badge-danger\">${drink.strCategory}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>`; \r\n\r\n           this.isFavorite(drink.idDrink);\r\n        });   \r\n    }\r\n\r\n    displayTemplateIng(drinks) {\r\n        const mainDiv = document.querySelector('.results-wrapper');\r\n        mainDiv.style.display = 'block';\r\n        const resultsRow = document.querySelector('#results');\r\n\r\n        drinks.forEach(drink => {\r\n            resultsRow.innerHTML += ` \r\n                <div class=\"col-md-4\">\r\n                    <div class=\"card my-3\">\r\n                        <button type=\"button\" data-id=\"${drink.idDrink}\" class=\"favorite-btn btn btn-outline-info\">\r\n                        +\r\n                        </button>\r\n                        <img class=\"card-img-top\" src=\"${drink.strDrinkThumb}\">\r\n                        <div class=\"card-body\">\r\n                            <div class=\"card-text text-center\">\r\n                            <h4 class=\"card-title text-center\">${drink.strDrink}</h4>\r\n                            <a data-target=\"#recipe\" href=\"#\" data-toggle=\"modal\" data-id=\"${drink.idDrink}\" class=\"btn btn-success btn-recipe\">Get Details</a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>`;\r\n        \r\n        });\r\n       \r\n        this.isFavorite();\r\n    }\r\n\r\n    displayIngredientAndMeasureTemplate(drink){\r\n        this.objectsArray = [];\r\n       \r\n        for(let i = 1; i <= 15; i++){\r\n            const ingredientAndMeasure = {};\r\n            if(drink[`strIngredient${i}`] !== null) {\r\n                ingredientAndMeasure.ingredient = drink[`strIngredient${i}`];\r\n                ingredientAndMeasure.measure = drink[`strMeasure${i}`];\r\n                this.objectsArray.push(ingredientAndMeasure);\r\n            }\r\n        }\r\n        \r\n        let template = '';\r\n        this.objectsArray.forEach(obj => {\r\n            template += `\r\n                <li class=\"list-group-item\">${obj.ingredient}:${obj.measure}</li>\r\n            `;\r\n        });\r\n\r\n        return template;\r\n    }\r\n\r\n    printMessage(message, className) {\r\n        this.parentElement = document.querySelector('.jumbotron');\r\n        const childElement = document.querySelector('.jumbotron h1');\r\n\r\n        const alertContainer = document.createElement('div');\r\n        alertContainer.innerHTML = `\r\n            <div class='alert alert-${className} alert-dismissable'>\r\n                <button class='close' data-dismiss='alert'>X</button>\r\n                ${message}\r\n            </div>\r\n        `;\r\n\r\n        this.parentElement.insertBefore(alertContainer,childElement);\r\n        \r\n        setTimeout(() => {\r\n            alertContainer.remove();\r\n        }, 3000);\r\n    }\r\n\r\n    clearPrevious(){\r\n       this.resultDiv = document.getElementById('results');\r\n        while(this.resultDiv.hasChildNodes()){\r\n            this.resultDiv.removeChild(this.resultDiv.firstChild);\r\n        }\r\n    }\r\n\r\n    displayModalDetails(details) {\r\n        const modalTitle = document.querySelector('.modal-title'),\r\n            modalDescription = document.querySelector('.modal-body .description-text'),\r\n            ingredientList = document.querySelector('.modal-body .ingredient-list .list-group');\r\n        \r\n        modalTitle.innerHTML = details['strDrink'];\r\n        modalDescription.innerHTML = details['strInstructions'];\r\n        ingredientList.innerHTML = this.displayIngredientAndMeasureTemplate(details);\r\n    }\r\n\r\n    displayCategories(categories){\r\n        this.categorySelect = document.querySelector('.search-category');\r\n\r\n        let template = '<option>-SELECT-</option>';\r\n        categories.forEach(category => {\r\n                category.strCategory = category.strCategory.split(' ').join('_');\r\n\r\n                template += `\r\n                    <option value=\"${category.strCategory}\">${category.strCategory}</option>`;\r\n        });\r\n        this.categorySelect.innerHTML = template;\r\n    }\r\n\r\n    isFavorite(){\r\n        this.coctails = cocktailDB.getCoctailsFromLS();\r\n        \r\n        this.coctails.forEach(elem => {\r\n            const favBtn = document.querySelector(`[data-id=\"${elem.id}\"]`);\r\n            \r\n            if(favBtn !== null){\r\n                favBtn.classList.add('.is-favorite');\r\n                favBtn.textContent = '-';\r\n            }\r\n        });    \r\n    }\r\n\r\n    displayFavorites(coctails) {\r\n        this.favoritesElement = document.querySelector('#favorites > tbody');\r\n        let template = '';\r\n        \r\n        coctails.forEach(element => {\r\n          template += `\r\n            <tr>\r\n                <td>\r\n                    <img src=\"${element.image}\" width=100 alt=\"${element.strDrink}\">\r\n                </td>\r\n                <td>${element.name}</td>\r\n                <td>\r\n                    <a href=\"#\" data-toggle=\"modal\" data-target=\"#recipe\" data-id=\"${element.id}\" class=\"btn btn-success btn-recipe\">\r\n                    Get Details\r\n                    </a>\r\n                </td>\r\n                <td>\r\n                    <a href=\"#\" class=\"btn btn-danger btn-remove\" data-id=\"${element.id}\">Remove\r\n                    </a>\r\n                </td>\r\n            </tr>\r\n          `;\r\n        });\r\n\r\n        this.favoritesElement.innerHTML = template;\r\n    }\r\n\r\n    removeDOMelement(elem){\r\n        elem.remove();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/ui.js?");

/***/ })

/******/ });