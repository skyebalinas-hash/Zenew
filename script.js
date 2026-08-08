/* ==========================================
   ZEGGO
   SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const propertyContainer = document.getElementById("featuredProperties");

    if (!propertyContainer || typeof properties === "undefined") {
        return;
    }

    // Detect current page
    const currentPage = window.location.pathname.split("/").pop();

    // Homepage = only 3 featured listings
    if (currentPage === "index.html" || currentPage === "") {

        displayProperties(properties.slice(0, 3));

    }

    // Properties page = show everything
    else if (currentPage === "properties.html") {

        displayProperties(properties);

    }

    // Other pages = don't display anything
    else {

        return;

    }

    // Search Button
    const searchButton = document.getElementById("searchBtn");

    if (searchButton) {
        searchButton.addEventListener("click", filterProperties);
    }

    // Enter Key Search
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                filterProperties();
            }

        });

    }

});


/* ==========================================
   DISPLAY PROPERTY CARDS
========================================== */

function displayProperties(propertyList) {

    const container = document.getElementById("featuredProperties");

    if (!container) return;

    container.innerHTML = "";

    propertyList.forEach(property => {

        container.innerHTML += `

        <div class="property-card">

            <div class="property-image">

                <img src="${property.image}" alt="${property.title}">

                <span class="property-status">
                    ${property.status === "sale" ? "FOR SALE" : "FOR RENT"}
                </span>

                <button class="favorite-btn" type="button">

                    <i class="fa-regular fa-heart"></i>

                </button>

            </div>

            <div class="property-content">

                <div class="property-price">
                    ${property.priceDisplay}
                </div>

                <h3 class="property-title">
                    ${property.title}
                </h3>

                <p class="property-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${property.address}

                </p>

                <div class="property-details">

                    <span>
                        <i class="fa-solid fa-bed"></i>
                        ${property.bedrooms}
                    </span>

                    <span>
                        <i class="fa-solid fa-bath"></i>
                        ${property.bathrooms}
                    </span>

                    <span>
                        <i class="fa-solid fa-car"></i>
                        ${property.garage}
                    </span>

                    <span>
                        <i class="fa-solid fa-ruler-combined"></i>
                        ${property.area}
                    </span>

                </div>

                <a href="property.html?id=${property.id}" class="view-details">
                    View Details
                </a>

            </div>

        </div>

        `;

    });

}


/* ==========================================
   SEARCH & FILTER
========================================== */

function filterProperties() {

    const keyword =
        document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

    const status =
        document.getElementById("statusFilter")?.value || "all";

    const type =
        document.getElementById("typeFilter")?.value || "all";

    const beds =
        document.getElementById("bedFilter")?.value || "all";

    const price =
        document.getElementById("priceFilter")?.value || "all";


    const filtered = properties.filter(property => {

        const matchesKeyword =

            property.title.toLowerCase().includes(keyword) ||

            property.city.toLowerCase().includes(keyword) ||

            property.address.toLowerCase().includes(keyword);


        const matchesStatus =

            status === "all" ||

            property.status === status;


        const matchesType =

            type === "all" ||

            property.type === type;


        const matchesBeds =

            beds === "all" ||

            property.bedrooms >= Number(beds);


        let matchesPrice = true;

        if (price !== "all") {

            const maxPrice = Number(price);

            matchesPrice = property.price <= maxPrice;

        }


        return (

            matchesKeyword &&

            matchesStatus &&

            matchesType &&

            matchesBeds &&

            matchesPrice

        );

    });


    displayProperties(filtered);

}


/* ==========================================
   SEARCH SUGGESTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    const suggestionsBox =
        document.getElementById("searchSuggestions");


    if (
        !searchInput ||
        !suggestionsBox ||
        typeof properties === "undefined"
    ) {
        return;
    }


    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value.trim().toLowerCase();


        suggestionsBox.innerHTML = "";


        if (keyword.length < 2) {

            suggestionsBox.style.display = "none";

            return;

        }


        const suggestions = [];


        properties.forEach(property => {

            [
                property.city,
                property.address,
                property.title
            ].forEach(item => {

                if (
                    item.toLowerCase().includes(keyword) &&
                    !suggestions.includes(item)
                ) {

                    suggestions.push(item);

                }

            });

        });


        if (suggestions.length === 0) {

            suggestionsBox.style.display = "none";

            return;

        }


        suggestions.slice(0, 6).forEach(item => {

            const div = document.createElement("div");

            div.className = "search-suggestion";


            div.innerHTML = `

                <i class="fa-solid fa-location-dot"></i>

                ${item}

            `;


            div.addEventListener("click", () => {

                searchInput.value = item;

                suggestionsBox.style.display = "none";

            });


            suggestionsBox.appendChild(div);

        });


        suggestionsBox.style.display = "block";

    });


    document.addEventListener("click", (event) => {

        if (!event.target.closest(".search-container")) {

            suggestionsBox.style.display = "none";

        }

    });

});
