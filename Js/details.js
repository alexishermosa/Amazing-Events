let dataArray;
const contenedorCard = document.getElementById("tarjetas");

async function getDataFromApi() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(respuesta => respuesta.json())
    .then(json => dataApi = json)
  console.log(dataApi)
  let dataArray = dataApi.events;

  function getData() {

    console.log(dataArray)
    let id = location.search.split("?id=")[1]
    // console.log(location)
    // console.log(location.search)
    // console.log(id)
    let evento = dataArray.find(evento => evento._id == id)
    // console.log(evento)

    contenedorCard.innerHTML = `<div class="col d-flex justify-content-md-center">
         <div class="card card-border-detail h-100 justify-content-center">
          <div class="row g-0">
            <div class="col-12 col-md-5">
                <img src="${evento.image}" class="img-fluid w-100 rounded-start img-h" alt="..." />
              </div>
               <div class="col-12 col-md-7 h-100">
                <div class="card-body">
                  <h5 class="card-title text-center">${evento.name}</h5>
                  <p class="card-text text-center">
                  ${evento.date}
                  </p>
                  <p class="card-text">
                  ${evento.description}
                  </p>
                  <p class="card-text">
                  Place: ${evento.place}
                  </p>
                  <p class="card-text">
                  <p>Price: $ ${evento.price}</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>`
  }

  getData()
}
getDataFromApi()