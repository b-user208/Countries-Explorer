
let country = "Ivory Coast", official = "Republic of Côte d'Ivoire", capital = "Yamoussoukro", population = "31 719 275", flag = "https://flagcdn.com/ci.svg", 
region = "Africa", currency = "West African CFA franc", languages = ["French"], independent = true, area = "322 463", exist = 0
        let data;
        let input = document.getElementById("user-country");
        let btn = document.getElementById("btn");
        let output = document.querySelector(".output");

        function displayInfos() {
            output.innerHTML = `
            <div class="country">
                <img src="${flag}" alt = "${country} flag">
                <div class="name-official">
                <h1>${country}</h1>
                <h3>${official}</h3>
                </div>
            </div>
            <div class="country-infos">
            <div class="info">
                <span>Capital</span><br>
                <span title="${capital}">${capital}</span>
                </div>
                <div class="info">
                <span>Population</span><br>
                <span title="${population}">${population}</span>
                </div>
                <div class="info">
                <span>Region</span><br>
                <span title="${region}">${region}</span>
                </div>
                <div class="info">
                <span>Currency</span><br>
                <span title="${currency}">${currency}</span>
                </div>
                <div class="info">
                <span>Independent</span><br>
                <span>${(independent === true) ? "Yes" : "No"}</span>
                </div>
                <div class="info">
                <span>Area</span><br>
                <span title="${area} km²">${area} km²</span>
                </div>
                <div class="info">
                <span>Languages</span><br>
                <span>${languages.join(" - ")}</span>
                </div>
            </div>
        `;
        }

        function displayError() {
            output.innerHTML = ` 
            <div class="error">
                <img src="img/location-not-found.svg" alt="location not found" class="img-error">
                <h1 class="title-error">Aucun pays trouvé</h1>
                <p class="text-error">Nous n'avons trouvé aucun pays correspondant à votre recherche "<strong>${country}</strong>". Veuillez vérifier l'orthographe ou essayer une requête géographique différente.</p>
            </div>
                `;
        }

        displayInfos()

    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,currencies,languages,independent,area")
    .then(r => r.json())
    .then(pays => {
        data = pays;
        console.log(data);
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") 
                btn.click();
    });
    btn.addEventListener("click", () => {
        country = input.value.toLowerCase().trim();
        input.value = "";

        for(let i = 0; i < data.length; i++) {
            if(data[i].name.common.toLowerCase() === country) {
                country = data[i].name.common;
                official = data[i].name.official;
                capital = data[i].capital[0]
                currency = Object.values(data[i].currencies)[0].name
                flag = data[i].flags.svg
                languages = Object.values(data[i].languages)
                population = data[i].population.toLocaleString();
                region = data[i].region
                independent = data[i].independent;
                area = data[i].area.toLocaleString();
                exist = 1;
                break;
            } else 
                    exist = 0;
        }
        if(exist) 
            displayInfos();
        else
            displayError();
    });