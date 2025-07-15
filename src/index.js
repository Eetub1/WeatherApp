import './style.css';

let cityData
let tempInF
let tempInC
let isFahrenheit = true

const cityName = document.getElementById("cityName")
const temp = document.getElementById("temp")
const conditions = document.getElementById("conditions")

const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", (event) => fetchData(event))
const form = document.forms.askData

const toggleBtn = document.getElementById("toggle")
toggleBtn.addEventListener("click", (event) => toggleScale(event))
toggleBtn.style.display = "none"
toggleBtn.textContent = "To Celsius"

function toggleScale(event) {
    event.preventDefault()

    if (isFahrenheit) {
        temp.textContent = `Temperature: ${tempInC} Celsius`
        toggleBtn.textContent = "To Fahrenheit"
        isFahrenheit = false
    } else {
        temp.textContent = `Temperature: ${tempInF} Fahrenheit`
        toggleBtn.textContent = "To Celsius"
        isFahrenheit = true
    }
}

function fetchData(event) {
    event.preventDefault()
    const city = form.cityWeather.value

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=XCKK58PSBWUZGRMPVBURV37M9`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response);   
        cityData = response
        showData()
    });
}

function showData() {
    toggleBtn.style.display = "block"

    tempInF = cityData.currentConditions.temp
    tempInC = ((tempInF - 32) / 1.8).toFixed(1)

    cityName.textContent = `The weather in ${cityData.address}`
    temp.textContent = `Temperature: ${tempInF} Fahrenheit`
    conditions.textContent = `Conditions: ${cityData.currentConditions.conditions}`
}

