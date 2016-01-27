var userToken = sessionStorage.getItem('user_token');

if(userToken == null){
    window.location.href = "/login";
}

document.getElementById('profile-name').innerHTML = sessionStorage.getItem('user_name');
document.getElementById('profile-login').innerHTML = sessionStorage.getItem('user_login');

/* global io */
var socket = io.connect('https://smartlocation-back-evandrozanatta.c9users.io:8080');

function definePosition(position){
    
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log(latitude);
    
    var latlon = latitude + "," + longitude;  
    
    /* global socket */
    socket.emit('newposition', latlon);
    
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
    alert('Geolocation is not supported by this browser.');
    console.log("Geolocation is not supported by this browser.");
}

/* id, name, login */
var userUpdate =  [sessionStorage.getItem('user_id'), sessionStorage.getItem('user_name'), sessionStorage.getItem('user_login')]
socket.emit('user_update', userUpdate);

socket.on('user_signup', function (data) {
    alert('Você foi cadastrado com sucesso');
});
