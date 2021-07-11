import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { TouchableOpacity} from 'react-native-gesture-handler';

import firebase from 'firebase';

export default class PostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      light_theme: true
    }
  }

  componentDidMount(){
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({
          light_theme: theme === "light"
        })
      })
  }

  render() {
    if(!this.props.route.params){
      this.props.navigation.navigate("Home");
    }
    else {
      return (
       <View style = {this.state.light_theme ? styles.containerLight : styles.container}>
        <SafeAreaView style = {styles.droidSafeArea} />
        <View style = {styles.appTitle}>
          <View style = {this.state.light_theme ? styles.appIconLight : styles.appIcon}>
            <Image source = {require("../assets/logo.png")} style = {styles.iconImage}></Image>
          </View>
        <View style = {styles.appTitleTextContainer}>
          <Text style = {this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Spectagram</Text>
        </View>
        </View>
        <View style = {styles.storyContainer}>
          <ScrollView style = {this.state.light_theme ? styles.storyCardLight : styles.storyCard}>
            <Image
              source={require("../assets/post.jpeg")}
              style={styles.image}
            ></Image>
            <View style = {styles.dataContainer}>
              <View style = {styles.titleTextContainer}>
                <Text style = {this.state.light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>{this.props.route.params.post.author}</Text>
                <Text style = {this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{this.props.route.params.post.created_on}</Text>
                <Text style = {this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{this.props.route.params.post.caption}</Text>
              </View>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>12k</Text>
              </View>
            </View>
          </ScrollView>
        </View>
       </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  appIconLight: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "darkgrey"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20)
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "#eaeaea",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  storyTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  moralTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
