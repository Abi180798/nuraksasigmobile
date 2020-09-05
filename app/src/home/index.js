import React from 'react';
import { StyleSheet, Text, View,SafeAreaView, Button,StatusBar, ImageBackground } from 'react-native';
import Constants from 'expo-constants'
import Content from './components/content';

const image = { uri:"https://reactjs.org/logo-og.png"}

export default function Home(props) {
    return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar hidden={true}/>
      {/* <View style={{flex:1}}> */}
        {/* <Text style={{fontSize:30,marginLeft:10,marginTop:10,alignSelf:"center",flexWrap:"nowrap"}}>Tahura Nuraksa</Text> */}
          <Content props={props}/>
      {/* </View> */}
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    marginTop: Constants.statusBarHeight,

    },
    image: {
      resizeMode: "cover",
      justifyContent: "center"
    },
  });