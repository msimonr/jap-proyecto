//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listaProductos = [];
var prodOriginales = [];

const P_HIGH = 0;
const P_LOW = 1;
const P_REL = 2;

var min = NaN;
var max = NaN;
var current = P_HIGH;
var r = undefined;


document.addEventListener("DOMContentLoaded", function(e) {

    // Agregado entrega 1 || modificado en entrega 2
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            prodOriginales = resultObj.data;
            listaProductos = prodOriginales;
            sortList(current, listaProductos);
            showList(listaProductos);
        }
    });


    //Botones de orden
    $('#mayorPrecio').click(function() {
        current = P_HIGH;
        sortList(P_HIGH, listaProductos);
        showList(listaProductos);
    });

    $('#menorPrecio').click(function() {
        current = P_LOW;
        sortList(P_LOW, listaProductos);
        showList(listaProductos);
    });

    $('#mayorRelevancia').click(function() {
        current = P_REL;
        sortList(P_REL, listaProductos);
        showList(listaProductos);
    });

    // Botones de filtrado

    $('#filter').click(function() {
        min = parseInt($('#rangeFilterMin').val());
        max = parseInt($('#rangeFilterMax').val());
        sortList(current, listaProductos);
        showList(listaProductos);
    }); //fin click.

    $('#clear').click(function() {
        $('#rangeFilterMin').val('');
        $('#rangeFilterMax').val('');
        max = NaN;
        min = NaN;
        listaProductos = prodOriginales;
        sortList(current, listaProductos);
        showList(listaProductos);
    });

    $('#search').keyup(function() {
        //Armar regex
        let inputSearch = $('#search').val().toLowerCase();
        console.log(inputSearch);
        if (inputSearch !== '') {
            r = new RegExp(inputSearch.replaceAll(/\s/g, '\\s'));
        } else {
            r = undefined;
        }
        console.log(r);
        showList(listaProductos);
    });

    $('#clearSearch').click(function() {
        $('#search').val('');
        r = undefined;
        showList(listaProductos);
    });

});

// Funcion creada en entrega 2, codigo de entrega1
function showList(prodData) {
    let htmlContentToAppend = '';
    let filtro = isNaN(min) && isNaN(max);
    for (prod of prodData) {
        //filtro dependiendo precio... (tarea2)
        if ((r === undefined || r.test(prod.name.toLowerCase())) && (filtro || (!filtro && ((prod.cost >= min && prod.cost <= max) || (isNaN(min) && prod.cost <= max) || (isNaN(max) && prod.cost >= min))))) {
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action producto" id="${prod.name}">
                <div class="row">
                    <div class="col-3">
                        <img src="` + prod.imgSrc + `" alt="` + prod.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + prod.name + `</h4>
                            <small class="text-muted">` + prod.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + prod.description + `</p>
                        <p class="mb-1 precio">` + prod.currency + ` ` + prod.cost + `</p>      
                    </div>
                </div>
            </a>
            `
        }
    }
    document.getElementById('product-list-container').innerHTML = htmlContentToAppend;
}

function sortList(criterio, productos) {
    switch (criterio) {
        case P_HIGH:
            productos.sort((a, b) => {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            });
            break;
        case P_LOW:
            productos.sort((a, b) => {
                if (a.cost > b.cost) { return 1; }
                if (a.cost < b.cost) { return -1; }
                return 0;
            });
            break;
        case P_REL:
            productos.sort((a, b) => {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
            break;
    }
}