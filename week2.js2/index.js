
const recipes = [
    {
      id: 1,
      title: "Gløgg",
      picture_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
      ingredients: [
        { NAME: "Orange zest", AMOUNT: "0.5" },
        { NAME: "Water", AMOUNT: "200 ml" },
        { NAME: "Sugar", AMOUNT: "275 g" },
        { NAME: "Whole cloves", AMOUNT: "5" },
        { NAME: "Cinnamon sticks", AMOUNT: "2" },
      ],
      description: "Mix everything, heat it, and you are good to go!",
    },
    {
      id: 2,
      title: "Pancakes",
      picture_url:"https://cdn.loveandlemons.com/wp-content/uploads/2022/09/oatmeal-pancakes.jpg",
      ingredients: [
        { NAME: "Flour", AMOUNT: "200 g" },
        { NAME: "Milk", AMOUNT: "300 ml" },
        { NAME: "Eggs", AMOUNT: "2" },
        { NAME: "Butter", AMOUNT: "50 g" },
        { NAME: "Sugar", AMOUNT: "20 g" },
      ],
      description: "Mix ingredients, fry in a pan, and enjoy delicious pancakes.",
    },
    {
      id: 3,
      title: "Salad",
      picture_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHrXGdGEH1S-WhZ_pvKd4beNo5V3crLPR5g&s",
      ingredients: [
        { NAME: "Lettuce", AMOUNT: "100 g" },
        { NAME: "Tomatoes", AMOUNT: "50 g" },
        { NAME: "Cucumber", AMOUNT: "50 g" },
      ],
      description: "Chop all vegetables, mix, and serve fresh.",
    },
  ];
  

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
        <ul>
          ${recipe.ingredients
            .map((ingredient) =>`<li>${ingredient.NAME}: ${ingredient.AMOUNT}</li>`)
            .join("")}
        </ul>
      `;
  
      recipeGrid.appendChild(recipeCard);
    });
  }
  
  
  displayRecipes(recipes);
  
 
  document.getElementById("search").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    if (filteredRecipes.length === 0) {
      alert("No recipes found.");
    }
    displayRecipes(filteredRecipes);
  });
  
 
  document.getElementById("sortButton").addEventListener("click", function () {
    const sortedRecipes = [...recipes].sort(
      (a, b) => a.ingredients.length - b.ingredients.length
    );
    displayRecipes(sortedRecipes);
  });