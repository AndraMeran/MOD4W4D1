//1 - usare bootrap
//2- paggina di backoffice con la lista di prodotti con tabella o card - su cui per ogni elemento abbiamo un pulsante che ci porta alla pagina di dettaglio 
//3- sopra la tabella o sopra le card fare il form per l'inserimento di un nuovo prodotto

//pagina di dettaglio del backoffice
//4- url search params per pagina di dettglio che deve avere il form  per modificare il prodotto (ricordarsi di fare la fetch per i dettagli per popolare il form)
// 5- ogni riga della tabella deve avere il pulsante della cancellazione e dettaglio che ci permette di editare 

//
// 6 - fare una pagina di e-commerce stile card con la lista dei prodotti 
// 7 - cliccando sui dettagli si apre la pagina con più dettagli diversa dalla pagina di backoffice 

//  in totale 4 pagine 

//extra 
// - gestione degli errore con gli utenti  - se da errore far uscire un alert tipo prodotto non inserti opure se andato a buon fine alert prodotto inserito 

// inserire uno spinner 
// gestione della ricerca sia frontend che backend 

const row = document.getElementById('cardsRow')
async function getProducts() {
    const response = await fetch('https://striveschool-api.herokuapp.com/api/product',
        {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3NzEyNjkyODQsImV4cCI6MTc3MjQ3ODg4NH0.0H3K1nWn3jZy_Y8YfbNMfjtKwMoqUgaDKsd1IV05xgQ",
                'Content-Type': 'application/json'
            }
        }

    )
    const data = await response.json()
    console.log(data)
    arrayProducts(data)

}
getProducts()

function arrayProducts(productsArray) {
    const cardProducts = productsArray.map(product => `
    <div class="col">
            <div class="card h-100">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text ellipsis">${product.description}</p>
                    <p class="card-text">${product.brand}</p>
                    <p class="card-text fw-bold">${product.price} €</p>
                    <a href="details.html?id=${product._id}" class="btn btn-rosa mt-auto">
                        Details
                    </a>
                    <a href="#" class="btn btn-dark my-1">
                        Add to cart
                    </a>
                </div>
            </div>
        </div>

    `)
    row.innerHTML = cardProducts.join('')
}
