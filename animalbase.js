"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  addEventListenersToButtons();

  loadJSON();
}

//Register buttons
function addEventListenersToButtons() {
  console.log("addEventListenersToButtons");
  document
    .querySelector("[data-action=filter]")
    .addEventListener("click", clickFilterButton);
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  //Creating a filterList function
  function filterList(filteredList) {
    // let filteredList = allAnimals;
    if (settings.filterBy === "cat") {
      // create a filtered list of only cats
      filteredList = allAnimals.filter(isCat);
    } else if (settings.filterBy === "dog") {
      // create a filtered list of only dogs
      filteredList = allAnimals.filter(isDog);
    } else if (settings.filterBy === "star") {
      filteredList = allAnimals.filter(isStar);
    }

    return filteredList;
  }
  //Filtering cats
  function isCat(animal) {
    return animal.type === "cat";
  }

  //Filtering dogs
  function isDog(animal) {
    return animal.type === "dog";
  }

  //Filtering star (all)
  function isStar(animal) {
    return animal.star;
  }

  //Filtering all

  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
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

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
