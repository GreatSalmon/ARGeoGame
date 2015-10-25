var params = {};

if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// function showPosition(position) {
//     var username = params.userName;

//     var lat = $('#'+username).find('.lat')[0];
//     var lon = $('#'+username).find('.lon')[0];

//    // var lat = document.getElementById("lat");
//    // var lon = document.getElementById("lon");

//     lat.innerHTML = "Lat: " + position.coords.latitude; 
//     lon.innerHTML = "Lon: " + position.coords.longitude;
// }

function showPositions(data){
    
    for (var i=0;i<data.length; i++){
        var username = data[i].username;
        var latDiv = $('#'+username).find('.lat')[0];
        var lonDiv = $('#'+username).find('.lon')[0];
        
        latDiv.innerHTML = "Lat: " + data[i].lat; 
        lonDiv.innerHTML = "Lon: " + data[i].lon;

    }


}

function uploadPosition(position){
	$.post("/updategeoloc",
    {
    	username: params.userName,
        lat: position.coords.latitude,
        lon: position.coords.longitude
    },
        function(data) {
            showPositions(data);
        }
    );
}


function geoerror(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
        StartGeoLocation();
}
var options = {
		enableHighAccuracy: false,
		timeout: 0,
		maximumAge: 0
};
//getLocation();

function StartGeoLocation(){
    var id = navigator.geolocation.watchPosition(uploadPosition, geoerror, options);

}

StartGeoLocation();