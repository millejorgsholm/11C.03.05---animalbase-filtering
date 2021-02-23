"use strict";

window.addEventListener("DOMContentLoaded", start);

//The allAnimals array (empty)
let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
  star: false,
};

function start() {
  console.log("ready");

  // TODO: Adding eventListeners to filter and sort buttons
  //Filter
  registerButtons();
  loadJSON();
}

function registerButtons() {
  document
    .querySelectorAll("[data-action='filter']")
    .forEach(button => button.addEventListener("click", selectFilter));

  document
    .querySelectorAll("[data-action='sort']")
    .forEach(button => button.addEventListener("click", selectSort));
}

//Loading JSON
async function loadJSON() {
  console.log("loadJS");
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when JSON is loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  console.log("prepareJSObjects");
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  console.log("prepareJSObject");
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log(`User selected ${filter}`);
  filterList(filter);
}

function filterList(filterBy) {
  let filteredList = allAnimals;
  if (filterBy === "cat") {
    filteredList = allAnimals.filter(isCat);
  } else if (filterBy === "dog") {
    filteredList = allAnimals.filter(isDog);
  }
  displayList(filteredList);
}

//if cat
function isCat(animal) {
  return animal.type === "cat";
}

//if dog
function isDog(animal) {
  return animal.type === "dog";
}

function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  console.log(`User selected ${sortBy}`);
  sortList(sortBy);
}

//The sorting list
function sortList(sortBy) {
  let sortedList = allAnimals;
  if (sortBy === "name") {
    sortedList = sortedList.sort(sortByName);
  } else if (sortBy === "type") {
    sortedList = sortedList.sort(sortByType);
  }

  displayList(sortedList);
}

//Sorting by name
function sortByName(animalA, animalB) {
  if (animalA.name < animalB.name) {
    return -1;
  } else {
    return 1;
  }
}

//Sorting by type
function sortByType(animalA, animalB) {
  if (animalA.type < animalB.type) {
    return -1;
  } else {
    return 1;
  }
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  //ask whether an animal is starred or not
  if (animal.star) {
    clone.querySelector("[data-field=star]").textContent = "⭐";
  } else {
    clone.querySelector("[data-field=star]").textContent = "☆";
  }

  //making stars clickable
  clone.querySelector("[data-field=star]").addEventListener("click", clickStar);

  function clickStar() {
    if (animal.star === true) {
      animal.star = false;
    } else {
      animal.star = true;
    }
    displayAnimal();
  }
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
