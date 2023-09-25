// JS5 restaurant api

import {errorModal, restaurantModal, restaurantRow} from './components';
import {fetchData} from './functions';
import {apiUrl, positionOptions} from './variables';
import {Restaurant} from './interfaces/Restaurant';

const modal = document.querySelector('dialog');
if (!modal) {
  throw new Error('Modal not found');
}
modal.addEventListener('click', () => {
  modal.close();
});

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = (restaurants: any[]) => {
  const table = document.querySelector('table');
  table.innerHTML = '';
  restaurants.forEach((restaurant: {_id: any}) => {
    const tr = restaurantRow(restaurant);
    table.appendChild(tr);
    tr.addEventListener('click', async () => {
      try {
        // remove all highlights
        const allHighs = document.querySelectorAll('.highlight');
        allHighs.forEach((high) => {
          high.classList.remove('highlight');
        });
        // add highlight
        tr.classList.add('highlight');
        // add restaurant data to modal
        modal.innerHTML = '';

        // fetch menu
        const menu = await fetchData<Menu>(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`
        );
        console.log(menu);

        const menuHtml = restaurantModal(restaurant, menu);
        modal.insertAdjacentHTML('beforeend', menuHtml);

        modal.showModal();
      } catch (error) {
        modal.innerHTML = errorModal((error as Error).message);
        modal.showModal();
      }
    });
  });
};

const error = (err: GeolocationPositionError) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const success = async (pos: GeolocationPosition) => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData<Restaurant[]>(apiUrl + '/restaurants');
    console.log(restaurants);
    restaurants.sort(
      (
        a: {location: {coordinates: any[]}},
        b: {location: {coordinates: any[]}}
      ) => {
        const x1 = crd.latitude;
        const y1 = crd.longitude;
        const x2a = a.location.coordinates[1];
        const y2a = a.location.coordinates[0];
        const distanceA = calculateDistance(x1, y1, x2a, y2a);
        const x2b = b.location.coordinates[1];
        const y2b = b.location.coordinates[0];
        const distanceB = calculateDistance(x1, y1, x2b, y2b);
        return distanceA - distanceB;
      }
    );
    createTable(restaurants);
    // buttons for filtering
    const sodexoBtn = document.querySelector('#sodexo');
    const compassBtn = document.querySelector('#compass');
    const resetBtn = document.querySelector('#reset');

    if (!sodexoBtn || !compassBtn || !resetBtn) {
      throw new Error('Button not found');
    }
    sodexoBtn.addEventListener('click', () => {
      const sodexoRestaurants = restaurants.filter(
        (restaurant: {company: string}) =>
          (company === 'Sodexo') | 'Compass Group'
      );
      console.log(sodexoRestaurants);
      createTable(sodexoRestaurants);
    });

    compassBtn.addEventListener('click', () => {
      const compassRestaurants = restaurants.filter(
        (restaurant: {company: string}) =>
          restaurant.company === 'Compass Group'
      );
      console.log(compassRestaurants);
      createTable(compassRestaurants);
    });

    resetBtn.addEventListener('click', () => {
      createTable(restaurants);
    });
  } catch (error) {
    modal.innerHTML = errorModal((error as Error).message);
    modal.showModal();
  }
};

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
