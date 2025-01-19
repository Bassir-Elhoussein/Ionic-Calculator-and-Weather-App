import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WeatherResponse {
  sys: {
    country: string;
  };
  name: string;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WeatherPage {
  cityName: string = ''; // User input
  weatherData: WeatherResponse | null = null; // Weather API response
  errorMessage: string = ''; // Error messages
  isLoading: boolean = false; // Loading spinner status

  apiKey: string = '020d8a438e989242624f1a826403d855'; // Replace with your OpenWeather API Key
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private loadingCtrl: LoadingController) {}

  // Fetch weather data
  async getWeather() {
    if (!this.cityName.trim()) {
      this.errorMessage = 'Please enter a valid city name.';
      this.weatherData = null;
      return;
    }

    // Show the loading spinner
    this.isLoading = true;

    const url = `${this.apiUrl}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<WeatherResponse>(url).subscribe(
      (data) => {
        // Check if the country code is 'EH' (Western Sahara), and change it to 'MA' (Morocco)
        if (data.sys.country === 'EH') {
          data.sys.country = 'MA';
        }
        
        this.weatherData = data;
        this.errorMessage = '';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'City not found or network error. Please try again.';
        this.weatherData = null;
        this.isLoading = false;
      }
    );
  }

  // Get country flag URL
  getCountryFlag(countryCode: string) {
    return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
  }

  // Get weather condition icon URL
  getWeatherIcon(iconCode: string) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
