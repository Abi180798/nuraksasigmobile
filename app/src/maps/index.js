import React,{useState,useEffect} from 'react'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps"
import {Dimensions, View,  Image, TouchableOpacity, Picker, Button, Linking, ImageBackground, StyleSheet} from 'react-native'
import * as Location from 'expo-location';
import dataWisata from "../../mock/wisata.json"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Constants from 'expo-constants'
import { Title,Text } from 'native-base';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Images = { uri:"https://www.pngitem.com/pimgs/m/326-3260576_get-current-location-icon-hd-png-download.png"}
const bg = { uri:"https://image.freepik.com/free-vector/abstract-orange-watercolor-brush-stroke-background_1035-18647.jpg"}
export default function NuraksaMaps(props){
  console.log(props.route)
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    // console.log(location)
    })();
  },[]);
  const [selectedValue, setSelectedValue] = useState({
      current:"Penangkaran Rusa",
      filter:null
  });
// console.log("selec",selectedValue)
    const [zoom, setZoom] = useState(15)
    const [state,setState] = useState({
      isMapReady:false,
      region: {
        latitude: props.route.params?props.route.params.lat:-8.519650,
        longitude: props.route.params?props.route.params.lng:116.283230,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
    })

    const onMapLayout = () => {
      setState({
        ...state,
        isMapReady:true
      })
    }
    // console.log("fil",parseFloat(selectedValue.filter&&selectedValue.filter.lat))
    return(
        <View       style={{ flex: 1, width: width, height:height,backgroundColor:"#f0932b" }} //window pake Dimensions
>
<View style={{borderRadius:10,elevation:2}}>
  {/* <ImageBackground source={bg} style={styles.image}> */}
    <Title style={{ fontSize:30, marginLeft:10,marginTop:Constants.statusBarHeight}}>Daftar Lokasi Wisata</Title>
    <View>
        <Title style={{fontSize:13,marginTop:10,marginLeft:20}}>Pilih Lokasi Tujuan: </Title>
    <Picker
        selectedValue={selectedValue.current}
        style={{ height: 30, width: "95%", marginLeft:12,marginBottom:10,color:"#fff" }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue({...selectedValue,
            current:itemValue,
        filter:{lat:dataWisata.data.filter((row)=>row.nama_wisata===itemValue).map((row)=>row.location.lat).toString(),
            lng:dataWisata.data.filter((row)=>row.nama_wisata===itemValue).map((row)=>row.location.lng).toString()}
        })
        }
      >
          {dataWisata.data&&dataWisata.data.map((row,index)=>(
                  <Picker.Item key={index} label={`${row.nama_wisata}`} value={`${row.nama_wisata}`} /> 
          ))}
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
    {selectedValue.filter&&
    <View style={{justifyContent:"center", marginLeft:20,marginRight:20,marginBottom:5}} >
        <Button title="Berangkat" onPress={()=>{
            Linking.openURL(`https://www.google.com/maps/dir/${location&&location.coords.latitude},${location&&location.coords.longitude}/${selectedValue.filter.lat},${selectedValue.filter.lng}/@${selectedValue.filter.lat},${selectedValue.filter.lng}/`)
        }}/>
    </View>
    }
    <Text style={{marginBottom:10,textAlign:"center",color:"#fff"}}>Lokasi Terkini: {JSON.stringify(location&&location.coords.latitude)},{JSON.stringify(location&&location.coords.longitude)}</Text>
    {/* </ImageBackground> */}
</View>
{/* <TouchableOpacity 
// onPress={this.gotToMyLocation} 
style={ {
          width: 60, height: 60,zIndex:1,
          position: "absolute", bottom: 20, right: 20, borderRadius: 30, backgroundColor: "#d2d2d2"
        }}>
          <Image
            
            style={{ flex:1,alignSelf:"center",width: "100%", height: 40,borderRadius: 30 }}
            source={Images}
          />
        </TouchableOpacity> */}
            <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            // onUserLocationChange={(e)=>{
            //     setLocation({lat:e.nativeEvent.coordinate.latitude,
            //         lng:e.nativeEvent.coordinate.longitude})
            // }}
            zoomEnabled={true}
            zoomControlEnabled={true}
      style={{ flex: 1, width: width, height:height }} //window pake Dimensions
      region={{
        latitude: selectedValue.filter?parseFloat(selectedValue.filter.lat):props.route.params?props.route.params.lat:state.region.latitude,
        longitude: selectedValue.filter?parseFloat(selectedValue.filter.lng):props.route.params?props.route.params.lng:state.region.longitude,
        latitudeDelta: state.region.latitudeDelta,
        longitudeDelta: state.region.longitudeDelta,
      }}
    //   onRegionChange={region => {
    //     setZoom(Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2))
    //   }}
      onLayout={onMapLayout}
    //   onMarkerPress={e=>console.log("onpress: ",e)}
      
      // onMapReady={e=>console.log(e)}
      >
        {/* {state.isMapReady&&console.log(state.isMapReady)} */}
        {state.isMapReady&&
        dataWisata.data&&dataWisata.data.map((row,index)=>(
            <MapView.Marker
            onPress={(e)=>{
                // setSelectedValue({...selectedValue,myloc:dataWisata.data.filter((row)=>row.location.lat===e.nativeEvent.coordinate.latitude&&row.location.lng===e.nativeEvent.coordinate.longitude).map((row)=>row.nama_wisata).toString()})
            }}
            key={index}
            coordinate={{
              latitude: row.location.lat,
              longitude: row.location.lng,
            }}
            title={`${row.nama_wisata}`}
            description={`${row.alamat_wisata}`} />
        ))
    }
    </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});
