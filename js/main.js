var tokenUser = sessionStorage.getItem('tokenUser');

if(tokenUser != null){

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        var response = JSON.parse(this.responseText);
        
        document.getElementById('profile-name').textContent = response.data.name;
        document.getElementById('profile-login').textContent = response.data.login;
    }
    });
    
    xhr.open("GET", "https://app-inapplet.rhcloud.com/api/?token="+tokenUser);
    
    xhr.send(data);
}

/* global io */
var socket = io.connect('https://smartlocation-back-evandrozanatta.c9users.io');

/* global faker */
var profileName = document.getElementById('profile-name');
var profileLogin = document.getElementById('profile-login');

var latitude;

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