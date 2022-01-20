import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';

const WEATHER_API_KEY = '7d3c7f5136168e6ddc03f18a1c0b46cd'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitySystem] = useState('metric')

  useEffect(() => {
    load()
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status != 'granted') {
        setErrorMessage('O acesso à localização é necessário para executar o aplicativo')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

      //alert(`Latitude: ${latitude}, Longitude: ${longitude}`)
    } catch (error) {
      setErrorMessage(error.message)
    }

  }

  if (currentWeather) {
    
    const {
      main : {temp},
    } =currentWeather

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />  
        <View style={styles.main}>

          <WeatherInfo currentWeather={currentWeather}/>
        
        </View>

      </View>
    )

  } else {
      return(
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
      )
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  main:{
    justifyContent: 'center',
    flex:1
  }
});
