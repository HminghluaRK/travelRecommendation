const searched = document.getElementById("input");
const searchbtn = document.getElementById("search");
const clearbtn = document.getElementById("clear");
const result = document.getElementById("result");

clearbtn.addEventListener("click", () => {
    searched.value = "";
    result.innerHTML = "";
});

searchbtn.addEventListener("click", () => {
    const userText = searched.value.trim().toLowerCase();
    result.innerHTML = "";

    fetch("travel_recommendation_api.json")
        .then(res => res.json())
        .then(data => {

            if (userText === "countries" || userText === "country") {
                data.countries.forEach(country => displayCountry(country));
                return;
            }
            if (userText === "temples" || userText === "temple") {
                data.temples.forEach(temple => displayTemple(temple));
                return;
            }
            if (userText === "beaches" || userText === "beach") {
                data.beaches.forEach(beach => displayBeach(beach));
                return;
            }
            const country = data.countries.find(c =>
                c.name.toLowerCase().includes(userText)
            );

            if (country) return displayCountry(country);

            const temple = data.temples.find(t =>
                t.name.toLowerCase().includes(userText) 
            );

            if (temple) return displayTemple(temple);

            const beach = data.beaches.find(b =>
                b.name.toLowerCase().includes(userText) 
            );

            if (beach) return displayBeach(beach);

            result.innerHTML = "<p>No matching result found.</p>";

        })
        .catch(err => {
            console.error(err);
            result.innerHTML = "<p>Error loading data.</p>";
        });
});


function displayCountry(country) {
    result.innerHTML += `
        <h2>${country.name}</h2>
        ${country.cities.map(city => `
            <div class="card">
                <img src="${city.imageUrl}" alt="">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
            </div>
        `).join("")}
    `;
}
function displayTemple(temple) {
    result.innerHTML += `
        <h2>${temple.name}</h2>
        <img src="${temple.imageUrl}" alt="">
        <p>${temple.description}</p>
    `;
}
function displayBeach(beach) {
    result.innerHTML += `
        <h2>${beach.name}</h2>
        <img src="${beach.imageUrl}" alt="">
        <p>${beach.description}</p>
    `;
}
