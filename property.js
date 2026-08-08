const params = new URLSearchParams(window.location.search);

const propertyId = Number(params.get("id"));

const property = properties.find(item => item.id === propertyId);

const container = document.getElementById("propertyDetails");

if (!property) {

    container.innerHTML = `
        <h2>Property Not Found</h2>
        <p>Sorry, we couldn't find this property.</p>
        <a href="index.html">Return Home</a>
    `;

} else {

    container.innerHTML = `

        <div class="property-detail-image">

            <img
                src="${property.image}"
                alt="${property.title}"
            >

        </div>

        <div class="property-detail-content">

            <span class="property-status">
                ${property.status === "sale" ? "FOR SALE" : "FOR RENT"}
            </span>

            <h1>${property.title}</h1>

            <p class="property-detail-location">

                <i class="fa-solid fa-location-dot"></i>

                ${property.address}

            </p>

            <h2>${property.priceDisplay}</h2>

            <div class="property-detail-stats">

                <span>
                    <i class="fa-solid fa-bed"></i>
                    ${property.bedrooms} Bedrooms
                </span>

                <span>
                    <i class="fa-solid fa-bath"></i>
                    ${property.bathrooms} Bathrooms
                </span>

                <span>
                    <i class="fa-solid fa-car"></i>
                    ${property.garage} Garage
                </span>

                <span>
                    <i class="fa-solid fa-ruler-combined"></i>
                    ${property.area}
                </span>

            </div>

            <p class="property-description">
                ${property.description}
            </p>

            <button class="contact-agent-btn">
                Contact Agent
            </button>

        </div>

    `;

}
