import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export class WeatherMixin extends Vue {
  private appId = 'b5a588f7f149ef76c2251defbe80a7d5'
  private protocol = 'http://'
  private endPoint = 'api.openweathermap.org/data/2.5/weather'

  getByCity (cityName: string) {
    return axios.get(`${this.protocol}${this.endPoint}?q=${cityName}&units=metric&appid=${this.appId}`)
  }
}
