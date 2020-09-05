import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { View, ScrollView, Image,TouchableOpacity,Modal,StyleSheet,TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

const image = { uri: "https://i.ibb.co/jJPqZwL/kegiatan10.jpg" }

export default function Event(){
  const [modalVisible, setModalVisible] = useState(false);
  const [data,setData] = useState(null)
  const [events,setEvents] = useState({
    data:null
  })
  async function getData() {
    const r = await axios.get("https://tahuraevent.herokuapp.com/event/getall")
    setEvents({
      data:r.data
    })
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(events)
  return(
        <View style={{flex:1}}>
          <Header style={{marginTop:Constants.statusBarHeight, backgroundColor:"#f0932b"}}>
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
      <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center"}}>{data&&data.name}</Text>
      <Text note style={styles.modalText}>{data&&data.kota}</Text>
      <Text style={styles.modalText}>{data&&data.updatedAt}</Text>
        <View style={{flexDirection:"row"}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3",flex:1 }}
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
          <ScrollView style={{ flex: 1 }}>
        {events.data&&events.data.event.map((row, index) => (
          <TouchableOpacity key={index}
          onPress={() =>{
setModalVisible(!modalVisible);
setData(row)
          }
          }
          >
            <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
              <View style={{  flex: 1 }}>
                <Image source={image} style={{ height: 100 }} />
              </View>
              <View style={{ flex: 2,marginLeft:10 }}>
                <Text style={{ fontSize: 20 }}>{row.name}</Text>
                <Text note>{row.kota}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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