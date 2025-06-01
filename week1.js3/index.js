async function fetchData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/najmeh25/najmeh25.github.io/refs/heads/main/index.json");
        return await response.json();
    } catch {
        console.error("Failed to fetch data.");
        return [];
    }
}

// Display data in the list
function displayData(data) {
    const dataList = document.getElementById("data-list");
    dataList.innerHTML = data.length
        ? data.map(item => `
            <li>
                <strong>${item.name}</strong> (${item.type}) - $${item.price.toFixed(2)}
                <br>Ingredients: ${item.ingredients.join(", ")}
                <br>Available: ${item.available ? "Yes" : "No"}
            </li>
        `).join("")
        : "<li>No results found.</li>";
}

// Filter data based on search term
function filterData(data, searchTerm) {
    return data.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
    );
}

// Main function
async function main() {
    const data = await fetchData();
    document.getElementById("search-input").addEventListener("input", e => {
        const filtered = filterData(data, e.target.value.toLowerCase());
        displayData(filtered);
    });
    displayData(data);
}

main();