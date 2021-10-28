//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});

// Agregado Entrega1
function login() {
    let user = document.getElementById("inputUser").value;

    //Guardar datos de sesion.
    localStorage.setItem('user', user);

    //Guardar datos de usuario (si no existe)
    if (!localStorage.getItem(user + 'userData')) {
        let dataJson = {
            nombre: '',
            edad: '',
            mail: '',
            tel: '',
            imgPerfil: 'img/default.jpg'
        }
        localStorage.setItem(localStorage.getItem('user') + 'userData', JSON.stringify(dataJson));
    }

}