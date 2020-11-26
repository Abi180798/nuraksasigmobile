import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ActivityIndicator } from 'react-native';
import dataWisata from '../../mock/wisata.json'
import axios from 'axios'
import Detail from './components/detail'
import Constants from 'expo-constants'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import fconfig from '../../../config/fconfig'

const conf = fconfig.storage()

const image = require("../../../assets/img/imgnotfound.png")

export default function Wisata(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    data: null,
    index: null
  })
  const [wisatas, setWisatas] = useState({
    data: null,
    url: null
  })
  async function getData() {
    setWisatas({ ...wisatas, loading: true })
    const r = await axios.get("https://tahurawisata.herokuapp.com/wisata/")
    let resultingArr = [];
    try {
      const arr = r.data.data.map((row) => row.gambar_wisata)
      var i;
      for (i = 0; i < arr.length; i++) {
        const d = await conf.ref("images").child(arr.[i]).getDownloadURL()
        resultingArr.push(d)
      }
    } catch (err) {
      console.log(err)
    }
    setWisatas({
      ...wisatas,
      data: r.data.data,
      url: resultingArr
    })
  }
  useEffect(() => {
    getData()
  }, [data.index])
    return (
      <View style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
        <Header style={{ marginTop: Constants.statusBarHeight, backgroundColor: "#f0932b" }}>
          <Body><Title>Daftar Wisata</Title></Body>
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
              <Thumbnail source={data.data && data.data.gambar_wisata !== "" ? { uri: wisatas.url && wisatas.url[data.index] } : image} style={{ height: 100, width: 100 }} />

              <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{data && data.nama_wisata}</Text>
              <Text note style={styles.modalText}>{data.data && data.data.alamat_wisata}</Text>
              <Text style={styles.modalText}>{data.data && data.data.deskripsi_wisata}</Text>
              <Text style={styles.modalText}>Lokasi Wisata: {data && data.latitude},{data && data.longitude}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1, marginRight: 20 }}
                  onPress={() => {
                    props.navigation.navigate("Maps", { lat: data.data && data.data.latitude, lng: data.data && data.data.longitude })
                  }}
                >
                  <Text style={styles.textStyle}>Cek Peta</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1, marginLeft: 20 }}
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
        {wisatas.data ?
          <ScrollView style={{ flex: 1 }}>
            {wisatas.data.map((row, index) => (
              <TouchableOpacity key={index}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setData({
                    ...data,
                    data: row,
                    index: index
                  })
                }
                }
              >
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <View style={{ flex: 1 }}>
                    <Thumbnail source={row.gambar_wisata !== "" ? { uri: wisatas.url && wisatas.url[index] } : image} style={{ height: 100, width: 100 }} />
                  </View>
                  <View style={{ flex: 2, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18 }}>{row.nama_wisata}</Text>
                    <Text note>{row.alamat_wisata}</Text>
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
    );

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
  },
});