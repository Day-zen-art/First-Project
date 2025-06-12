const apiKey = "098c6b244963b5abcf41e7146aa21622";

document.getElementById("weatherForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const resultDiv = document.getElementById("weatherResult");
  resultDiv.textContent = "Loading...";

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><b>${data.weather[0].main}:</b> ${data.weather[0].description}</p>
      <p><b>Temperature:</b> ${data.main.temp}°C</p>
      <p><b>Humidity:</b> ${data.main.humidity}%</p>
      <p><b>Wind:</b> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.textContent = error.message;
  }
});