import React from 'react';
import { View,Text, StyleSheet, Image } from 'react-native';
import {colors} from '../utils/index';

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors

// import { Container } from './styles';

export default function WeatherInfo({currentWeather}){
    const {
        main: {temp},
        weather: [details],
        name
    } = currentWeather

    const {icon, main, description} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  return(
      <View style={styles.weatherinfo}>
          <Text>{name}</Text>
          <Image style={styles.weatherIcon} source={{uri: iconUrl}} />
          <Text style={styles.textPrimary}>{temp} º</Text>
          <Text style={styles.weatherDescription}>{description}</Text>
          {/*<Text style={styles.textSecondary}>{main}</Text>*/}
      </View>
  ) 
}

const styles = StyleSheet.create({
    weatherinfo:{
        alignItems:'center',
    },

    weatherDescription: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        marginTop:10,
        fontWeight:'500',
        textTransform:'uppercase'
    },

    weatherIcon:{
        width:100,
        height:100,
    },
    textPrimary:{
        fontSize:40,
        color:PRIMARY_COLOR
    },
    
    textSecondary:{
        fontSize: 20,
        color: SECONDARY_COLOR,
        marginTop:10,
        fontWeight:'500',
    }
})