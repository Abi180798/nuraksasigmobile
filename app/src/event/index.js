import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, ScrollView, Image, TouchableOpacity, Modal, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import { getDateTimeArrayIndo } from '../../utils/convert';
import fconfig from '../../../config/fconfig'

const conf = fconfig.storage()

const image = require("../../../assets/img/imgnotfound.png")

export default function Event() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    data:null,
    index:null
  })
  const [events, setEvents] = useState({
    data: null,
    url:null
  })
  async function getData() {
    const r = await axios.get("https://eventtahura.herokuapp.com/event/")
    let resultingArr = []
    try{
      const arr = r.data.data.map((row)=>row.gambar_event)
      var i;
      for(i=0;i<arr.length;i++){
        const d = await conf.ref("images-event").child(arr[i]).getDownloadURL()
        resultingArr.push(d)
      }
    }catch(err){
      console.log(err)
    }
    setEvents({
      data: r.data.data,
      url:resultingArr
    })
  }
  useEffect(() => {
    getData()
  }, [data.index])
  return (
    <View style={{ flex: 1 }}>
      <Header style={{ marginTop: Constants.statusBarHeight, backgroundColor: "#f0932b" }}>
        <Body><Title>Daftar Event</Title></Body>
      </Header>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Thumbnail source={data.data&&data.data.gambar_event!==""?{uri:events.url && events.url[data.index]}:image} style={{height:100,width:100}}/>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{data && data.judul_event}</Text>
            <Text note style={styles.modalText}>{data.data && data.data.deskripsi_event}</Text>
            <Text style={styles.modalText}>{data.data && getDateTimeArrayIndo(data.data.tanggal_event)}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Kembali</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      {events.data ?
        <ScrollView style={{ flex: 1 }}>
          {events.data.map((row, index) => (
            <TouchableOpacity key={index}
              onPress={() => {
                setModalVisible(!modalVisible);
                setData({
                  ...data,
                  data:row,
                  index:index
                })
              }
              }
            >
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <View style={{ flex: 1 }}>
                  <Thumbnail source={row.gambar_event!==""?{uri:events.url && events.url[index]}:image} style={{ height: 100,width:100 }} />
                </View>
                <View style={{ flex: 2, marginLeft: 10 }}>
                  <Text style={{ fontSize: 20 }}>{row.judul_event}</Text>
                  <Text note>{row.deskripsi_event}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        :
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});