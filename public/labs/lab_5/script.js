// This intializes the map
function mapInit() {
  const map = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWhpbnRvbiIsImEiOiJja20yZ21rcGUxNHJyMm9yM3Q4dDE1dGFjIn0.-83mPUmqtwJV5j2Z8RftvQ'
  }).addTo(map);
  console.log('map', map);
  return map;
}

// This function gets array of top five zipcode matches
async function search(wordToMatch) {
  const request = await fetch('/api');
  const restaurants = await request.json();

  function findMatches() {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return (
        place.zip.match(regex)
      );
    });
  }
  async function getTopFive() {
    const matchArray = findMatches();
    const firstFive = matchArray.slice(0, 5);
    return firstFive;
  }
  return getTopFive();
}

// This function takes the matches array from search and displays it
async function display(matchesArray) {
  function displayMatches() {
    const html = matchesArray.map((place) => `<li class="box">
        <span class="name"><b>${place.name}</b></span><br>
        <address><b>${place.address_line_1}</b><br>
        <b>${place.zip}</b><address>
        <br>
      </li>`).join('');
    suggestions.innerHTML = html;
  }
  const suggestions = document.querySelector('.listOfLocations');
  displayMatches();
}

// This calls the previous functions and builds the map with markers
async function dataHandler(mapObjectFromFunction) {
  function coordinateEntry(arr) {
    // this should enter coordinates and place them as markers through a foor loop
    // the i variable exists to only pan to the first marker placed
    let i = 0;
    for (const obj of arr) {
      const coordinates = obj.geocoded_column_1.coordinates.reverse();
      console.log(coordinates);

      if (i < 1) {
        mapObjectFromFunction.panTo(coordinates);
      }

      i += 1;
      const marker = L.marker(coordinates).addTo(mapObjectFromFunction);
    }
  }

  const searchInput = document.querySelector('.SearchBar');
  const userForm = document.querySelector('.userForm');

  userForm.addEventListener('submit', async (e) => {
    console.log(`SUBMISSION RECORDED: ${searchInput.value}`);
    if (searchInput.value !== ''){
      e.preventDefault();
    }
    const topFiveArray = await search(searchInput.value);
    console.log(topFiveArray);
    display(topFiveArray);
    coordinateEntry(topFiveArray);
  });
}

// This runs all needed functions
async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;