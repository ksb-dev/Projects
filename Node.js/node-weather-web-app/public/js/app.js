// https://kedar-weather-app.herokuapp.com/
// 856f4a076dab5791fa723f75e2541eae

//https://api.openweathermap.org/data/2.5/onecall?lat=15.852792&lon=74.498703&units=metric&appid=856f4a076dab5791fa723f75e2541eae
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.messageOne')
const messageTwo = document.querySelector('.messageTwo')
const messageThree = document.querySelector('.messageThree')
const messageFour = document.querySelector('.messageFour')
const messageFive = document.querySelector('.messageFive')
const weatherImage = document.querySelector('.weather-image')
const description = document.querySelector('.description')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    search.value = ''

    messageOne.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                const { currentTemperature, chanceOfRain, image, weatherDescriptions, time } = data.forecastData
                messageTwo.innerHTML = `<i class="fas fa-map-marked-alt"></i>  ${data.location}`
                messageOne.innerHTML = `${currentTemperature}<span>&#8451</span>`
                messageThree.innerHTML = `<i class="fas fa-clock"></i>  ${time}`
                messageFour.innerHTML = `<i class="fas fa-cloud-rain"></i>  ${chanceOfRain} mm`
                weatherImage.innerHTML = `<img class="small" src=${image} alt="" />`
                description.innerHTML = `${weatherDescriptions}`
            }
        })
    })
    
})