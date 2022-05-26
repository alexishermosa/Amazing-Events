let cardDate = data.fechaActual
const dataArray = data.eventos;
const contenedorCard = document.getElementById("tarjetas");
let textSearch = ""
let keepChecks = [] //variable vacia donde voy a contener los checks comparados con los filtros aplicados 
let arrayPast = data.eventos.filter(e => cardDate > e.date)
dataArray.map((evento, id) => evento.id = ++id) //Le agrego un ID a los objetos del array original, esto sirve para la pagina del boton "ver mas".



function DinamicCards(array) {
    contenedorCard.innerHTML = "" //inicializamos la variable VACIA para que se limpien las cartas, porque sino al aplicar los filtros solo se sumarian a las que ya estaban al inicio.
    if (keepChecks.length !== 0) {
        for (let i = 0; i < array.length; i++) {
            if (cardDate > array[i].date)
                contenedorCard.innerHTML += `
        <div  class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
            <div class="card w-100 card-border mb-5  h-card">
                <img src="${array[i].image}" class="card-img-top img-h" alt="..." />
                <div class="card-h card-body d-flex flex-column justify-content-between ">
                 <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text">
                 ${array[i].description}
                 </p>
                <p>Price: $ ${array[i].price}</p>
                <a href="/details.html?id=${array[i].id}" class="btn btn-primary">View more</a>
                </div>
            </div>
        </div>`;
        }
    } else {
        contenedorCard.innerHTML = `<p class="display-4"><i class="bi bi-calendar-x"></i> No results found. Try again</p></p>`


    }
}

// DinamicCards(dataArray);


//FILTROS IMPRESOS (incorporar filtros check)
let containerCheckbox = document.getElementById("checkboxes")
const categoryCheckbox = arrayPast.map(eventos => eventos.category) //puedo ponerle cualquier nombre a los parametros no necesariemnte "evento", podria llamarlo pepito y funcionaria igual.
const categorySet = new Set(categoryCheckbox) //esta variable solo sirve para ejecutar el new Set, no la puedo usar, no es un array.
//new Set elimina los elementos repetidos
const categoryBoxes = [...categorySet] // recien ahora en esta variable puedo usar los elementos del array.

function ImprCheckboxes() {
    templateCheckbox = ""
    categoryBoxes.forEach(category => { //Recorro el array categoryBoxes
        templateCheckbox += `<label class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" value="${category}" />
        ${category}
        </label>` //creo el template con los elementos recorridos con el forEach.
    })
    containerCheckbox.innerHTML = templateCheckbox //Imprimo en el HTML los checkboxes
}
ImprCheckboxes()


//HACER FUNCIONAR LOS FILTROS (que filtre, hasta ahora solo esta impreso)(hay que escuchar eventos)

let checkSelected = document.querySelectorAll(".form-check-input")
console.log(checkSelected)
//Capturo los checkboxes impresos en el HTML
let organizerCheck = [] //variable donde guardare los checkboxes seleccionados

//Recorremos los checkboxes impresos y lo escuchamos con el eventlistener
checkSelected.forEach(check => check.addEventListener("change", (evento => {
    // console.log(evento)
    let isChecked = evento.target.checked //variable donde guardo si esta chek o no 
    //condicion para verficar si el check es true o false
    console.log(isChecked)
    if (isChecked) { //si esta checkeado los empujo y guardo en la variable
        organizerCheck.push(evento.target.value)
        console.log(organizerCheck)
        //ACA TIENE QUE IR LA FUNCION DEL FILTRADO PERO LA LLAMO AL FINAL

    } else { //sino esta checkeado lo filtro, para que se borren los descheckeados
        organizerCheck = organizerCheck.filter(notChecked => notChecked !== evento.target.value)
        console.log(organizerCheck)
        //ACA TENDRIA QUE IR LA MISMA FUNCION DE FILTRADO PERO LA LLAMO AL FINAL

    }
    DisplayFilter()
})))



//FUNCION DE FILTRADO 
function DisplayFilter() {

    keepChecks = []
    if (organizerCheck.length > 0 && textSearch === "") { //condicion para que se ejecute el if
        //recorremos la variable y mapeamos
        organizerCheck.map(recorrer => {
            keepChecks.push(...arrayPast.filter(filtrado => filtrado.category === recorrer)) //Hacemos un push de las categorias en la variable, pero filtrando las repetidas 
        })
    } else if (organizerCheck.length === 0 && textSearch !== "") {
        keepChecks.push(...arrayPast.filter(e => e.name.toLowerCase().startsWith(textSearch.trim().toLowerCase())))
        //Esto se podria escribir solo con el else sin ninguna condicion
    } else if (organizerCheck.length > 0 && textSearch !== "") {
        organizerCheck.map(recorrer => {
            keepChecks.push(...arrayPast
                .filter(filtrado => filtrado.category === recorrer)
                .filter(e => e.name.toLowerCase().startsWith(textSearch)))
        })
    } else {
        keepChecks.push(...arrayPast) //Sino aplica el filtro, impreme todas las cards con la info del Array
    }
    DinamicCards(keepChecks)
}
DisplayFilter()

//CAPTURAR EL VALOR DEL INPUT EN EL SEARCH 

let inputSearch = document.querySelector("input[type=search]") //traigo el search desde el HTML 
inputSearch.addEventListener("keyup", (event) => {
    textSearch = ""
    textSearch = event.target.value


    // console.log(textSearch)
    //ACA TIENE QUE IR LA FUNCION DE FILTRADO
    DisplayFilter()
    return textSearch
})
//Ahora en nuestra funcion de filtrado tenemos que agregarle los condicionales para que funcionen en conjunto con los checkboxes. 