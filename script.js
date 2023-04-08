
function initMap() {
    // Initialize the map centered on the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Create a new map centered on the user's location
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12
    });

    // Create a PlacesService object to search for nearby markets
    var service = new google.maps.places.PlacesService(map);

    // Search for nearby markets within 5km
    var request = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: 5000,
        type: ['grocery_or_supermarket']
    };

    // Perform the search and add markers for each nearby market
    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                // Add an info window with the name and address of the market
                var infowindow = new google.maps.InfoWindow({
                    content: "<strong>" + place.name + "</strong><br>" + place.vicinity
                });
                marker.addListener("click", function () {
                    infowindow.open(map, marker);
                });

                // Add the name and address of the market to the list
                var marketList = document.getElementById("marketList");
                var li = document.createElement("li");
                li.innerHTML = "<strong>" + place.name + "</strong><br>" + place.vicinity;
                marketList.appendChild(li);
            }
        }
    });
}