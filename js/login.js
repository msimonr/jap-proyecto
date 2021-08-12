//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});

// Agregado Entrega1
function login() {
    let user = document.getElementById("inputEmail").value;

    //Guardar datos de sesion.
    sessionStorage.setItem('user', user);
}