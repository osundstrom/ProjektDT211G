"use strict"

let latitude = 0; //sätter variabler.
let longitude = 0;

async function getLocation() {  //Funktion för att hämta koordinater.

 
    let inputtedText = document.getElementById("searchBar").value; //få värdet från inputen.
    let locationSearched = "https://nominatim.openstreetmap.org/search.php?q="+ inputtedText + "&format=jsonv2"; //använder api med den text som skrivs i input, till json.

    const response = await fetch(locationSearched);//Hämtar
    const data = await response.json(); 

      for (let x of data) { //Hämar ut kordinaterna.
        let latCord = parseFloat(x.lat);
        let longCord = parseFloat(x.lon); 
        latitude = latCord;
        longitude = longCord;
        break; //Fick 2 värden så satt en break.
      }

      let weatherDiv = document.getElementById("weatherDivID");

      if (weatherDiv.style.display === "block") { //Sätter weatherDiv så den är "none" varje gång. så man inte behöver dubbelklicka sök om man redan sökt en gång. 
        weatherDiv.style.display = "none";
      } else {
        weatherDiv.style.display = "none";
      };
     

      getWeather()//Kallar nästa funktion.
    }

    /*------------------------------------------------------------------------------------------------------------------------------*/ 

   



    document.getElementById("searchButton").addEventListener("click", getLocation); //vid klick kör den första funnktionen getLocation.

      
    
/*------------------------------------------------------------------------------------------------------------------------------*/ 

async function getWeather() {
    let weatherLocation = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=dc1d45d46bbc38d64cc9e756dc3885fa&lang=sv"; //Sätter in koordinaterna vi fått in i denna api.
    const response = await fetch(weatherLocation);//Hämtar
    const data = await response.json(); 

    //Denna api har massa värden om vädret på de koridnaterna den söker efter. De hämtar jag ut här.

    let cloudData = data.clouds; //Målninghet
    let tempData = data.main;//Alla tempvärden
    let windData = data.wind; //Vind
    let sunData = data.sys; //Sol
    let nameData = data.name; //Mätplats
    let weatherData = data.weather; //en array med väder. (hämtar description senare från den)


    let weatherDescription = weatherData[0].description;//Här är exempelvis en kort förklaring om vädret
    let sunrise = sunData.sunrise //Soluppgång
    let sunset = sunData.sunset;//Här ät

    let sunriseDate = new Date(sunrise*1000); //Omvandlar
    let sunsetDate = new Date(sunset*1000); //Omvandlar



    //Skriver ut allt till index
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

    let wetherMaxMin = document.getElementById("weatherMaxMin");
    wetherMaxMin.textContent = "Dagens högsta temp: " + (tempData.temp_max - 273.15).toFixed(2)+ "°C " + "och dagens lägsta temp: " + (tempData.temp_min - 273.15).toFixed(2) + "°C";
  


    let weatherDiv = document.getElementById("weatherDivID");




    let imageVarmt = document.getElementById("imageVarmt");
    let imageMellan = document.getElementById("imageMellan");
    let imageKallt = document.getElementById("imageKallt");

    let textKallt = document.getElementById("textKallt");
    let textMellan = document.getElementById("textMellan");
    let textVarmt = document.getElementById("textVarmt");

     //Vad som ska visas vid kanpptryck då väderdtan har hämtats, gör om temp från kelvin till celcius.
         if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) > 20)) { //Om temp över 20 grader celcius så visas ImageVarmt och TextVarmt. 
          weatherDiv.style.display = "block";
          imageVarmt.style.display = "block";
          imageMellan.style.display = "none";
          imageKallt.style.display = "none";
          textVarmt.style.display = "block";
          textMellan.style.display = "none";
          textKallt.style.display = "none";
          
         }
         
        else if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) >= 5 && (tempData.temp - 273.15) <= 20)) { //Om temp mellan 5 och 20 grader  så visas ImageMellan och TextMellan. 
         weatherDiv.style.display = "block";
         imageMellan.style.display = "block";
         imageVarmt.style.display = "none";
         imageKallt.style.display = "none";
         textVarmt.style.display = "none";
          textMellan.style.display = "block";
          textKallt.style.display = "none";
         
          }

        else if (weatherDiv.style.display === "none" && ((tempData.temp - 273.15) < 5)) { //Om temp under 5 grader  så visas ImageKallt och TextKallt. 
         weatherDiv.style.display = "block";
         imageKallt.style.display = "block";
         imageVarmt.style.display = "none";
         imageMellan.style.display = "none";
         textVarmt.style.display = "none";
          textMellan.style.display = "none";
          textKallt.style.display = "block";
        }

        else { //Om inget stämmer
        weatherDiv.style.display = "none";
        imageVarmt.style.display = "none";
        imageMellan.style.display = "none";
        imageKallt.style.display = "none";
      };

  }



