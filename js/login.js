function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

var urlToken = getURLParameter('token_user');

if(urlToken != undefined){
    
    sessionStorage.setItem('user_token', urlToken);
    
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var response = JSON.parse(this.responseText);
            
            sessionStorage.setItem('user_id', response.data.id);
            sessionStorage.setItem('user_name', response.data.name);
            sessionStorage.setItem('user_login', response.data.login);
            
        }
    });
    
    xhr.open("GET", "https://app-inapplet.rhcloud.com/api/?token="+urlToken);
    
    xhr.send(data);
    
    window.location.href = "/";
}

var tokenUser = sessionStorage.getItem('user_token');

if(tokenUser != null){
    window.location.href = "/";
}