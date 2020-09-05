import React,{useState} from 'react'
import {View,Image,ScrollView,Linking} from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import Constants from 'expo-constants'
import dataWisata from '../../../mock/wisata.json'
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Contents({props}) {
  const [state,setState] = useState({
    activeIndex:0
  })
  function _renderItem({item,index}){
    return (
      <View style={{
          backgroundColor:'floralwhite',
          borderRadius: 5, }}>
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://i.ibb.co/pWm832K/airterjunsegenter1.jpg'}} />
                <Body>
      <Text>{item.nama_wisata}</Text>
      <Text note>{item.alamat_wisata}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://i.ibb.co/pWm832K/airterjunsegenter1.jpg'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent onPress={()=>{
                  // console.log(dataWisata.data[state.activeIndex].location.lat)
                  props.navigation.navigate("Maps",{lat:dataWisata&&dataWisata.data[state.activeIndex].location.lat,lng:dataWisata&&dataWisata.data[state.activeIndex].location.lng})
                }}>
                <Ionicons name="ios-car" size={20} color="blue" />
                                  <Text>Berangkat</Text>
                </Button>
              </Left>
              {/* <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right> */}
            </CardItem>
          </Card>
      </View>

    )
}
  return (
    <Container>
        <Header style={{marginTop:Constants.statusBarHeight, backgroundColor:"#f0932b"}}>
          <Body><Title style={{alignSelf:"center"}}>Tahura Nuraksa</Title></Body>
        </Header>
        <Content>
        <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://i.ibb.co/pWm832K/airterjunsegenter1.jpg'}} />
                <Body>
                  <Text>Tahura Nuraksa</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://i.ibb.co/pWm832K/airterjunsegenter1.jpg'}} style={{height: 200, width: "100%", flex: 1}}/>
                <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint blanditiis cum asperiores cupiditate omnis, praesentium veritatis magnam distinctio earum nam quod maxime corporis dolore ipsam laborum sequi saepe accusamus.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>{
                  Linking.openURL("https://nuraksasig.vercel.app")
                }}>
                  <Icon name="help" />
                  <Text>Check Our Website!</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <ScrollView>

    
          <Title style={{color:"black", marginLeft:10,borderBottomColor:"black",borderBottomWidth:1,marginRight:62,marginTop:Constants.statusBarHeight}}>Daftar Wisata</Title>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
          
          <Carousel
                  layout={"default"}
                  data={dataWisata.data}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setState({activeIndex:index}) } />
                  </View>
          <Title style={{color:"black", marginLeft:10,borderBottomColor:"black",borderBottomWidth:1,marginRight:62}}>Daftar Event</Title>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center' }}>

          <Carousel
                  layout={"default"}
                  data={dataWisata.data}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setState({activeIndex:index}) } />
                  </View>
                  </ScrollView>
        </Content>
      </Container>
  )
}