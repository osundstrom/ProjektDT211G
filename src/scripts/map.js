"use strict"

let latitude;
let longitude;


async function getLocation() { 
    let inputtedText = document.getElementById("searchBar").value;
    let locationSearched = "https://nominatim.openstreetmap.org/search.php?q="+ inputtedText + "&format=jsonv2";

    const response = await fetch(locationSearched);
    const data = await response.json(); 

      for (let x of data) {
        let latCord = parseFloat(x.lat);
        let longCord = parseFloat(x.lon); 
        latitude = latCord;
        longitude = longCord;
        break;
      }
      console.log(latitude)
      console.log(longitude)


      getWeather()
    }

    document.getElementById("searchButton").addEventListener("click", getLocation);
    

async function getWeather() {
    let weatherLocation = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=dc1d45d46bbc38d64cc9e756dc3885fa";
    const response = await fetch(weatherLocation);
    const data = await response.json(); 

    let cloudData = data.clouds;
    let tempData = data.main;
    console.log(data.clouds)
    console.log(data.main)

    let weatherTemp = document.getElementById("weatherTemp");
    weatherTemp.textContent = (tempData.temp - 273.15).toFixed(2);


    let weatherClouds = document.getElementById("weatherClouds");
    weatherClouds.textContent = "Molningt:" + cloudData.all + "%";
    
}