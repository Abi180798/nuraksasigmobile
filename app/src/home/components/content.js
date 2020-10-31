import React, { useState } from 'react'
import { View, Image, ScrollView, Linking } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import Constants from 'expo-constants'
import { getDateTimeArrayIndo, convertWeather } from '../../../utils/convert'
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

const img = require("../../../../assets/icon.png")
const carousel = require("../../../../assets/img/carousel.jpg")
const notfound = require("../../../../assets/img/imgnotfound.png")
export default function Contents({ props, wisatas, events, weather }) {
  // console.log("taek", weather[0].description)
  const [state, setState] = useState({
    activeIndex: 0
  })
  function _renderItemWisata({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
      }}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={item.gambar_wisata !== "" ? { uri: `http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${item.gambar_wisata}` } : notfound} />
              <Body>
                <Text>{item.nama_wisata}</Text>
                <Text note>{item.alamat_wisata}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={item.gambar_wisata !== "" ? { uri: `http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${item.gambar_wisata}` } : notfound} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent onPress={() => {
                props.navigation.navigate("Maps", { lat: wisatas[state.activeIndex].latitude, lng: wisatas[state.activeIndex].longitude })
              }}>
                <Ionicons name="ios-car" size={20} color="blue" />
                <Text>Berangkat</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    )
  }
  function _renderItemEvent({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
      }}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={item.gambar_event !== "" ? { uri: `https://eventtahura.herokuapp.com/event/events/photo/${item.gambar_event}` } : notfound} />
              <Body>
                <Text>{item.judul_event}</Text>
                <Text note>{getDateTimeArrayIndo(item.tanggal_event)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={item.gambar_event !== "" ? { uri: `https://eventtahura.herokuapp.com/event/events/photo/${item.gambar_event}` } : notfound} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
        </Card>
      </View>
    )
  }
  return (
    <Container>
      <Header style={{ marginTop: Constants.statusBarHeight, backgroundColor: "#f0932b" }}>
        <Body><Title style={{ alignSelf: "center" }}>Tahura Nuraksa</Title></Body>
      </Header>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={img} />
              <Body>
                <Text>Tahura Nuraksa</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
            <Right>
              <Thumbnail source={{ uri: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png` }} />
              <Text note style={{ marginTop: -15 }}>{convertWeather(weather[0].description)}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={carousel} style={{ height: 200, width: "100%", flex: 1, marginBottom: 20 }} />
              <Text>
                Taman Hutan Raya (TAHURA) Nuraksa merupakan satu-satunya Kawasan
                Konservasi di Nusa Tenggara Barat (NTB). TAHURA Nuraksa memiliki potensi
                wisata alam yang menarik untuk dikunjungi dan dinikmati sebagai ajang rekreasi
                diantaranya Air Terjun Segenter, Goa Pengkoak, medan yang menarik dan menantang
                untuk kegiatan olahraga sepeda gunung maupun motor trail, kemudian koleksi satwa
                berupa rusa, kelinci, dan berbagai jenis burung. TAHURA Nuraksa juga memiliki
                keanekaragaman hayati (biodiversitas) baik flora dan fauna yang cukup tinggi
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }} onPress={() => {
                Linking.openURL("https://nuraksasig.vercel.app")
              }}>
                <Icon name="help" />
                <Text>Check Our Website!</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        <ScrollView>
          <Title style={{ color: "black", marginLeft: 10, borderBottomColor: "black", borderBottomWidth: 1, marginRight: 62, marginTop: Constants.statusBarHeight }}>Daftar Wisata</Title>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Carousel
              layout={"default"}
              data={wisatas && wisatas}
              sliderWidth={300}
              itemWidth={300}
              renderItem={_renderItemWisata}
              onSnapToItem={index => setState({ activeIndex: index })} />
          </View>
          <Title style={{ color: "black", marginLeft: 10, borderBottomColor: "black", borderBottomWidth: 1, marginRight: 62 }}>Daftar Event</Title>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Carousel
              layout={"default"}
              data={events && events}
              sliderWidth={300}
              itemWidth={300}
              renderItem={_renderItemEvent}
              onSnapToItem={index => setState({ activeIndex: index })} />
          </View>
        </ScrollView>
      </Content>
    </Container>
  )
}