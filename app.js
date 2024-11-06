// When the "Add Food" button is clicked, redirect to addFood.html
document.getElementById('create-food-btn').addEventListener('click', function () {
    window.location.href = 'createFood.html';
});

// Redirect to createFood.html when "Create Food" is clicked
document.getElementById('add-food-btn').addEventListener('click', function () {
    window.location.href = 'addFood.html';
});

document.getElementById('see-food-history').addEventListener('click', function () {
    window.location.href = 'seePreviousData.html';
});

// Get today's date in 'YYYY-MM-DD' format
const todayDate = new Date().toISOString().split('T')[0];

// Retrieve daily intake data from localStorage
const dailyFoodCounter = JSON.parse(localStorage.getItem('dailyFoodCounter')) || {};

// Function to render today's food intake
function renderDailyIntake() {
    const dailyIntakeList = document.getElementById('daily-food-intake');
    dailyIntakeList.innerHTML = ''; // Clear the list before re-rendering

    // Check if there is data for today's date
    const todaysFood = dailyFoodCounter[todayDate] || []; // Default to empty array if no data for today

    // Variables to hold total values for today's intake
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFats = 0;
    let totalCarbs = 0;
    let totalFiber = 0;

    // Iterate through today's food items
    todaysFood.forEach((food, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${food.name}</td>
            <td>${food.protein}</td>
            <td>${food.fats}</td>
            <td>${food.calories}</td>
            <td>${food.fiber}</td>
            <td>${food.carbs}</td>
            <td>${food.quantity}</td>
            <td><button onclick="deleteFood('${todayDate}', ${index})">Delete</button></td>
        `;
        dailyIntakeList.appendChild(row);

        // Add the values to the totals
        totalCalories += parseFloat(food.calories);
        totalProtein += parseFloat(food.protein);
        totalFats += parseFloat(food.fats);
        totalCarbs += parseFloat(food.carbs);
        totalFiber += parseFloat(food.fiber);
    });

    // Add the total row at the end
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>${totalProtein.toFixed(2)}</strong></td>
        <td><strong>${totalFats.toFixed(2)}</strong></td>
        <td><strong>${totalCalories.toFixed(2)}</strong></td>
        <td><strong>${totalFiber.toFixed(2)}</strong></td>
        <td><strong>${totalCarbs.toFixed(2)}</strong></td>
        <td></td> <!-- Empty cell for the quantity column -->
        <td></td> <!-- Empty cell for the delete button -->
    `;
    dailyIntakeList.appendChild(totalRow);
}

// Function to delete food item for today's intake
function deleteFood(date, index) {
    // Ensure the food array for today's date exists
    if (dailyFoodCounter[date]) {
        // Remove the food item from today's array
        dailyFoodCounter[date].splice(index, 1); // Splice the item at the given index
        localStorage.setItem('dailyFoodCounter', JSON.stringify(dailyFoodCounter)); // Update localStorage
        renderDailyIntake(); // Re-render the food list
    } else {
        console.error("No food data found for the date:", date);
    }
}

// Initialize the daily intake display
renderDailyIntake();
