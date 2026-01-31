//fare una funzione che prende gli input del form e li mette. in un object che passiamo nel form - quindi in un json

const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const imageUrlInput = document.getElementById('imageUrl')
const priceInput = document.getElementById('price')
const tableBody = document.getElementById('results')
//console.log('TABLE BODY:', tableBody)
const form = document.getElementById('productForm') //devo capire bene dove mettere form.rest()
let products = []

const button = document.getElementById('buttonSave')
button.addEventListener('click', async (event) => {
    event.preventDefault()
    const body = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: priceInput.value
    }
    console.log('BODY:', body)
    const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/product',
        {
            method: 'POST',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3Njk1NDYzNzksImV4cCI6MTc3MDc1NTk3OX0.y7dVaEUe7mcxwu9dcmSj40bxIz8HU_QwkSOEnCG5NJY",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

    )
    console.log('RESPONSE:', response)

})
//funzione per eliminare un prodotto
async function deleteProduct(productId) {
    if (!confirm('Sei sicura di voler eliminare questo prodotto?')) return
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3Njk1NDYzNzksImV4cCI6MTc3MDc1NTk3OX0.y7dVaEUe7mcxwu9dcmSj40bxIz8HU_QwkSOEnCG5NJY",
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            alert('Prodotto eliminato!')
            getProducts() // qui aggiorno la tabella dopo aver cancellato un prodotto
        } else {
            alert('Errore durante l\'eliminazione')
        }
    } catch (error) {
        alert('Server not available')
    }
}
tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const productId = event.target.dataset.id
        deleteProduct(productId)
    }
})
//funzione con map-destruttrazione e creo gli elementi nel Dom
function arrayProducts(productsArray) {
    tableBody.innerHTML = productsArray.map(
        ({ _id, name, description, brand, imageUrl, price }) => `
        <tr>
            <td>${name}</td>
            <td class="ellipsis">${description}</td>
            <td>${brand}</td>
            <td class="ellipsis" title="${imageUrl}">${imageUrl}</td>
            <td>${price} €</td>
            <td class="text-center">
                <a href="detailsbackoffice.html?id=${_id}" class="btn btn-light btn-sm mx-2">Details</a>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${_id}">
                    Delete
                </button>
            </td>
        </tr>
    `
    ).join('')

}

async function getProducts() {
    const response = await fetch('https://striveschool-api.herokuapp.com/api/product',
        {
            method: 'GET',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3Njk1NDYzNzksImV4cCI6MTc3MDc1NTk3OX0.y7dVaEUe7mcxwu9dcmSj40bxIz8HU_QwkSOEnCG5NJY",
                'Content-Type': 'application/json'
            }
        }
    )

    products = await response.json()
    //console.log(productsTable)

    tableBody.innerHTML = '' //svuoto il contenuto del tbody ogni volta che la pagina si carica 
    arrayProducts(products)

}


getProducts()
