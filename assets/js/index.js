import { getAllProduct, findUserWishlist, getUserCartByUserID, deleteUserWishlist, deleteUserCart, getProductByID, getProductByCategory, addUserWishlist } from './fetch-api.js';//import các hàm getAjax và postAjax từ file api-ajax.js
$(document).ready(function () {

    getAllProduct().done(function (response) {
        let placeholder = document.querySelector("#product-table"); //trỏ đến id của table
        let out = "";
        for (let output of response.data) {
            // duyệt và tạo ra các button để lọc sản phẩm theo category
            out += `<div class="product-default-single-item product-color--golden swiper-slide">
                                        <div class="image-box" productId="${output.id}">
                                            <a href="product-details-default.html" class="image-link">
                                                <img src="${output.image}" alt="">
                                            </a>
                                            <div class="tag">
                                                <span>sale</span>
                                            </div>
                                            <div class="action-link">
                                                <div class="action-link-left">
                                                    <a href="#" data-bs-toggle="modal"
                                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                                </div>
                                                <div class="action-link-right">
                                                    <a href="#" data-bs-toggle="modal"
                                                        data-bs-target="#modalQuickview"><i
                                                            class="icon-magnifier"></i></a>
                                                    <a href="#"><i class="icon-heart"></i></a>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <div class="content-left">
                                                <h6 class="title"><a href="product-details-default.html">${output.name}</a></h6>
                                                <ul class="review-star">
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="empty"><i class="ion-android-star"></i></li>
                                                </ul>
                                            </div>
                                            <div class="content-right">
                                                <span class="price">$${output.priceMin} - $${output.priceMax}</span>
                                            </div>

                                        </div>
                                    </div>
            `;
        }
        placeholder.innerHTML = out; // add the generated HTML to the product table
    });

    getProductByCategory().done(function (response) {
        let placeholder = document.querySelector("#best-seller"); //trỏ đến id của table
        let out = "";
        console.log(response.data);
        for (let output of response.data) {
            // duyệt và tạo ra các button để lọc sản phẩm theo category
            out += `<div class="product-default-single-item product-color--golden swiper-slide">
                                        <div class="image-box">
                                            <a href="product-details-default.html" class="image-link">
                                                <img src="${output.image}" alt="">
                                            </a>
                                            <div class="action-link">
                                                <div class="action-link-left">
                                                    <a href="#" data-bs-toggle="modal"
                                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                                </div>
                                                <div class="action-link-right">
                                                    <a href="#" data-bs-toggle="modal"
                                                        data-bs-target="#modalQuickview"><i
                                                            class="icon-magnifier"></i></a>
                                                    <a href="wishlist.html"><i class="icon-heart"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <div class="content-left">
                                                <h6 class="title"><a href="product-details-default.html">${output.name}</a></h6>
                                                <ul class="review-star">
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="fill"><i class="ion-android-star"></i></li>
                                                    <li class="empty"><i class="ion-android-star"></i></li>
                                                </ul>
                                            </div>
                                            <div class="content-right">
                                                <span class="price">$${output.priceMin} - $${output.priceMax}</span>
                                            </div>

                                        </div>
                                    </div>
            `;
        }
        placeholder.innerHTML = out; // add the generated HTML to the product table
    });

    document.querySelector('#show-wishlist-btn').addEventListener('click', function (event) {
        event.preventDefault();
        findUserWishlist().done(function (response) {
            let placeholder = document.querySelector("#wishlist-holder");
            let out = "";
            let data = Array.isArray(response.data) ? response.data : [response.data];
            if (data.length == 0) {
                out = `<li class="offcanvas-wishlist-item-single">
                    <p class="offcanvas-wishlist-item-empty">No items found in the wishlist.</p>`;
                placeholder.innerHTML = out;
            } else {
                for (let output of data) {
                    out += `<li class="offcanvas-wishlist-item-single">
                        <div class="offcanvas-wishlist-item-block">
                            <a href="#" class="offcanvas-wishlist-item-image-link">
                                <img src="${output.image}" alt=""
                                    class="offcanvas-wishlist-image">
                            </a>
                            <div class="offcanvas-wishlist-item-content">
                                <a href="#" class="offcanvas-wishlist-item-link">${output.name}</a>
                                <div class="offcanvas-wishlist-item-details">
                                    <span class="offcanvas-wishlist-item-details-quantity">$${output.priceMin} - $${output.priceMin} </span>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-wishlist-item-delete text-right" wishlist-id="${output.id}">
                            <a href="#" class="offcanvas-wishlist-item-delete"><i class="fa fa-trash-o"></i></a>
                        </div>
                    </li>`;
                }
                placeholder.innerHTML = out;

                // Attach the event listener here, after the wishlist items are added to the DOM
                document.querySelectorAll('.offcanvas-wishlist-item-delete').forEach(function (deleteButton) {
                    deleteButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        let productId = event.currentTarget.getAttribute('wishlist-id');
                        console.log(productId);
                        deleteUserWishlist(productId).done(function (response) {
                            console.log(response.data);
                            if (response.data) {
                                event.target.closest('.offcanvas-wishlist-item-single').remove();
                            } else {
                                swal("Failed!", "Could not delete the item from the wishlist.", "warning");
                            }
                        });
                    });
                });
            }
        });
    });

    // Attach an event listener to the element with ID 'show-cart-btn'
    document.querySelector('#show-cart-btn').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the button click

        // Call the function to get the user cart by user ID
        getUserCartByUserID().done(function (response) {
            let placeholder = document.querySelector("#cart-holder"); // Select the cart holder element
            let out = ""; // Initialize an empty string to build the HTML output

            // Ensure the response data is treated as an array
            let data = Array.isArray(response.data) ? response.data : [response.data];

            // Check if the cart is empty
            if (data.length == 0) {
                out = `<li class="offcanvas-wishlist-item-single">
                <p class="offcanvas-wishlist-item-empty">No items found in the cart.</p>
            </li>`;
                placeholder.innerHTML = out; // Display the message in the cart holder
            } else {
                // Loop through each item in the data array
                for (let output of data) {
                    // Append the HTML structure for each cart item to the output string
                    out += `<li class="offcanvas-wishlist-item-single">
                    <div class="offcanvas-wishlist-item-block">
                        <a href="#" class="offcanvas-wishlist-item-image-link">
                            <img src="${output.image}" alt=""
                                class="offcanvas-wishlist-image">
                        </a>
                        <div class="offcanvas-wishlist-item-content">
                            <a href="#" class="offcanvas-wishlist-item-link">${output.name}</a>
                            <div class="offcanvas-wishlist-item-details">
                                <span class="offcanvas-wishlist-item-details-quantity">${output.quantity} x $${output.price} </span>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-wishlist-item-delete text-right" cart-id="${output.id}">
                        <a href="#" class="offcanvas-wishlist-item-delete"><i class="fa fa-trash-o"></i></a>
                    </div>
                </li>`;
                }
                placeholder.innerHTML = out; // Insert the built HTML into the cart-holder element

                // Attach the event listener for the delete buttons after the cart items are added to the DOM
                document.querySelectorAll('.offcanvas-wishlist-item-delete').forEach(function (deleteButton) {
                    deleteButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        let productId = event.currentTarget.getAttribute('cart-id'); // Get the cart item ID
                        console.log(productId);
                        deleteUserCart(productId).done(function (response) { // Call function to delete cart item
                            console.log(response.data);
                            if (response.data) {
                                event.target.closest('.offcanvas-wishlist-item-single').remove(); // Remove the item from the DOM
                            } else {
                                swal("Failed!", "Could not delete the item from the cart.", "warning");
                            }
                        });
                    });
                });
            }
        });
    });

    document.querySelector('body').addEventListener('click', event => {
        if (event.target.matches('.icon-heart')) {
            event.preventDefault();
            console.log("Clicked on the heart icon.");
            const productId = event.target.closest('.image-box').getAttribute('productId');
            addUserWishlist(productId).then(response => {
                response.data ? swal("Success!","Item added to wishlist.", "success") : swal("Could not add the item to the wishlist.");
            });
        }
    });
});