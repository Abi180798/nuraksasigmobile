import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ActivityIndicator } from 'react-native';
import dataWisata from '../../mock/wisata.json'
import axios from 'axios'
import Detail from './components/detail'
import Constants from 'expo-constants'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

const image = require("../../../assets/img/imgnotfound.png")

export default function Wisata(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null)
  const [wisatas, setWisatas] = useState({
    data: null
  })
  async function getData() {
    setWisatas({ ...wisatas, loading: true })
    const r = await axios.get("https://tahurawisata.herokuapp.com/wisata/")
    setWisatas({
      ...wisatas,
      data: r.data.data,
    })
  }
  useEffect(() => {
    getData()
  }, [wisatas.dataFix])
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
          <Thumbnail source={data&&data.gambar_wisata!==""?{uri:`http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${data&&data.gambar_wisata}`}:image} style={{height:100,width:100}}/>

            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{data && data.nama_wisata}</Text>
            <Text note style={styles.modalText}>{data && data.alamat_wisata}</Text>
            <Text style={styles.modalText}>{data && data.deskripsi_wisata}</Text>
            <Text style={styles.modalText}>Lokasi Wisata: {data && data.latitude},{data && data.longitude}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1, marginRight: 20 }}
                onPress={() => {
                  props.navigation.navigate("Maps", { lat: data && data.latitude, lng: data && data.longitude })
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
                setData(row)
              }
              }
            >
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <View style={{ flex: 1 }}>
                  <Thumbnail source={row.gambar_wisata!==""?{uri:`http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${row.gambar_wisata}`}:image} style={{ height: 100, width:100 }} />
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