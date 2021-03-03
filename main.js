class App {
  static getCountries() {
    fetch("https://covid19.mathdro.id/api/countries")
      .then((res) => res.json())
      .then((data) => App.showList(data));
  }

  static showList(data) {
    const countryList = document.querySelector(".select_country");
    var selectMenu = document.createElement("select");
    selectMenu.setAttribute("class", "form-control");
    var options = "<option>Select country</option> ";
    data.countries.forEach((element) => {
      options += `<option value = '${element.name}'>${element.name}</option>`;
    });
    // console.log(options)
    selectMenu.innerHTML = options;
    countryList.appendChild(selectMenu);
    selectMenu.addEventListener("click", (e) => {
      App.showDetails(e.target.value);
    });
  }

  static showDetails(country) {
    const confirmedEle = document.querySelector(".total");
    const recoveredEle = document.querySelector(".recoverd");
    const deathsEle = document.querySelector(".deaths");
    var confirmedData = document.querySelector("#confirmedData");
    var recoveredData = document.querySelector("#recoveredData");
    var deathsData = document.querySelector("#deathsData");
    if (country != "Select country") {
      fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        .then((res) => res.json())
        .then((data) => {
          const confirmedText = document.createTextNode(data.confirmed.value);
          confirmedData.innerHTML = `Confirmed <br> ${confirmedText.nodeValue}`
          // conH2.appendChild(confirmedText)
          // confirmedEle.innerHTML = conH2.value
          const recoverdText = document.createTextNode(data.recovered.value);
          recoveredData.innerHTML = `Recovered <br> ${recoverdText.nodeValue}`

          const deathsText = document.createTextNode(data.deaths.value);
          deathsData.innerHTML = `Deaths <br> ${deathsText.nodeValue}`;
        });
    }
  }
}

document.addEventListener("DOMContentLoaded", App.getCountries);
