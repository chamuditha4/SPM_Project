import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
// import { ScrollView } from "react-native-gesture-handler";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/Styles/bg.jpg")}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
              style={{ marginTop: 50, marginLeft: 20 }}
            >
              <FontAwesome5
                name="bars"
                size={24}
                color="#000000"
              ></FontAwesome5>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 32,
                color: "#154360",
              }}
            >
              - TICKET PICKER -
            </Text>
          </View>

          <ScrollView>
            <View style={styles.container}>
              {/* category card start------------------------------------------------------------------------------------------------------------------- */}

              <View
                style={{
                  backgroundColor: "rgba(52, 52, 52, 0.0)",
                  marginTop: 80,
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 23,
                }}
              >
                <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("StartRideDrawer");
                }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: 5,
                      borderTopColor: "black",
                      paddingHorizontal: 3,
                      borderRadius: 23,
                      width: 350,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#154360",
                        paddingVertical: 30,
                        borderTopColor: "black",
                        paddingHorizontal: 30,
                        borderRadius: 23,
                        width: 340,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flex: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 24,
                              color: "white",
                            }}
                          >
                            START RIDE
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",

                    alignItems: "center",

                    right: 20,
                    bottom: 80,
                  }}
                >
                  <Image
                    source={require("../../assets//Styles/bus.png")}
                    style={{ height: 80, width: 80 }}
                  />
                </View>
              </View>

              {/* category card------------------------------------------------------------------------------------------------------------------- */}

              {/* category card start------------------------------------------------------------------------------------------------------------------- */}

              <View
                style={{
                  backgroundColor: "rgba(52, 52, 52, 0.0)",
                  marginTop: 30,
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 23,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("AccountDetailsDrawer");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: 5,
                      borderTopColor: "black",
                      paddingHorizontal: 3,
                      borderRadius: 23,
                      width: 350,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#154360",
                        paddingVertical: 30,
                        borderTopColor: "black",
                        paddingHorizontal: 30,
                        borderRadius: 23,
                        width: 340,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flex: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 24,
                              color: "white",
                            }}
                          >
                            ACCOUNT DETAILS
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",

                    alignItems: "center",

                    right: 20,
                    bottom: 90,
                  }}
                >
                  <Image
                    source={require("../../assets//Styles/money.png")}
                    style={{ height: 80, width: 80 }}
                  />
                </View>
              </View>

              {/* category card------------------------------------------------------------------------------------------------------------------- */}

              {/* category card start------------------------------------------------------------------------------------------------------------------- */}

              <View
                style={{
                  backgroundColor: "rgba(52, 52, 52, 0.0)",
                  marginTop: 30,
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 23,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("profileDrawer");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: 5,
                      borderTopColor: "black",
                      paddingHorizontal: 3,
                      borderRadius: 23,
                      width: 350,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#154360",
                        paddingVertical: 30,
                        borderTopColor: "black",
                        paddingHorizontal: 30,
                        borderRadius: 23,
                        width: 340,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flex: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 24,
                              color: "white",
                            }}
                          >
                            PROFILE
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",

                    alignItems: "center",

                    right: 20,
                    bottom: 70,
                  }}
                >
                  <Image
                    source={require("../../assets/Styles/account.png")}
                    style={{ height: 80, width: 80 }}
                  />
                </View>
              </View>

              {/* category card------------------------------------------------------------------------------------------------------------------- */}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});