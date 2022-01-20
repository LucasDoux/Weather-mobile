import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function WeatherInfo({currentWeather}){
    const {
        main: {temp}
    } = currentWeather
  return(
      <View style={styles.weatherinfo}>
          <Text>{temp}</Text>
      </View>
  ) 
}

const styles = StyleSheet.create({
    weatherinfo:{
        alignItems:'center',
    }
})