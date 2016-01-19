/* global faker */
var profileName = document.getElementById('profile-name');
var profileLogin = document.getElementById('profile-login');
profileName.innerHTML = faker.name.findName();
profileLogin.innerHTML = faker.internet.userName();