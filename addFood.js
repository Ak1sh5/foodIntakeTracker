// Define the function globally so it's accessible in HTML onclick handlers

document.getElementById('home-page-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});

function addFoodToDailyIntake(index) {
    const row = document.querySelectorAll('table tbody tr')[index];

    // Get the food data from the row
    const food = {
        name: row.cells[0].textContent,          // Food Name
        protein: parseFloat(row.cells[1].textContent),  // Protein (g)
        fats: parseFloat(row.cells[2].textContent),     // Fats (g)
        calories: parseFloat(row.cells[3].textContent), // Calories (kcal)
        fiber: parseFloat(row.cells[4].textContent),   // Fiber (g)
        carbs: parseFloat(row.cells[5].textContent),   // Carbs (g)
        quantity: parseFloat(row.cells[6].textContent) // Quantity (g)
    };

    // Get the current date in YYYY-MM-DD format (only the date, not time)
    const todayDate = new Date().toISOString().split('T')[0]; // format as '2024-11-06'

    // Retrieve the dailyIntake object from localStorage or initialize an empty object
    let dailyFoodCounter = JSON.parse(localStorage.getItem('dailyFoodCounter')) || {};

    // If today's date isn't already a key in dailyIntake, initialize it as an empty array
    if (!dailyFoodCounter[todayDate]) {
        dailyFoodCounter[todayDate] = [];
    }

    // Add the food item to today's array (the array under the key of todayDate)
    dailyFoodCounter[todayDate].push(food);

    // Save the updated dailyIntake object to localStorage
    localStorage.setItem('dailyFoodCounter', JSON.stringify(dailyFoodCounter));

    // Feedback to the user
    console.log(dailyFoodCounter);  // Check the full object to confirm today's food items are added
    alert(`${food.name} has been added to your daily intake!`);
}



// Wait for the DOM to be fully loaded before accessing the elements
document.addEventListener('DOMContentLoaded', function () {
    // Get the custom foods from localStorage (or an empty array if none exists)
    let Alreadyfoods = JSON.parse(localStorage.getItem('foods')) || [];

    function renderFoodList() {
        const foodList = document.getElementById('already-food-list');
        foodList.innerHTML = ''; // Clear the table before re-rendering

        if (Alreadyfoods.length === 0) {
            foodList.innerHTML = '<p>No foods created yet. Add some foods first!</p>';
            return;
        }

        Alreadyfoods.forEach((food, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${food.name}</td>
                <td>${food.protein}</td>
                <td>${food.fats}</td>
                <td>${food.calories}</td>
                <td>${food.fiber}</td>
                <td>${food.carbs}</td>
                <td>${food.quantity}</td>
                <td><button onclick="addFoodToDailyIntake(${index})">Add</button></td>
            `;
            foodList.appendChild(row);
        });
    }
    renderFoodList();
});
