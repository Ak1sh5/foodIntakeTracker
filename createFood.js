// Get food data from localStorage or initialize as an empty array
document.getElementById('home-page-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});
let foods = JSON.parse(localStorage.getItem('foods')) || [];

// Handle form submission for adding custom food
document.getElementById('add-food-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('food-name').value;
    const protein = parseFloat(document.getElementById('food-protein').value) || 0;
    const fats = parseFloat(document.getElementById('food-fats').value) || 0;
    const calories = parseFloat(document.getElementById('food-calories').value) || 0;
    const fiber = parseFloat(document.getElementById('food-fiber').value) || 0;
    const carbs = parseFloat(document.getElementById('food-carbs').value) || 0;
    const quantity = parseFloat(document.getElementById('food-quantity').value);

    const newFood = {
        name,
        protein,
        fats,
        calories,
        fiber,
        carbs,
        quantity
    };

    // Add new food to the foods array and save to localStorage
    foods.push(newFood);
    localStorage.setItem('foods', JSON.stringify(foods));

    // Clear form fields
    document.getElementById('add-food-form').reset();

    // Refresh the food list table
    renderFoodList();
});

// Function to render food list in the table
function renderFoodList() {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = ''; // Clear the table before re-rendering

    foods.forEach((food, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${food.name}</td>
            <td>${food.protein}</td>
            <td>${food.fats}</td>
            <td>${food.calories}</td>
            <td>${food.fiber}</td>
            <td>${food.carbs}</td>
            <td>${food.quantity}</td>
            <td><button onclick="deleteFood(${index})">Delete</button></td>
        `;
        foodList.appendChild(row);
    });
}

// Function to delete a food item from the list
function deleteFood(index) {
    foods.splice(index, 1); // Remove the food item from the array
    localStorage.setItem('foods', JSON.stringify(foods)); // Update localStorage
    renderFoodList(); // Re-render the food list
}

// Initialize the app by rendering the food list
renderFoodList();
