/////////////////////////////////////////////////////////////////////VARIABLES GLOBALES
var aEvents = [] 

/////////////////////////////////////////////////////////////////////ASYNC Y FUNCION DE IDs

async function getEvents(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(respuesta=>respuesta.json())
    .then(json=>aEvents.push(...json.eventos))

    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])

    var ids = aEvents.find(function(idss) {
        return idss.id == selectedId
    })

    var impresionAlHtml =     `  <div class="">
    <div
    class="mb-2 d-flex flex-column justify-content-center align-items-center"
    >
    <div class="col-7">
        <div
        class="row col-sm-12 g-0 border rounded overflow-hidden mb-4 shadow-sm h-md-250 position-relative bg-light"
        >
        <div
            class="col p-4 d-flex flex-column justify-content-sm-center position-static boxs"
        >
        <a class="sacarlink" href="./detalles.html">
            <h3 class="mb-0 text-md-start text-center">${ids.name}</h3>
        </a>
            <div class="mb-1 text-muted text-md-start text-center mt-3">
            ${ids.date} - ${ids.place}
            </div>
            <p class="card-text mb-auto text-md-start text-center mt-3">
            ${ids.description}
            </p>
            <p class="card-text mb-auto text-md-start text-center mt-3 costocolor fw-bold">
            Costo: $ ${ids.price}
            </p>
            <p class="card-text mb-auto text-md-start text-center mt-3 invicolor fw-bold">
            Invitados: ${ids.assistance || ids.estimate } 
            </p>
        </div>
        <div
            class="col-md-auto col-sm-12 d-md-block mx-auto mx-md-0 my-auto p-3 d-md-block d-flex justify-content-center"
        >
            <img class="rounded" src="${ids.image}" alt="${ids.name}" />
        </div>
        </div>
    </div>
    </div>
    `

    document.getElementById("showCardHere").innerHTML = impresionAlHtml

}
getEvents()
