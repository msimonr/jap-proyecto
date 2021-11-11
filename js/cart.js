const USD = 40;
const ENVIOS = { standar: 5, express: 7, premium: 15 };
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_FULL).then(cart => {
        if (cart.status === 'ok') {
            articles = cart.data.articles;
            showCarrito(articles);
            document.getElementById('cotizacion').innerHTML = USD;
        }
    });
    if (localStorage.getItem('compraExitosa') === 'true') {
        localStorage.removeItem('compraExitosa');
        document.getElementById('compraExitosa').innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Todo salio bien!</strong> Su compra se realizo exitosamente.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
    }
});


function showCarrito(cart) {
    htmlContentToAppend = '';
    for (let i = 0; i < cart.length; i++) {
        htmlContentToAppend += `
        <tr onchange="update(event)">
            <th scope="col" class="${'prod'+i}"><img src="${cart[i].src}" width="100px"></th>
            <th scope="col" class="${'prod'+i}">${cart[i].name}</th>
            <th scope="col" class="${'prod'+i}">${cart[i].currency} <span class="cost">${cart[i].unitCost}</span></th>
            <th scope="col" class="${'prod'+i}"><input type="number" min="1" value="${cart[i].count}" data-class="${'prod'+i}"></th>
            <th scope="col" class="${'prod'+i}">${cart[i].currency} <span class="subTotal" data-currency="${cart[i].currency}" data-subtotal="${cart[i].unitCost * cart[i].count}">${cart[i].unitCost * cart[i].count}</span></th>
        </tr>
        `
    }
    document.getElementById('products').innerHTML = htmlContentToAppend;
    resumenUpdate();
}

function update(event) {
    dataProd = document.getElementsByClassName(event.target.dataset.class);
    // act subtotal
    if (parseInt(dataProd[3].getElementsByTagName('input')[0].value) <= 0) {
        dataProd[3].getElementsByTagName('input')[0].value = 1;
    }
    let subtotal = parseFloat(dataProd[2].getElementsByClassName('cost')[0].innerHTML) * parseInt(dataProd[3].getElementsByTagName('input')[0].value);
    let elem = dataProd[4].getElementsByClassName('subTotal')[0];
    elem.innerHTML = subtotal;
    elem.dataset.subtotal = subtotal;
    resumenUpdate();
}

function resumenUpdate() {
    let envio = document.querySelector('input[type=radio]:checked');
    let subtotal = 0;
    let pEnvio = 0;
    let total = 0;
    let subtotalProds = document.getElementsByClassName('subTotal');
    for (elem of subtotalProds) {
        if (elem.dataset.currency === 'USD') {
            console.log(elem.dataset.subtotal);
            subtotal += USD * parseFloat(elem.dataset.subtotal);
        } else {
            subtotal += parseFloat(elem.dataset.subtotal);
        }
    }
    //Set subtotal
    document.getElementById('sub').innerHTML = subtotal;
    //Set envio
    pEnvio = subtotal * ENVIOS[envio.id] / 100;
    document.getElementById('env').innerHTML = pEnvio;
    //Set total
    total = subtotal + pEnvio;
    document.getElementById('total').innerHTML = total;
    document.getElementById('totalModal').innerHTML = total;
}

function pagar(nameForm) {
    let form = document.getElementById(nameForm);
    let error = '';
    let warning = document.getElementById('warning');
    for (let input of document.getElementsByClassName(nameForm + 'req')) {
        if (input.value === '') {
            console.log(input.dataset.campo);
            error += '<p> Complete el campo ' + input.dataset.campo + '</p>';
        }
    }
    warning.innerHTML = error;
    if (error === '') {
        form.reset();
        console.log('exito');
        localStorage.setItem('compraExitosa', 'true');
        // return true;
    } else {
        warning.hidden = false;
        return false;
    }
}