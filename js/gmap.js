var gmap = (function() {

    var map;
    var $mapController = $('.map-controllers');
    
    function addPinsToMap(map, point, routesData) {
        var marker = new google.maps.Marker({
            position: {
                lat: Number(point.Latitud),
                lng: Number(point.Longitud)
            },
            icon: {
                url: routesData.icon,
                scaledSize: new google.maps.Size(10, 10), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            },
            map
        });
        map.pins.push({
            groupId: routesData.id,
            marker
        });
    };
    
    function centerMap(map) {
        const mapBounds = new google.maps.LatLngBounds();
        if (map.pins) {
            map.pins.map((pin) => {
                mapBounds.extend(pin.marker.position);
            });
        }
        map.setCenter(mapBounds.getCenter());
        map.fitBounds(mapBounds);
    };
    
    function addRouteController(data) {
        $mapController.append(getControllerSchema(data));

    };

    function getControllerSchema(data) {
        return `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked value="" id="${data.id}">
                <label class="form-check-label" for="${data.id}">
                    ${data.name}
                </label>
            </div>
        `
    };

    function togglePinsOnMap(pinsId) {
        map.pins.map((pin) => {
            if (pin.groupId == pinsId) {
                pin.marker.map ? pin.marker.setMap(null) : pin.marker.setMap(map);
            }
        });
        
    };

    function bindEvents() {
        $mapController.on('click', 'input', function(e) {
            togglePinsOnMap($(e.currentTarget).attr('id'));
        });
    };


    var init = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12
        });
        map.pins = [];
    
        AllRoutes.forEach(routesData => {
            if (routesData.routes) {
                addRouteController(routesData);
                routesData.routes.forEach(route => {
                    route.forEach(point => {
                        addPinsToMap(map, point, routesData);            
                    })
                })
            }
        });
        
        centerMap(map);
        bindEvents();
    }

    return {
        init
    }

}());

