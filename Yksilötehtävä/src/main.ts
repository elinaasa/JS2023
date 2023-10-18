// Existing imports...
import { errorModal, restaurantModal, restaurantRow } from './components';
import { fetchData } from './functions';
import { Restaurant } from './interfaces/Restaurant';
import { apiUrl, positionOptions } from './variables';
import { Menu, MenuWeekly } from './interfaces/Menu';
import { ToggleOption } from './interfaces/ToggleOption'; // New import for ToggleOption
import { restaurantModalWeekly } from './components'; // New import for restaurantModalWeekly

const checkbox = document.getElementById("checkbox");
if (checkbox) {
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
}

// Find and set up modal element
const modal = document.querySelector('dialog');
if (!modal) {
  throw new Error('Modal not found');
}
modal.addEventListener('click', () => {
  modal.close();
});

// Initialize variables
let currentToggleOption: ToggleOption = 'daily'; // Definition for currentToggleOption
let selectedRestaurant: Restaurant; // Declare a variable to store the selected restaurant

// Function to calculate distance between two points
const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

// Function to create and update the restaurant table
const createTable = (restaurants: Restaurant[]) => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('Table not found');
  }

  // Clear existing table content
  table.innerHTML = '';

  // Iterate through restaurants to create rows
  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    table.appendChild(tr);

    // Event listener for restaurant row click
    tr.addEventListener('click', async () => {
      try {
        // Remove all highlights
        const allHighs = document.querySelectorAll('.highlight');
        allHighs.forEach((high) => {
          high.classList.remove('highlight');
        });

        // Add highlight to the clicked row
        tr.classList.add('highlight');

        // Add restaurant data to modal
        modal.innerHTML = '';
        selectedRestaurant = restaurant;

        // Fetch menu based on the currentToggleOption
        const menu = await fetchData<Menu>(
          apiUrl + `/restaurants/${currentToggleOption}/${selectedRestaurant._id}/fi`
        );
        console.log(currentToggleOption);
          let menuHtml = '';
        // Generate HTML for restaurant modal
        if (currentToggleOption === 'daily') {
           menuHtml = menu && menu.courses ? restaurantModal(selectedRestaurant, menu) : 'Menu not available';
        } else {
           menuHtml = menu ? restaurantModalWeekly(selectedRestaurant, menu as unknown as MenuWeekly) : 'Menu not available';
        }
        modal.insertAdjacentHTML('beforeend', menuHtml);

        // Display modal
        modal.showModal();
      } catch (error) {
        // Display error in modal
        modal.innerHTML = errorModal((error as Error).message);
        modal.showModal();
      }
    });
  });
};

// Success callback for geolocation
const success = async (pos: GeolocationPosition) => {
  try {
    const crd = pos.coords;

    // Fetch and sort restaurants based on distance
    const restaurants = await fetchData<Restaurant[]>(apiUrl + '/restaurants');
    console.log(restaurants);

    // Sort restaurants by distance from user's location
    restaurants.sort((a, b) => {
      const x1 = crd.latitude;
      const y1 = crd.longitude;
      const x2a = a.location.coordinates[1];
      const y2a = a.location.coordinates[0];
      const distanceA = calculateDistance(x1, y1, x2a, y2a);
      const x2b = b.location.coordinates[1];
      const y2b = b.location.coordinates[0];
      const distanceB = calculateDistance(x1, y1, x2b, y2b);
      return distanceA - distanceB;
    });

    // Create and display the restaurant table
    createTable(restaurants);
    console.log(restaurants);

    // Set up event listeners for filtering buttons
    const sodexoBtn = document.querySelector('#sodexo');
    const compassBtn = document.querySelector('#compass');
    const resetBtn = document.querySelector('#reset');
    const toggleButton = document.querySelector('#toggleMenus');

    if (!sodexoBtn || !compassBtn || !resetBtn || !toggleButton) {
      throw new Error('Button not found');
    }

    // Event listener for Sodexo filter button
    sodexoBtn.addEventListener('click', () => {
      const sodexoRestaurants = restaurants.filter(
        (restaurant) => restaurant.company === 'Sodexo'
      );
      createTable(sodexoRestaurants);
    });

    // Event listener for Compass Group filter button
    compassBtn.addEventListener('click', () => {
      const compassRestaurants = restaurants.filter(
        (restaurant) => restaurant.company === 'Compass Group'
      );
      createTable(compassRestaurants);
    });

    // Event listener for reset button to show all restaurants
    resetBtn.addEventListener('click', () => {
      createTable(restaurants);
    });

    // Event listener for toggling menus (daily/weekly)
    toggleButton.addEventListener('click', async () => {
      // Toggle the currentToggleOption between 'daily' and 'weekly'
      currentToggleOption = currentToggleOption === 'daily' ? 'weekly' : 'daily';

      // Check if a restaurant is selected
      if (selectedRestaurant) {
        // Update the button text or perform any other UI changes
        if (toggleButton instanceof HTMLButtonElement) {
          toggleButton.innerText = `Show ${currentToggleOption} menus`;
        }

        try {
          // Fetch and update the menu based on the currentToggleOption
          const menu = await fetchData<Menu>(
            apiUrl + `/restaurants/${currentToggleOption}/${selectedRestaurant._id}/fi`
          );

          // Update the modal content
          const menuHtml = restaurantModal(selectedRestaurant, menu);
          modal.innerHTML = menuHtml;
        } catch (error) {
          // Display error in modal
          modal.innerHTML = errorModal((error as Error).message);
          modal.showModal();
        }
      } else {
        // Handle the case where no restaurant is selected
        console.warn('No restaurant selected.');
      }
    });

  } catch (error) {
    modal.innerHTML = errorModal((error as Error).message);
    modal.showModal();
  }
};

// Error callback for geolocation
const error = (err: GeolocationPositionError) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

// Request geolocation information
navigator.geolocation.getCurrentPosition(success, error, positionOptions);
