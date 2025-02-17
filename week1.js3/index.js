

function fetchData() {
    return fetch("https://raw.githubusercontent.com/najmeh25/najmeh25.github.io/refs/heads/main/index.json")
        .then(response => response.json())
        .then(data => {
            allData = data;
            console.log(allData);
            displayData(allData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
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