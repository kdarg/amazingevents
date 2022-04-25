/////////////////////////////////////////////////////////////////////VARIABLES GLOBALES
var dataCompleta={};
var aEvents = [];
var impresionAlHtml = document.getElementById("showCardHere");

/////////////////////////////////////////////////////////////////////ASYNC

function fetchData(){
    fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(data=>data.json())
    .then(data=>{
        aEvents.push(...data.eventos)
        dataCompleta=data
        displayFutureCards(aEvents)
    })
}
fetchData()

/////////////////////////////////////////////////////////////////////EVENTOS FUTUROS

function displayFutureCards(){
    let pasadosFuturos = aEvents.filter(eachCard=>eachCard.date > dataCompleta.fechaActual)

    impresionAlHtml.innerHTML=""

    pasadosFuturos.map(events=>{

        impresionAlHtml.innerHTML +=
    
            `  <div class="">
            <div
            class="mb-2 d-flex flex-column justify-content-center align-items-center"
            >
            <div class="col-8">
                <div
                class="row col-sm-12 g-0 border rounded overflow-hidden mb-4 shadow-sm h-md-250 position-relative bg-light"
                >
                <div
                    class="col p-4 d-flex flex-column justify-content-sm-center position-static boxs"
                >
                <a class="sacarlink" href="./detalles.html?id=${events.id}">
                    <h3 class="mb-0 text-md-start text-center">${events.name}</h3>
                </a>
                    <div class="mb-1 text-muted text-md-start text-center mt-3">
                    ${events.date} - ${events.place}
                    </div>
                    <p class="card-text mb-auto text-md-start text-center mt-3">
                    ${events.description}
                    </p>
                    <p class="card-text mb-auto text-md-start text-center mt-3 costocolor fw-bold">
                    Costo: $ ${events.price}
                    </p>
                </div>
                <div
                    class="col-md-auto col-sm-12 d-md-block mx-auto mx-md-0 my-auto p-3 d-md-block d-flex justify-content-center"
                >
                    <img class="rounded" src="${events.image}" alt="${events.name}" />
                </div>
                </div>
            </div>
            </div>
            `

    })
}

