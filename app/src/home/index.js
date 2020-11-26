import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants'
import Content from './components/content';
import fconfig from '../../../config/fconfig'

const conf = fconfig.storage()

const image = { uri: "https://reactjs.org/logo-og.png" }

export default function Home(props) {
  const [wisatas, setWisatas] = useState({
    data: null,
    url:null
  })
  const [events, setEvents] = useState({
    data: null,
    url:null
  })
  const [weather, setWeather] = useState({
    data:null
  })
  async function getData() {
    const rEvent = await axios.get("https://eventtahura.herokuapp.com/event/")
    const rWisata = await axios.get("https://tahurawisata.herokuapp.com/wisata/")
    const rWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=-8.519655&lon=116.283235&appid=d01d3d444c3179e6c40bb786ad19b0d1")
    let resultingArrWisata = []
    let resultingArrEvent = []
    try{
      const arrWisata = rWisata.data.data.map((row)=>row.gambar_wisata)
      const arrEvent = rEvent.data.data.map((row)=>row.gambar_event)
      var i;
      var j;
      for(i=0;i<arrWisata.length;i++){
        const d = await conf.ref("images").child(arrWisata[i]).getDownloadURL()
        resultingArrWisata.push(d)
      }
      for(j=0;j<arrEvent.length;j++){
        const d = await conf.ref("images-event").child(arrEvent[j]).getDownloadURL()
        resultingArrEvent.push(d)
      }
    }catch(err){
      console.log(err)
    }
    setEvents({
      data: rEvent.data.data,
      url:resultingArrEvent
    })
    setWisatas({
      data: rWisata.data.data,
      url:resultingArrWisata
    })
    setWeather({
      data:rWeather.data.weather
    })
  }
  useEffect(() => {
    getData()
  }, [])
  // console.log(weather)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      {/* <View style={{flex:1}}> */}
      {/* <Text style={{fontSize:30,marginLeft:10,marginTop:10,alignSelf:"center",flexWrap:"nowrap"}}>Tahura Nuraksa</Text> */}
      {wisatas.data && events.data && weather.data ?
        <Content props={props} wisatas={wisatas.data} events={events.data} weather={weather.data} wisatasurl={wisatas.url} eventsurl={events.url} />
        :
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>

      }
      {/* </View> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,

  },
  image: {
    resizeMode: "cover",
    justifyContent: "center"
  },
});