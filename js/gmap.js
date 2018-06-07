function initMap() {
    var center = { lat: 9.9333333333333, lng: -84.083333333333 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
    });
    map.pins = [];
    addPinsToMap(map);
    centerMap(map);
}

function centerMap(map) {
    const mapBounds = new google.maps.LatLngBounds();
    if (map.pins) {
        map.pins.map((pin) => {
            mapBounds.extend(pin.position);
        });
    }
    map.setCenter(mapBounds.getCenter());
    map.fitBounds(mapBounds);
}

function addPinsToMap(map) {
    var uluru = { lat: 9.9333333333333, lng: -84.083333333333 };

    AllRoutes.forEach( routesData => {
        routesData.routes.forEach(route => {
            route.forEach(point => {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(point.Latitud), 
                        lng: Number(point.Longitud)
                    },
                    icon: {
                        url: routesData.icon,
                        scaledSize: new google.maps.Size(10, 10), // scaled size
                        origin: new google.maps.Point(0,0), // origin
                        anchor: new google.maps.Point(0, 0) // anchor
                    },
                    map
                  });
                  map.pins.push(marker);
            })
        })
    })
}

