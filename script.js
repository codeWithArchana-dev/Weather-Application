const apiKey ="d2cc62a760b5484907e0fa6ab26e91fe"
const resultDiv = document.getElementById("result");

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if(!city){
        resultDiv.innerHTML= " Please enter a City!";
        return;
    }

    resultDiv.innerHTML =" Fetching Weather...";

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error(`City is not Found`);
        }

        // parsing the response to json

        const data = await response.json();
        const condition = data.weather[0].description;


        let backgroundurl = "";
        if(condition.includes("cloud")){
            backgroundurl = "url('https://source.unsplash.com/1600x900/?cloudy')";
        }

        else if(condition.includes("rain")){
            backgroundurl = "url('https://source.unsplash.com/1600x900/?rain')";
        }

        else if(backgroundurl.includes("clear")){
            backgroundurl = "url('https://source.unsplash.com/1600x900/?sunny')";
        }

        else if(backgroundurl.includes("snow")){
            backgroundurl = "url('https://source.unsplash.com/1600x900/?snow')";
        }
        else{
            backgroundurl ="url('https://source.unsplash.com/1600x900/?weather')";
        }


        document.body.style.backgroundImage = backgroundurl;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";

        // Displaying data

       resultDiv.innerHTML =`
        🌍  <strong>${data.name}</strong><br>
         🌡️  Temperature ${data.main.temp}°C<br>
         ☁️ Condition ${data.weather[0].description}
       `;
    } catch(error){
        resultDiv.innerHTML=`❌ Error: ${error.message}`;
    }
    
}