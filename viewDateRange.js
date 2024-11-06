// Function to get the list of dates between the start and end date
document.getElementById('home-page-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});
function getDateRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        dateArray.push(currentDate.toISOString().split('T')[0]); // Store date in 'YYYY-MM-DD' format
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

// Function to render the food data for the selected date range
function renderFoodData(dates) {
    const foodIntakeTable = document.getElementById('food-intake-table').getElementsByTagName('tbody')[0];
    foodIntakeTable.innerHTML = ''; // Clear any previous data

    // Retrieve daily intake data from localStorage
    const d = JSON.parse(localStorage.getItem('d')) || {};

    dates.forEach(date => {
        const todaysFood = d[date] || []; // Get food data for the date, or an empty array if no data

        const row = document.createElement('tr');
        if (todaysFood.length === 0) {
            row.innerHTML = `<td colspan="8">${date}: No data available for this day</td>`;
            foodIntakeTable.appendChild(row); // Add the row with "No data" message
        } else {
            // Display the date only once
            const dateRow = document.createElement('tr');
            dateRow.innerHTML = `<td colspan="8"><strong>${date}</strong></td>`;
            foodIntakeTable.appendChild(dateRow); // Add the date row

            // Variables to hold the totals for the day
            let totalCalories = 0;
            let totalProtein = 0;
            let totalFats = 0;
            let totalCarbs = 0;
            let totalFiber = 0;
            let total = 'Total';

            // Iterate through food items and display them
            todaysFood.forEach(food => {
                const foodRow = document.createElement('tr');
                foodRow.innerHTML = `
                   
                    <td>${food.name}</td>
                    <td>${food.protein}</td>
                    <td>${food.fats}</td>
                    <td>${food.calories}</td>
                    <td>${food.fiber}</td>
                    <td>${food.carbs}</td>
                    <td>${food.quantity}</td>
                `;
                foodIntakeTable.appendChild(foodRow); // Add the food row

                // Add the values to the totals

                totalCalories += parseFloat(food.calories);
                totalProtein += parseFloat(food.protein);
                totalFats += parseFloat(food.fats);
                totalCarbs += parseFloat(food.carbs);
                totalFiber += parseFloat(food.fiber);
            });

            // Add the total row at the end of the day's food list
            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
                <td><strong>${total} </strong></td>
                <td><strong>${totalProtein.toFixed(2)}</strong></td>
                <td><strong>${totalFats.toFixed(2)}</strong></td>
                <td><strong>${totalCalories.toFixed(2)}</strong></td>
                <td><strong>${totalFiber.toFixed(2)}</strong></td>
                <td><strong>${totalCarbs.toFixed(2)}</strong></td>
                <td></td> <!-- Empty cell for the quantity column -->
            `;
            foodIntakeTable.appendChild(totalRow); // Add the total row
        }
    });
}

// Add event listener for the "OK" button click
document.getElementById('select-dates').addEventListener('click', function () {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        const dates = getDateRange(startDate, endDate); // Get all dates in the range
        renderFoodData(dates); // Render the food data for those dates
    } else {
        alert('Please select both start and end dates.');
    }
});
