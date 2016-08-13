var Ingredients = (function () {
    "use strict";
    
    var my = {}, numberOfPeople;
    
    my.increase = function () {
        my.setNumberOfPeople(numberOfPeople + 1);
    };
    
    my.decrease = function () {
        my.setNumberOfPeople(numberOfPeople - 1);
    };
    
    my.setNumberOfPeople = function (newNumberOfPeople) {
        if (newNumberOfPeople < 1) {
            return;
        }
        
        var i, ingredient, type, ratio, amount, people, peopleElement, ingredients;
        
        peopleElement = document.getElementById("people");
        ingredients = document.getElementsByClassName("ingredient");
        
        // set the number of people
        numberOfPeople = Math.round(newNumberOfPeople);
        localStorage.setItem("numberOfPeople", numberOfPeople);
        
        // change amount of people
        if (numberOfPeople === 1) {
            peopleElement.innerHTML = "1 persoon";
        } else {
            peopleElement.innerHTML = numberOfPeople + " personen";
        }
        
        // change the ingredients
        for (i = 0; i < ingredients.length; i += 1) {
            ingredient = ingredients[i];
            
            // get ingredient data
            type = ingredient.getAttribute("type");
            people = parseFloat(ingredient.getAttribute("people"), 10);
            
            if (people) {
                ratio = numberOfPeople / people;
            } else {
                ratio = numberOfPeople / 4;
            }
            amount = parseFloat(ingredient.getAttribute("amount"), 10) * ratio;
            
            
            if (type) {
                if (type === "weight") {
                    ingredient.innerHTML = Math.round(amount) + "g";
                } else if (type === "amount") {
                    ingredient.innerHTML = Math.round(amount * 100) / 100.0;
                } else if (type === "volume") {
                    ingredient.innerHTML = Math.round(amount) + "ml";
                }
            }
            /*console.log(ingredient);
            console.log(ingredient.getAttribute("type"));*/
        }
    };
    
    /*************************************************************************
     * Initialize the number of people from local storage
     *************************************************************************/
     
    (function () {
        var localNumberOfPeople = localStorage.getItem("numberOfPeople");
        
        if (localNumberOfPeople) {
            numberOfPeople = parseInt(localNumberOfPeople, 10);
            
            if (numberOfPeople) {
                if (numberOfPeople < 1) {
                    numberOfPeople = 1;
                }
            } else {
                numberOfPeople = 4;
            }
        } else {
            numberOfPeople = 4;
        }
        
        my.setNumberOfPeople(numberOfPeople);
    }());
    
    return my;
}());

