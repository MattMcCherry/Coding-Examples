
let foods = [];
const dogFoodOptions = [];
let comparisonFoods = [];
let selectedElement1;
let selectedElement2;
let indexValue = 0
let index1 = 0 + indexValue;
let index2 = 1 + indexValue;
let firstTime = true;

//setup the locations in the table where the 
//text will be contained for each catagory.

let name = document.querySelectorAll('.name');
let ingredients = document.querySelectorAll('.ingredients');
let protein = document.querySelectorAll('.protein');
let fat = document.querySelectorAll('.fat');
let fibre = document.querySelectorAll('.fibre');
let ash = document.querySelectorAll('.ash');
let carbs = document.querySelectorAll('.carbs');

const selectElements = document.querySelectorAll("#dogFoodOption");

//setup the pages options.
Input.insertToFoods();
Input.setupOptions();

//this commands setup the table with an example.
Input.exampleSelector();