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
  console.log('map', map)
  return map;
}


async function SearchFilter() {
 
  const request = await fetch('/api')
  const restaurants = await request.json()

  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        place.zip.match(regex) 
      );
    });
  }

  //this code shows the display that matches the user's input
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray
      .map((place) => {
        return `<li>
        <span class="name"><b>${place.name}</b></span><br>
        <address><b>${place.address_line_1}</b><br>
        <b>${place.city}</b><br>
        <b>${place.state}</b><br>
        <b>${place.zip}</b><address>
        <br>
      </li>`;
      })
      .join("");
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector(".SearchBar");
  const suggestions = document.querySelector(".ListOfLocations");
  const userForm = document.querySelector(".userForm");



  userForm.addEventListener("submit", (e) => {
      console.log('SUBMISSION RECORDED');
      console.log(searchInput.value)

    displayMatches(e);
    e.preventDefault();
  });
}



async function dataHandler(mapObjectFromFunction) {
  SearchFilter()
  
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;