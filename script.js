const apiKey = "90c271d8620be8387f7e19736572296f";

const waetherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  console.log(cityValue);

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    waetherDataElement.querySelector(".icon").innerHTML = ` <img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="Weather Icon"
  />`;

    waetherDataElement.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    waetherDataElement.querySelector(
      ".description"
    ).textContent = `${description}`;

    waetherDataElement.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    waetherDataElement.querySelector(".icon").innerHTML = "";

    waetherDataElement.querySelector(".temperature").textContent = "";

    waetherDataElement.querySelector(".description").textContent =
      "An Error happened. Please try again later!";

    waetherDataElement.querySelector(".details").innerHTML = "";
  }
}
