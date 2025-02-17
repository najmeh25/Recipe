const recipes = [
  {
    id: 1,
    title: "Gløgg",
    picture_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { name: "Orange zest", amount: "0.5" },
      { name: "Water", amount: "200 ml" },
      { name: "Sugar", amount: "275 g" },
      { name: "Whole cloves", amount: "5" },
      { name: "Cinnamon sticks", amount: "2" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
  {
    id: 2,
    title: "Pancakes",
    picture_url: "https://cdn.loveandlemons.com/wp-content/uploads/2022/09/oatmeal-pancakes.jpg",
    ingredients: [
      { name: "Flour", amount: "200 g" },
      { name: "Milk", amount: "300 ml" },
      { name: "Eggs", amount: "2" },
      { name: "Butter", amount: "50 g" },
      { name: "Sugar", amount: "20 g" },
    ],
    description: "Mix ingredients, fry in a pan, and enjoy delicious pancakes.",
  },
  {
    id: 3,
    title: "Salad",
    picture_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHrXGdGEH1S-WhZ_pvKd4beNo5V3crLPR5g&s",
    ingredients: [
      { name: "Lettuce", amount: "100 g" },
      { name: "Tomatoes", amount: "50 g" },
      { name: "Cucumber", amount: "50 g" },
    ],
    description: "Chop all vegetables, mix, and serve fresh.",
  },
];

// Display Recipes
function displayRecipes(recipesArray) {
  const recipeGrid = document.getElementById("recipeGrid");
  recipeGrid.innerHTML = "";
  recipesArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.picture_url}" alt="${recipe.title}">
      <p>${recipe.description}</p>
      <h4>Ingredients:</h4>
      <ul>${recipe.ingredients.map(ing => `<li>${ing.name}: ${ing.amount}</li>`).join("")}</ul>
    `;
    recipeGrid.appendChild(recipeCard);
  });
}

displayRecipes(recipes);

// Add New Recipe
 document.getElementById("addRecipeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("recipeTitle").value;
  const picture_url = document.getElementById("recipePicture").value;
  const description = document.getElementById("recipeDescription").value;

  const ingredientElements = document.getElementsByClassName("ingredient");
  const ingredients = [];

  for (let i = 0; i < ingredientElements.length; i++) {
      const name = ingredientElements[i].querySelector(".ingredient-name").value;
      const amount = ingredientElements[i].querySelector(".ingredient-amount").value;
      ingredients.push({ name: name, amount: amount });
  }

  const newRecipe = { id: Date.now(), title, picture_url, description, ingredients };
  recipes.push(newRecipe);
  displayRecipes(recipes);
});

// Add Ingredient
document.getElementById("addIngredientButton").addEventListener("click", function () {
  const div = document.createElement("div");
  div.className = "ingredient";
  div.innerHTML = `
    <label>Ingredient: <input type="text" class="ingredient-name" required></label>
    <label>Amount: <input type="text" class="ingredient-amount" required></label>
  `;
  document.getElementById("ingredientsList").appendChild(div);
});

// Search Recipes
document.getElementById("search1").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filtered = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm));
  displayRecipes(filtered);
});

// Sort Recipes
document.getElementById("sortButton").addEventListener("click", function () {
  const sorted = [...recipes].sort((a, b) => a.ingredients.length - b.ingredients.length);
  displayRecipes(sorted);
});
// Timer
function startCookingTimer() {
const cookingTimeInput = document.getElementById('cookingTime').value;
const message = document.getElementById('cookingMessage');

if (!cookingTimeInput || cookingTimeInput.length === 0 || Number(cookingTimeInput) <= 0) {
  message.textContent = "Please enter a valid positive number.";
  return;
}

const cookingTime = Number(cookingTimeInput);
message.textContent = `Cooking timer started for ${cookingTime} seconds.`;

setTimeout(() => {
  alert("Cooking time is up!");
  message.textContent = "Time's up! Your dish is ready.";
}, cookingTime * 1000);
}

document.getElementById('startTimerButton').addEventListener('click', startCookingTimer);

(function trackPageTime() {
let secondsSpent = 0;

function updatePageTime() {
  secondsSpent++;
  document.getElementById('pageTimer').textContent = `${secondsSpent} seconds`;
}

setInterval(updatePageTime, 1000);
})();


//fetch data
async function fetchData() {
  try {
      const response = await fetch("https://raw.githubusercontent.com/najmeh25/Recipe/refs/heads/javascript3/week1/marjan/week1.js3/index.json");
      allData = await response.json();  
      console.log(allData);  
      displayData(allData);  
  } catch (error) {
      console.error("Error fetching data:", error);
  }
  }



function searchIngredient() {
  const searchTerm = document.getElementById("search").value.trim().toLowerCase();  
  console.log("Searching for: ", searchTerm);  
  
  if (allData.length > 0) {
      const filteredData = allData.filter(item => 
          item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
          item.name.toLowerCase().includes(searchTerm)  
      );
      
      console.log("Filtered Data: ", filteredData);  
      
      displayData(filteredData);
  }
}

function displayData(data) {
  const dataList = document.getElementById("data-list");
  dataList.innerHTML = ""; 
  if (data.length === 0) {
      const listItem = document.createElement("li");
      listItem.textContent = "No results found.";
      dataList.appendChild(listItem);
  } else {
      data.forEach(item => {
          const listItem = document.createElement("li");
          const strong = document.createElement("strong");
          strong.textContent = item.name;
          
          const textNode = document.createTextNode(` - ${item.type} - $${item.price}`);
          
          const ingredients = document.createElement("p");
          ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;
          
          listItem.appendChild(strong);
          listItem.appendChild(textNode);
          listItem.appendChild(document.createElement("br"));
          listItem.appendChild(ingredients);
          
          dataList.appendChild(listItem);
      });
  }
}

document.getElementById("search-btn").addEventListener("click", searchIngredient);
fetchData().then(() => {
  console.log("Data fetched successfully.");
});
