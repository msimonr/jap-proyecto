//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let data = undefined;
    let prods = undefined;
    let prodComments = undefined;
    getJSONData(PRODUCT_INFO_URL).then(resul => {
        if (resul.status === "ok") { //Obtengo info producto
            data = resul.data;
            getJSONData(PRODUCTS_URL).then(resul2 => {
                if (resul2.status === "ok") { //Obtengo productos completos
                    prods = resul2.data;
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resul3 => {
                        if (resul3.status === "ok") {
                            prodComments = resul3.data;
                            show(data, prodComments, prods);
                        }
                    });
                }
            });
        }
    });

    // $('.rating').hover(function() {
    //     $(this).addClass('checked')
    // });

    $('.rating').hover(function() {
        let index = $(this).attr('id');
        $('.rating').each(function() {
            if ($(this).attr('id') <= index) {
                $(this).addClass('checked');
            }
        });
    }, function() {
        $('.rating').each(function() {
            $(this).removeClass('checked');
        });
    });

});


function show(info, prodComments, prods) {

    let img = ``;
    for (let i = 1; i < info.images.length; i++) {
        img += `<img src="${info.images[i]}" class="secondary">`
    }
    let prodRel = ``;
    for (let i = 0; i < info.relatedProducts.length; i++) {
        prodRel += `
        <div class="col-sm-4">
                <div class="card">
                    <a class="card-link" href="#">
                        <img class="card-img-top" src="${prods[info.relatedProducts[i]].imgSrc}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${prods[info.relatedProducts[i]].name}</h5>
                            <p class="card-text">${prods[info.relatedProducts[i]].description}</p>
                            <p class="card-text">${prods[info.relatedProducts[i]].currency} ${prods[info.relatedProducts[i]].cost}</p>
                        </div>
                    </a>
                </div>
            </div>
        `
    }
    let comments = ``;
    for (com of prodComments) {
        comments += `
        <div class="col-sm-12 mt-3 comment">
        <div class="row">
          <div class="col-sm-4">
          <p class="nameUsuario ml-3">${com.user}</p>
          </div>
          <div class="col-sm-4 text-left">
            <p class="rating">${stars(com.score)}</p>
          </div>
          <div class="col-sm-4 text-right">
            <p>${com.dateTime}</p>
          </div>
          </div>
          <hr class="mt-0">
          <p>${com.description}</p>
        </div>
        `
    }
    let html = `
    <div class="row">
            <div class="col-xs-5 col-lg-6">
                <div class="row">
                    <div class="col text-left">
                        <img src="${info.images[0]}" class="principal">
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left">     
                        ${img}          
                    </div>
                </div>
            </div>
            <div class="col-xs-7 col-lg-6">
                <div class="row">
                    <div class="col p-1">
                        <h2 class="name">${info.name}</h2>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col p-1">
                        <p class="desc">${info.description}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="precio">${info.currency} ${info.cost}</p>
                    </div>
                    <div class="col-sm-6"></div>
                    <div class="col-sm-3">
                        <button class="comprar">Comprar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p class="soldCount">Vendidos: ${info.soldCount}</p>
                        <button class="category">${info.category}</b>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row info producto -->
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <h3>Productos relacionados:</h3>
            </div>
            ${prodRel}
        </div>
        <!-- row relacionados -->
        <hr>
        <div class="row" id="comentarios">
        <div class="col-sm-12">
          <h3>Comentarios</h3>
        </div>
        ${comments}
        </div>
        <hr>
    `
    $('#infoProd').html(html);
}

function stars(score) {
    let star = ``;
    for (let i = 0; i < score; i++) {
        star += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - score; i++) {
        star += `<span class="fa fa-star"></span>`
    }
    return star;
}