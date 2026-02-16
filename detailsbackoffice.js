// url search params per pagina di dettglio che deve avere il form  per modificare il prodotto (ricordarsi di fare la fetch per i dettagli per popolare il form)


const params = new URLSearchParams(location.search)
const productId = params.get('id')

const leftCard = document.getElementById('left-card')
const editForm = document.getElementById('edit-form')
const newForm = document.getElementById('editForm')

async function getProductsDetails() {
    try {
        const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${productId}`,
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3NzEyNjkyODQsImV4cCI6MTc3MjQ3ODg4NH0.0H3K1nWn3jZy_Y8YfbNMfjtKwMoqUgaDKsd1IV05xgQ",
                    'Content-Type': 'application/json'
                }
            }
        )

        if (!response.ok) {
            console.error('Error product NOT Found:', response.status)
            return
        }

        const product = await response.json()


        leftCard.innerHTML = `
            <div class="card shadow-md h-100">
                <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.brand}</p>
                    <p class="card-text fw-bold">${product.price} €</p>
                </div>
            </div>
        `


        editForm.innerHTML = `
            <form id="editForm">
                <div class="mb-3">
                    <label>Name</label>
                    <input id="name" class="form-control" value="${product.name}">
                </div>
                <div class="mb-3">
                    <label>Description</label>
                    <input id="description" class="form-control" value="${product.description}">
                </div>
                
                 <div class="mb-3">
                    <label>ImageUrl</label>
                    <input id="imageUrl" class="form-control" value="${product.imageUrl}">
                </div>
                <div class="mb-3">
                    <label>Brand</label>
                    <input id="brand" class="form-control" value="${product.brand}">
                </div>
                 <div class="mb-3">
                    <label>Price</label>
                    <input id="price" class="form-control" value="${product.price}">
                </div>

                <button class="btn btn-success">Save Edit</button>
            </form>
        `

        const newForm = document.getElementById('editForm')
        newForm.addEventListener('submit', function (event) {
            event.preventDefault()
            saveEdits()
        })


    } catch (error) {
        console.error(error)
    }
}

getProductsDetails()



async function saveEdits() {
    const newEditCard = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: document.getElementById('price').value
    }

    try {
        const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${productId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3Njk1NDYzNzksImV4cCI6MTc3MDc1NTk3OX0.y7dVaEUe7mcxwu9dcmSj40bxIz8HU_QwkSOEnCG5NJY",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEditCard)
            }
        )

        if (!response.ok) {
            console.error('Product not save')
            return
        }

        alert('Product successfully modified!')
        getProductsDetails()
    } catch (error) {
        console.error('Error', error)
    }
}
