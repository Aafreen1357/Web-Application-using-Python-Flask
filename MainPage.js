
document.addEventListener('DOMContentLoaded', () => {
    const creatorBox = document.querySelector('.creator-box');
    const profilePic = document.querySelector('.profile-pic');
    const socialLinks = document.querySelectorAll('.social-link');

    creatorBox.addEventListener('mouseenter', () => {
        profilePic.style.transform = 'scale(1.1)';
    });

    creatorBox.addEventListener('mouseleave', () => {
        profilePic.style.transform = 'scale(1)';
    });

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.2)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });
});
async function getWeather() {
    const url = 'http://127.0.0.1:5000/weather/';
    const city = searchInput.value.trim();
    const new_url = `${url}${encodeURIComponent(city)}`;

    try {
        const response = await fetch(new_url);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.status);
        }
        
        const data = await response.json();
        console.log(data);

        const cityReports = document.getElementById('main-weather');
        cityReports.innerHTML = '';  
        cityReports.className = 'weatherBox fade-in';

        const cityName = document.createElement('h2');
        cityName.textContent = data['Name'];

        const regionName = document.createElement('p');
        regionName.textContent = data['Region'] + ", " + data['Country'];
        regionName.className = 'location-info';

        const weatherIcon = document.createElement('img');
        weatherIcon.src = "http:" + data['IconURL'];
        weatherIcon.alt = 'Weather Icon';
        weatherIcon.className = 'weather-icon';

        const weatherInfo = document.createElement('p');
        weatherInfo.textContent = data['Weather'];
        weatherInfo.className = 'weather-info';

        const cityTime = document.createElement('div');
        cityTime.textContent = "Time: " + convertTo12Hour(data['Time'].slice(10))
        cityTime.className = 'time';

        const humidity = document.createElement('div');
        humidity.textContent = "Humidity: " + data['Humidity'] + "%";
        humidity.className = 'humidity';

        const windSpeed = document.createElement('div');
        windSpeed.textContent = "Wind: " + data['Wind'] + " Km/h";
        windSpeed.className = 'wind-speed';

        const details = document.createElement('div');
        details.className = 'details';
        details.appendChild(cityTime);
        details.appendChild(humidity);
        details.appendChild(windSpeed);

        cityReports.appendChild(cityName);
        cityReports.appendChild(regionName);
        cityReports.appendChild(weatherIcon);
        cityReports.appendChild(weatherInfo);
        cityReports.appendChild(details);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        showLoaderAndFetchWeather();
    }
});

const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');

async function showLoaderAndFetchWeather() {
    loader.style.display = 'block'; 
    try {
        await getWeather();  
    } catch (error) {
        console.error('Error loading weather data:', error);
    } finally {
        loader.style.display = 'none'; 
    }
}

searchButton.addEventListener('click', showLoaderAndFetchWeather);

function convertTo12Hour(time24) {
    
    const [hour, minute] = time24.split(':').map(Number);
    
    const period = hour >= 12 ? 'PM' : 'AM';
    
    const hour12 = hour % 12 || 12; 
    
    const minuteFormatted = minute.toString().padStart(2, '0');
    
    return `${hour12}:${minuteFormatted} ${period}`;
}

// future Plan . I will use rest countires api
// document.getElementById('filter-toggle').addEventListener('click', function() {
//     document.getElementById('filter-options').classList.toggle('show');
// });

