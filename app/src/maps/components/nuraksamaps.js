import React,{useState} from 'react'
import MapView from "react-native-maps"
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function NuraksaMaps(){
    const [zoom, setZoom] = useState(15)
    const [state,setState] = useState({
      isMapReady:false,
      region: {
        latitude: -8.519650,
        longitude: 116.283230,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }
    })

    const onMapLayout = () => {
      setState({
        ...state,
        isMapReady:true
      })
    }
    return(
            <MapView
      style={{ flex: 1, width: width, height:height }} //window pake Dimensions
      region={{
        latitude: -8.519650,
        longitude: 116.283230,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      onRegionChange={region => {
        setZoom(Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2))
      }}
      onLayout={onMapLayout}
      // onMapReady={e=>console.log(e)}
      >
        {/* {state.isMapReady&&console.log(state.isMapReady)} */}
        {state.isMapReady&&
      <MapView.Marker
      coordinate={{
        latitude: state.region.latitude,
        longitude: state.region.longitude,
      }}
      title="Kantor Balai Tahura Nuraksa"
      description="Kantor Balai Tahura Nuraksa" />
    }
    </MapView>
    )
}