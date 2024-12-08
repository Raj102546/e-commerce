fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const discountProducts = document.querySelector('.discount-items');
        const productsContainer = document.getElementById('hero-products');
        const apparelCategories = ['men\'s clothing', 'women\'s clothing']; // Clothing categories

        // Function to display filtered products
        function displayProducts(filteredProducts) {
          productsContainer.innerHTML = ''; // Clear existing content
          filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = "product-item"; // Individual product styling
            productElement.innerHTML = `
              <img class = "product-img" src="${product.image}" alt="${product.title}" width="200">
              <h2 class = "product-title">${product.title}</h2>
              <div class= "product-info"><p class = "product-price">Price: $${product.price}</p>
              <p class = "product-rating">Rating: ${product.rating.rate}</p> </div>
            `;
            productsContainer.appendChild(productElement);
          });
        }

        //Filter discounted items
        const productsWithDiscounts = data.map(product => {
          const discountPercentage = Math.floor(Math.random() * 30) + 10; // Random 10-30% discount
          product.discountedPrice = (product.price * (1 - discountPercentage / 100)).toFixed(2); // Calculate discounted price
          product.discountPercentage = discountPercentage; // Store discount percentage
          return product;
        });

        //Display discounted items 
        function displayDiscountItems(filteredProducts){
          discountProducts.innerHTML = "";
          filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = "product-item";
    
            productElement.innerHTML = `
              <img class = "product-img" src="${product.image}" alt="${product.title}" width="200">
              <h2 class = "product-title">${product.title}</h2>
              <p>Original Price: <s>$${product.price}</s></p>
              <p>Discounted Price: $${product.discountedPrice}</p>
              <p>Discount: ${product.discountPercentage}%</p>
              <p>Rating: ${product.rating.rate}</p>
            `;
    
            discountProducts.appendChild(productElement);
          });
      }

      function filterDiscountedItems() {
        const filteredData = productsWithDiscounts.filter(product => product.discountPercentage >= 20); // Example: Filter items with at least 20% discount
        displayDiscountItems(filteredData);
      }
  
      filterDiscountedItems(); // Call the filter function

        // Filter items based on categories and rating
        function filterItems() {
          const filteredData = data
            .filter(product => apparelCategories.includes(product.category)) // Filter by clothing categories
            .filter(product => product.rating.rate >= 3.5); // Filter by rating
          displayProducts(filteredData);
        }

        filterItems(); // Call the filter function to display products initially
      })
      .catch(error => console.error('Error fetching data:', error));

      function scrollToMain(){
        let mainSlide = document.querySelector(".main-slide");
        mainSlide.scrollIntoView({ behavior: "smooth" });
      }
