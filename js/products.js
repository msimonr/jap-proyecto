//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listaProductos = [];
var prodOriginales = [];

const P_HIGH = 0;
const P_LOW = 1;
const P_REL = 2;

document.addEventListener("DOMContentLoaded", function(e) {

    // Agregado entrega 1 || modificado en entrega 2
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            prodOriginales = resultObj.data;
            listaProductos = prodOriginales;
            sortList(P_HIGH, listaProductos);
            showList(listaProductos);
        }
    });


    //Botones de orden
    $('#mayorPrecio').click(function(){
        sortList(P_HIGH, listaProductos);
        showList(listaProductos);
    });

    $('#menorPrecio').click(function(){
        sortList(P_LOW, listaProductos);
        showList(listaProductos);
    });

    $('#mayorRelevancia').click(function(){
        sortList(P_REL, listaProductos);
        showList(listaProductos);
    });

    // Botones de filtrado

    $('#filter').click(function(){
        let min = $('#rangeFilterMin').value;
        let max = $('#rangeFilterMax').value;
        if(min !== undefined || max !== undefined){
            $('.producto').forEach(element => {
                if(min !== undefined && element.cost < min){
                    
                }
            });
        }
    });

    
    // $('#clear').click(function(){

    // });

});

// Funcion creada en entrega 2, codigo de entrega1
function showList(prodData) {
    let htmlContentToAppend = '';
    for (prod of prodData) {
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action producto">
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
    document.getElementById('product-list-container').innerHTML = htmlContentToAppend;
}

function sortList(criterio, productos){
    switch (criterio){
        case P_HIGH:
            productos.sort((a,b)=>{
                if(a.cost > b.cost){return -1;}
                if(a.cost < b.cost){return 1;}
                return 0;
            });
            break;
        case P_LOW:
            productos.sort((a,b)=>{
                if(a.cost > b.cost){return 1;}
                if(a.cost < b.cost){return -1;}
                return 0;
            });
            break;
        case P_REL:
            productos.sort((a,b)=>{
                if(a.soldCount > b.soldCount){return -1;}
                if(a.soldCount < b.soldCount){return 1;}
                return 0;
            });
            break;
    } 
}

