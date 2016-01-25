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
    sessionStorage.setItem('tokenUser', urlToken);
    window.location.href = "/";
}