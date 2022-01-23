import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { colors } from './utils';

const WEATHER_API_KEY = '7d3c7f5136168e6ddc03f18a1c0b46cd'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null) //fazendo o app recarregar a mudanca de temperatura ao trocar

    setErrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status != 'granted') {
        setErrorMessage('O acesso à localização é necessário para executar o aplicativo')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}&lang=pt_br`

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
    return (

      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>

          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />

          <ReloadIcon load={load} />

          <WeatherInfo currentWeather={currentWeather} />

        </View>

        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>

      </View>
    )

  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{textAlign:`center`}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
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

  main: {
    justifyContent: 'center',
    flex: 1
  }
});
