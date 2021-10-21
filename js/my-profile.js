//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById('userNamePerfil').innerHTML = localStorage.getItem('user');
    if (localStorage.getItem(localStorage.getItem('user') + 'userData')) {
        console.log('No null');
        showData();
    } else {
        console.log('null');
    }

});

function saveChanges() {
    //Guarda los valores ingresados

    let data = document.getElementsByClassName('data');
    let dataJson = {
        nombre: data[0].value,
        edad: data[1].value,
        mail: data[2].value,
        tel: data[3].value
    }
    localStorage.setItem(localStorage.getItem('user') + 'userData', JSON.stringify(dataJson));
    showData();
    return false;
}

function showData() {
    //muestra los datos del usuario
    console.log(localStorage.getItem(localStorage.getItem('user') + 'userData'));
    let data = JSON.parse(localStorage.getItem(localStorage.getItem('user') + 'userData'));
    for (key in data) {
        document.getElementById(key).value = data[key];
    }
}