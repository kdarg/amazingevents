/////////////////////////////////////////////////////////////////////VARIABLES GLOBALES
var aEvents=[];
var selected = document.querySelector("#categoryselector");
var impresionHtml =document.getElementById("showCardHere");
var todoSelect = "primera";
var letraUsuario = "";

/////////////////////////////////////////////////////////////////////ASYNC

async function getEvents(){
        await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(respuesta=>respuesta.json())
        .then(json=>aEvents.push(...json.eventos))

        displayCards()
}
getEvents()

/////////////////////////////////////////////////////////////////////BUSCADOR Y SU LISTENER

var inputSearch = document.querySelector("#searchInput")
inputSearch.addEventListener("keyup",search)

/////////////////////////////////////////////////////////////////////BUSCADOR Y SU FUNCION

var data=[]

function search(event){ 
    var val = event.target.value 
    
    letraUsuario = val
    
    if(todoSelect !== "primera"){
        data = aEvents.filter(eCard => eCard.category.toLowerCase().includes(val.toLowerCase()) && eCard.category === todoSelect) 
    }else if(todoSelect == "primera" && letraUsuario == ""){
        data = aEvents
    }else{ data =  aEvents.filter(eCard => eCard.category.toLowerCase().includes(val.toLowerCase()))        
    
    }
    displayCards(data)

}

/////////////////////////////////////////////////////////////////////DISPLAY DE TODAS LAS CARDS

var everyCard=[]

function displayCards(data){

    if(data==undefined){ 
        everyCard.push(...aEvents)
    }else{
        everyCard.push(...data)
    }

    impresionHtml.innerHTML="" 

    everyCard.map(events=>{
        impresionHtml.innerHTML +=
    
            `  <div class="pt-1 pb-1">
            <div
            class="mb-2 d-flex flex-column justify-content-center align-items-center"
            >
            <div class="col-10">
                <div
                class="row col-sm-12 g-0 border rounded overflow-hidden mb-4 shadow-sm h-md-250 position-relative bg-light"
                >
                <div
                    class="col p-4 d-flex flex-column justify-content-sm-center position-static boxs"
                >
                    
                    <h3 class="colordecadaevento mb-0 text-md-start text-center">${events.name}</h3>
                    
                    <div class="mb-1 text-muted text-md-start text-center mt-3">
                    ${events.date} - ${events.place}
                    </div>
                    <p class="card-text mb-auto text-md-start text-center mt-3">
                    ${events.description}
                    </p>
                    <a href="./detalles.html?id=${events.id}" class="text-md-start text-center fst-italic">Ver más</a>
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
everyCard=[]
}

/////////////////////////////////////////////////////////////////////FUNCTION DE MI SELECT

function selectEvent(event){
    var eventoSelect = event.target.value
    todoSelect= eventoSelect
    var data =[]

    if(letraUsuario !== ""){

        if (eventoSelect === "primera"){
            data.push(...aEvents.filter(eCard => eCard.category.toLowerCase().includes(letraUsuario.toLowerCase())))
        }else {
            data.push(...aEvents.filter(card => card.category === eventoSelect && card.category.toLowerCase().includes(letraUsuario.toLowerCase())))
        }
        
        
    } else{
        if (eventoSelect === "primera"){
            data.push(...aEvents)
        }else {
            data.push(...aEvents.filter(card => card.category === eventoSelect))
        }

    }
    displayCards(data)
}

/////////////////////////////////////////////////////////////////////LISTENER DE MI SELECT
selected.addEventListener("change", selectEvent)



