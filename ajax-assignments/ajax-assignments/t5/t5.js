'use strict';

import {restaurantRow} from './components.js';

const modal = document.querySelector('dialog');
modal.addEventListener('click', function () {
  modal.close();
});

const apiUrl = 'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1';
const positionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = response.json();
  return json;
}

function calculateDistance(x1, y1, x2, y2) {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return distance;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function success(pos) {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData(apiUrl + '/restaurants');
    console.log(restaurants);
    restaurants.sort(function (a, b) {
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

    for (const restaurant of restaurants) {
      const tr = restaurantRow(restaurant);
      tr.addEventListener('click', async function () {
        try {
          const allHighs = document.querySelectorAll('.highlight');
          for (const high of allHighs) {
            high.classList.remove('highlight');
          }
          tr.classList.add('highlight');
          modal.innerHTML = '';
          const html = `<h3>${restaurant.name}</h3>
      <p>${restaurant.company}</p>
      <p>${restaurant.address} ${restaurant.postalCode} ${restaurant.city}</p>
      <p>${restaurant.phone}</p>`;
          modal.insertAdjacentHTML('beforeend', html);
          const menu = await fetchData(
            apiUrl + `/restaurants/daily/${restaurant._id}/fi`
          );
          console.log(menu);
          let menuHtml = `
      <table>
        <tr>
          <th>Course</th>
          <th>Diet</th>
          <th>Price</th>
        </tr>
      `;
          for (const course of menu.courses) {
            menuHtml += `
        <tr>
          <td>${course.name}</td>
          <td>${course.diets || ' - '}</td>
          <td>${course.price || ' - '}</td>
        </tr>
        `;
          }
          menuHtml += '</table>';
          modal.insertAdjacentHTML('beforeend', menuHtml);
          modal.showModal();
        } catch (error) {
          alert(error.message);
        }
      });
    }
  } catch (error) {
    alert(error.message);
  }
}

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
