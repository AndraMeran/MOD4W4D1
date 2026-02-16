//fare una funzione per richiamare api con la fetch

const params = new URLSearchParams(location.search)
const productId = params.get('id')
const moreCards = document.getElementById('more-cards')
const moreDetails = document.getElementById('more-details')

async function getProductsDetails() {

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTc5MjI4YmY1Y2I1ZDAwMTU0ZjQzNjQiLCJpYXQiOjE3NzEyNjkyODQsImV4cCI6MTc3MjQ3ODg4NH0.0H3K1nWn3jZy_Y8YfbNMfjtKwMoqUgaDKsd1IV05xgQ",
        'Content-Type': 'application/json'
      }
    }
  )

  const product = await response.json()


  moreCards.innerHTML = `
    <div class="card shadow-sm">
    <div class="card-body p-0">
<div id="carouselExampleFade" class="carousel slide carousel-fade">
  <div class="carousel-inner">
    <div class="carousel-item active">
     <img src="${product.imageUrl}" class="d-block w-100" alt="${product.name}">
    </div>
    <div class="carousel-item">
      <img src="${product.imageUrl}" class="d-block w-100" alt="${product.name}">
    </div>
    <div class="carousel-item">
   <img src="${product.imageUrl}" class="d-block w-100" alt="${product.name}">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
 </div>
 </div>
<div class="d-flex justify-content-center gap-2 mt-3">
    <img src="${product.imageUrl}" class="thumb-img active">
    <img src="${product.imageUrl}" class="thumb-img">
    <img src="${product.imageUrl}" class="thumb-img">
</div>
        `

  moreDetails.innerHTML = `
<div class="container">
  <h1 class="text-center text-decoration-underline my-1">${product.name}</h1>
  <p class="text-center fs-5 mb-2">${product.brand}</p>
  <p class="mb-2">${product.description}</p>
  <ul class="list-unstyled">
  <li>SKU:</strong> 123456</li>
  <li>Material:</strong> Silver</li>
  <li>Weight:</strong> 150g</li>
</ul>
  <p class="fw-bold mb-3">${product.price} €</p>

  <div class="stars d-flex align-items-center justify-content-start gap-2">
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <span>2.5</span>
    <span class="total">(1,500)</span>
  </div>

  <span class="badge bg-secondary my-3">In Stock</span>
  <span class="badge bg-danger">-20% OFF</span>

  <div class="info-extra my-3">
<p><a href="#" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">More info about this product</a></p>
  </div>

  <div class="add my-3">
  <button class="btn btn-dark me-2">Add to Cart</button>
  <button class="btn btn-outline-secondary"><i class="bi bi-heart"></i></button>
  </div>
</div>

    `
}

getProductsDetails()

