import React from 'react'
import { View, Text } from 'react-native'

export default function Detail({dataWisata}){
    return(
        <View>
            <Text style={{fontSize:30,marginLeft:10,marginTop:10}}>Detail</Text>
            <Text>{dataWisata.nama_wisata}</Text>
        </View>
    )
}