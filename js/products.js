//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var listaProductos = [];
document.addEventListener("DOMContentLoaded", function(e) {

    // Agregado entrega 1 || modificado en entrega 2
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            prodData = resultObj.data;
            showList(prodData);
        }
    });

});

// Funcion creada en entrega 2, codigo de entrega1
function showList(prodData) {
    let htmlContentToAppend = '';
    for (prod of prodData) {
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
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