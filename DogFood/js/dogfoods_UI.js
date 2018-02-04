let Input = {
    insertToFoods: () => {
        for (i = 0; i < foodsList.length; i++) {
            foods.push(foodsList[i]);
        }
        foodsList = [];
        //splice push instead? could shorten the code
    },
    createNewOptions: () => {  
        if (firstTime) {
            //first time round we want to insert all the preset options.
            length = foods.length; 
        } else { length = 1 }
        for (i = 0; i < length; i++) {
            const option = document.createElement('option');
            option.value = indexValue;  
            option.textContent = foods[indexValue].name;     
            selectElements[0].appendChild(option);
            
            //create clone of option to append to second option
            let clone = option.cloneNode(true); 
            selectElements[1].appendChild(clone);
            indexValue += 1; 
            firstTime = false;
        }
    },
    //for the sake of example this selects two dog foods to load on the page.
    exampleSelector: function () {    
    var element = document.querySelectorAll("#dogFoodOption");    
    element[0].value = 0;
    element[1].value = 1;
    this.selection();
    },
    getAllOptionIDs: function() {
    for (i = 0; i < selectElements.length; i++) {
        dogFoodOptions.push(selectElements[i]);
    }
    },
    selection: () => {
    //check what options(foods) the user has selected
    selectedElement1 = dogFoodOptions[0];
    selectedElement2 = dogFoodOptions[1];
    let selectedOption1 = selectedElement1.selectedOptions[0].value;
    let selectedOption2 = selectedElement2.selectedOptions[0].value;
    if (selectedOption1 === "empty" || selectedOption2 === "empty") {
        
        return console.log("One or both options are empty");
    } else {
        //select the correct objects
        index1 = parseFloat(selectedOption1);
        index2 = parseFloat(selectedOption2);
        //add them to the comparison list
        comparisonFoods.push(foods[index1]);
        comparisonFoods.push(foods[index2]);
        //compare them
        ComparisonUI.compareFoods();
    }
},
    setupOptions: function() {
        this.createNewOptions();
        this.getAllOptionIDs();
    }
};


let ComparisonUI = {
    compareFoods: function () {   
        
        //input text
        this.HTML();
        
        //compare values to see which is higher
        this.compareFoodProperties(); 
        
        //reset foods ready for next comparison
        comparisonFoods = [];
    },
    compareFoodProperties: () => {
        const elements = {
        //select the html that we are comparing as we are going 
        //to change the style to the one that has a higher value
          protein1: protein[0],
          protein2: protein[1],
          fat1: fat[0],
          fat2: fat[1],
          fibre1: fibre[0],
          fibre2: fibre[1],
          ash1: ash[0],
          ash2: ash[1],
          carbs1: carbs[0],
          carbs2: carbs[1],
        };
        
        // Set up the two foods and their values that we are comparing.
        const food1 = {
            protein: comparisonFoods[0].protein,
            fat: comparisonFoods[0].fat,
            fibre: comparisonFoods[0].fibre,
            ash: comparisonFoods[0].ash,
            carbs: comparisonFoods[0].carbs,
        };
        const food2 = {
            protein: comparisonFoods[1].protein,
            fat: comparisonFoods[1].fat,
            fibre: comparisonFoods[1].fibre,
            ash: comparisonFoods[1].ash,
            carbs: comparisonFoods[1].carbs,
        }
        
        Object.keys(food1).forEach(key => {
          const elementKey = (food1[key] > food2[key])
            ? key + '1'
            : key + '2';
            
        //add color + add arrow to property that is higher.
        elements[elementKey].style.color = 'green';
        elements[elementKey].style.fontWeight = 'bold';
        elements[elementKey].innerHTML += '<span class="upArrow">';
    });
  },
    HTML: function () {
        for (let i = 0; i < comparisonFoods.length; i++) {
            let elements = {
            ingredients: ingredients[i],
            protein: protein[i],
            fat: fat[i],
            fibre: fibre[i],
            ash: ash[i],
            carbs: carbs[i],
            }
            
            //Firstly, we reset the table.
            Object.keys(elements).forEach(key => {
                elements[key].innerHTML = '';
                elements[key].style.color = '';
                elements[key].style.fontWeight = '';
            });
            
            //Then write the information from the object into the table.
            Object.keys(elements).forEach(key => {
                if (key === 'ingredients') {
                    elements[key].innerHTML += comparisonFoods[i][key];   
                } else {
                elements[key].innerHTML += comparisonFoods[i][key] + '%';
                }
            });
    }
    },
};

//lets setup our listener for user inputs

let inputsForm = document.querySelector('.inputsForm');

inputsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = inputsForm.querySelector('.name');
    let ingredients = inputsForm.querySelector('.ingredients');
    let protein = inputsForm.querySelector('.protein');
    let fat = inputsForm.querySelector('.fat');
    let fibre = inputsForm.querySelector('.fibre');
    let ash = inputsForm.querySelector('.ash');
    let carbs = inputsForm.querySelector('.carbs');
    name = name.value;
    ingredients = ingredients.value;
    protein = protein.value;
    fat = fat.value;
    fibre = fibre.value;
    ash = ash.value;
    carbs = carbs.value;
    
    foodsList = [ new Food(name, ingredients, protein, fat, fibre, ash, carbs) ];

    //reset all the form fields.
    name = '';
    ingredients = '';
    protein = '';
    fat = '';
    fibre = '';
    ash = '';
    carbs = '';

    Input.insertToFoods();
    Input.createNewOptions();
    
})
