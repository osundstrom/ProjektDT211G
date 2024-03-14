"use strict"

let latitude = 0;
let longitude = 0;

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

      let weatherDiv = document.getElementById("weatherDivID");

      if (weatherDiv.style.display === "block") {
        weatherDiv.style.display = "none";
      } else {
        weatherDiv.style.display = "none";
      };
     

      getWeather()
    }

    /*------------------------------------------------------------------------------------------------------------------------------*/ 

   



    document.getElementById("searchButton").addEventListener("click", getLocation); 

      
    
/*------------------------------------------------------------------------------------------------------------------------------*/ 

async function getWeather() {
    let weatherLocation = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=dc1d45d46bbc38d64cc9e756dc3885fa&lang=sv";
    const response = await fetch(weatherLocation);
    const data = await response.json(); 

    let cloudData = data.clouds;
    let tempData = data.main;
    let windData = data.wind;
    let sunData = data.sys;
    let nameData = data.name;
    let weatherData = data.weather;


    let weatherDescription = weatherData[0].description;
    let sunrise = sunData.sunrise
    let sunset = sunData.sunset;

    let sunriseDate = new Date(sunrise*1000);
    let sunsetDate = new Date(sunset*1000);

    let weatherTemp = document.getElementById("weatherTemp");
    weatherTemp.textContent = "Temperatur: " + (tempData.temp - 273.15).toFixed(2)+"°C" + " men känns som: " + (tempData.feels_like - 273.15).toFixed(2) + "°C";
    

    let weatherClouds = document.getElementById("weatherClouds");
    weatherClouds.textContent = "Molninghet: " + cloudData.all + "%";


    let weatherWind = document.getElementById("weatherWind");
    weatherWind.textContent = "Vind " + windData.speed + "m/s";


    let weatherHumidity = document.getElementById("weatherHumidity");
    weatherHumidity.textContent = "Luftfuktighet " + tempData.humidity + "%";

    let weatherSunrise = document.getElementById("weatherSunrise");
    weatherSunrise.textContent = "Soluppgång " +  sunriseDate;

    let weatherSunset = document.getElementById("weatherSunset");
    weatherSunset.textContent = "Soluppgång " +  sunsetDate;
    

    let weatherName = document.getElementById("weatherName");
    weatherName.textContent = "Koordinater: "+ "lon " + longitude + " lat " + latitude + "," + " Mätplats: " + nameData + " " +sunData.country;


    let weatherType = document.getElementById("weatherType");
    weatherType.textContent =  "Idag är det: " + weatherDescription;



    let weatherDiv = document.getElementById("weatherDivID");




    let imageVarmt = document.getElementById("imageVarmt");
    let imageMellan = document.getElementById("imageMellan");
    let imageKallt = document.getElementById("imageKallt");

     
         if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) > 20)) {
          weatherDiv.style.display = "block";
          imageVarmt.style.display = "block";
          imageMellan.style.display = "none";
          imageKallt.style.display = "none";
         }
         
        else if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) >= 5 && (tempData.temp - 273.15) <= 20)) {
         weatherDiv.style.display = "block";
         imageMellan.style.display = "block";
         imageVarmt.style.display = "none";
          imageKallt.style.display = "none";
         console.log("mitten")
          }

        else if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) < 5)) {
         weatherDiv.style.display = "block";
         imageKallt.style.display = "block";
         imageVarmt.style.display = "none";
          imageMellan.style.display = "none";
        }

        else {
        weatherDiv.style.display = "none";
        imageVarmt.style.display = "none";
        imageMellan.style.display = "none";
        imageKallt.style.display = "none";
      };

  }



