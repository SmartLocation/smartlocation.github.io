/* global faker */
var profileName = document.getElementById('profile-name');
var profileLogin = document.getElementById('profile-login');
profileName.innerHTML = faker.name.findName();
profileLogin.innerHTML = faker.internet.userName();

var latitude;

function definePosition(position){
    
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude
    
    /* global GMaps */
    var map = new GMaps({
        div: '#map',
        lat: latitude,
        lng: longitude
    });
    
    map.addMarker({
        lat: latitude,
        lng: longitude,
        title: 'Você',
        click: function(e) {
            /*alert('You clicked in this marker');*/
        }
    });
    /*
    var panorama = GMaps.createPanorama({
      el: '#map',
      lat : latitude,
      lng : longitude
    });*/
    
    console.log(map);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(definePosition);
} else {
    console.log("Geolocation is not supported by this browser.");
} 