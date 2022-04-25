/////////////////////////////////////////////////////////////////////VARIABLES GLOBALES
var aEvents = [];
var categorias = [];
var eventosPorCategorias = [];
var arraycito = [];
/////////////////////////////////////////////////////////////////////ASYNC

async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(data => data.json())
    .then(data => {
    aEvents.push(...data.eventos);
    });

    getCategories(aEvents,categorias)
    summary(aEvents, categorias)
    lasCategorias(eventosPorCategorias)
    porcentajeMayorMenor(eventosPorCategorias)
    mayorEvento()
    menorEvento()
}
getData();

function getCategories(array,cat){ 

    array.forEach(event => { 

        if(!cat.includes(event.category)){ 
            cat.push(event.category)  
        }
    })

}

function summary(todo, cat){

    // evento + porcentaje
    todo.forEach(evento =>{
        arraycito.push({
            nombreEvento: evento.name,
            porcentajeEvento: (((evento.assistance || evento.estimate ) *100) / evento.capacity).toFixed()
        })
    })

    cat.forEach(ctg =>{
    
    //obtencion de las capacidades
    let capacidad = []
    
    todo.filter( event => event.category === ctg && capacidad.push(event.capacity))

    //suma de capacidades
    let sumaCapacidad = 0

    for(let i=0; i<capacidad.length ; i++ ){
        sumaCapacidad += capacidad[i]
    }

    //obtencion de los ingresos
    
    let ingresos = []

    todo.filter( event => event.category === ctg  && ingresos.push(event.price * event.assistance || event.estimate))

    let sumaIngresos = 0

    for(let i=0; i<ingresos.length ; i++ ){
        sumaIngresos += ingresos[i]
    }

    //obtencion de asistencia/estimate

    let asistencia = []

    todo.filter( event => event.category === ctg  && asistencia.push(event.assistance || event.estimate))



    //suma de las asistencias

    let sumaAsistencias = 0

    for(let i=0; i<asistencia.length ; i++ ){
        sumaAsistencias += asistencia[i]
    }

        eventosPorCategorias.push({  
            categoria : ctg,
            capacidad: sumaCapacidad, 
            ingreso: sumaIngresos,
            porcentajedeasistencia: ((sumaAsistencias*100) / sumaCapacidad).toFixed(),
            eventos: todo.filter(event => event.category === ctg)
        })
    })

}

function lasCategorias(cats){
    let miscats = document.getElementById("categoriascolumnas")
    let misporcentajes = document.getElementById("porcentajedeasistencia") 
    let mayorcapacidad = document.getElementById("mayorcapa") 
    let ingresos = document.getElementById("ingresoporcategorias") 

    cats.map( ctg => {
        miscats.innerHTML += ` <th scope="col" class="text-center fw-bold">${ctg.categoria}</th> `
        misporcentajes.innerHTML += ` <th scope="col" class="text-center fw-normal">${ctg.porcentajedeasistencia}%</th> `
        mayorcapacidad.innerHTML += ` <td class="text-center fw-normal">${ctg.capacidad < 300000 ? "-" : ctg.capacidad}</td> ` 
        ingresos.innerHTML += ` <td class="text-center fw-normal">$ ${ctg.ingreso}</td> ` 
    } )

}

function porcentajeMayorMenor(array){
    let maymen = document.getElementById("mayorPorcxAud") 

    let porcentajitos = []

    array.filter(pctj => porcentajitos.push({
        nombre: pctj.categoria,
        porcentaje: pctj.porcentajedeasistencia
        
    }))
    porcentajitos.sort( (a,b) => b.porcentaje-a.porcentaje )

    porcentajitos.map(evento =>{

    maymen.innerHTML += ` <td class="text-center">
    ${evento.porcentaje < 93
        ? `<span class="fw-bold text-danger">${evento.nombre}</span>`
        : `<span class="fw-bold text-success">${evento.nombre}</span>`
    } 
        <br />
        ${evento.porcentaje}%</td> `; 
})

}

function mayorEvento(){

    let mayorevent = document.getElementById('mayorevento')

    let ordendeventos = arraycito.sort((a,b) => b.porcentajeEvento - a.porcentajeEvento)

    mayorevent.innerHTML += ` <th scope="col" class="text-center fw-bold text-success">${ordendeventos[0].nombreEvento} con ${ordendeventos[0].porcentajeEvento} % de asistencia</th> `
}

function menorEvento(){

    let menorevent = document.getElementById('menorevento')

    let ordendeventos = arraycito.sort((a,b) => a.porcentajeEvento - b.porcentajeEvento)

    menorevent.innerHTML += ` <th scope="col" class="text-center fw-bold text-danger">${ordendeventos[0].nombreEvento} con ${ordendeventos[0].porcentajeEvento} % de asistencia </th> `
}
