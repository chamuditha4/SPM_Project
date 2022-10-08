import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body,
  Picker,
} from "native-base";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    AppRegistry,
    ScrollView,
    Dimensions,
    TextInput,
    Modal, AsyncStorage,
} from "react-native";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import constants from "../Constants/constants";

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2016-05-15",
      modalState: false,
        qrCode :'',
      TokenNo: 0,
        token:0,
        balance:0.00
    };
  }

  componentDidMount(){
      this.qrCodeFun();
  }


  manageSave = async ()  => {
    if (this.state.modalState === true) {
      this.setState({
        modalState: false,
      });
    } else if (this.state.modalState === false) {
      this.setState({
        modalState: true,
      });
    }
    this.getBalance();
  };

  getBalance(){
      axios.get(constants.spring_backend_url + '/api/user/checkbalance/'+this.state.qrCode)
          .then(res => {
              if(res.data!==null){
                  this.setState({
                      modalState: true,
                      balance :res.data
                  });
              }
          }).catch(function (error) {
      })
  }
    qrCodeFun = async () => {
        try {
            let qrCode = await AsyncStorage.getItem('tokenNumber');

            this.setState({
                qrCode: qrCode,
                loaderStatus: false
            })
        } catch (error) {

        }
    }

    refreshAccount(){
        if(this.state.token!= 0){
            console.log("token!!")
            if(this.state.balance != 0){
                console.log("balance")
                const refreshAcc={
                    token:this.state.token,
                    balance: this.state.balance
                }
                console.log(refreshAcc)
                axios.post(constants.spring_backend_url + '', refreshAcc)
                    .then(res => {
                        if(res.data!==null){
                            this.setState({
                                modalState: true,
                            });
                        }
                    }).catch(function (error) {
                })

            }else{}
        }else{}
    }

  render() {
    let screenwidth = Dimensions.get("window").width;
    let screeheight = Dimensions.get("window").height;
    var radio_props = [
      { label: "Male     ", value: 0 },
      { label: "Female", value: 1 },
    ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.5 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#154360",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                // backgroundColor: "green",
                marginLeft: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
                style={{ marginTop: 30 }}
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
                flex: 4,
                // backgroundColor: "purple",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  marginTop: 30,

                  fontWeight: "bold",
                }}
              >
                TICKET PICKER
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                // backgroundColor: "pink",
              }}
            ></View>
          </View>

          <View
            style={{
              flex: 1,

              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                // backgroundColor: "#689F38",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#154360",
                  fontWeight: "bold",
                  marginLeft: 20,
                }}
              >
                CHECK ACCOUNT DETAILS
              </Text>
            </View>
          </View>
        </View>
        {/* Modals are in this section */}

        <View>
          <Modal transparent={true} visible={this.state.modalState}>
            <View
              style={{
                backgroundColor: "#000000aa",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  paddingVertical: 20,
                  borderTopColor: "black",
                  paddingHorizontal: 10,
                  borderRadius: 23,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalState: false });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 20,
                      width: 300,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: "#222222",
                        }}
                      >
                        Account Balance
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 23,
                        width: 23,
                        borderRadius: 100,
                        backgroundColor: "#154360",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 30,
                      }}
                    >
                      <View>
                        <Text style={{ color: "white" }}>X</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: "#d3d3d3",
                    borderBottomWidth: 1,
                    padding: 10,
                  }}
                ></View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/Alerts/money.gif")}
                    style={{ height: 100, width: 100 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      marginBottom: 10,
                      fontSize: 18,
                    }}
                  >
                    Account Balance : Rs {this.state.balance} /=
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modalState: false });
                    }}
                    style={{
                      ...styles.button,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 180,
                      height: 40,
                      borderRadius: 30,
                      backgroundColor: "#154360",
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {/* Modal section over */}

        <View style={{ flex: 7 }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            ref={(node) => (this.scroll = node)}
            style={{
              flex: 10,
              backgroundColor: "#ffffff",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                flex: 1,
                marginTop: 10,
                width: screenwidth - 35,

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                marginLeft: 15,
                marginBottom: 20,
                marginRight: 20,
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ flex: 3, backgroundColor: "#fffffff" }}>
                  <View style={{ margin: 10, marginTop: 25 }}>
                    <View
                      style={{
                        backgroundColor: "#F2F4F4",
                        paddingBottom: 15,
                        borderRadius: 20,
                      }}
                    >

                      <View style={{ marginTop: 15 }}>
                        <Text
                          style={{ color: "#154360", marginHorizontal: 20 }}
                        >
                          Token Number
                        </Text>
                        <TextInput
                          onFocus={this.onFocus}
                          autoFocus={false}
                          keyboardType="number-pad"
                          placeholder=""
                          style={{
                            ...styles.textInput,
                            backgroundColor: "white",
                          }}
                          placeholderTextColor="#000000"
                          value={this.state.qrCode}
                          onChangeText={(TokenNo) =>
                            this.setState({ TokenNo })
                          }
                        ></TextInput>
                      </View>

                      <View style={{ marginTop: 15 }}>
                        <TouchableOpacity onPress={this.manageSave}>
                          <View
                            style={{
                              ...styles.button,
                              backgroundColor: "#154360",
                              borderWidth: 1,
                              borderColor: "white",
                              opacity: this.buttonOpacity,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              CHECK
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={{ marginTop: 10 }}>
                        <View
                          style={{
                            marginTop: 15,
                          }}
                        >
                          <Text
                            style={{
                              color: "#154360",
                              marginHorizontal: 20,
                            }}
                          >
                            Balance
                          </Text>
                          <TextInput
                            autoFocus={false}
                            editable={false}
                            placeholder="1000.00"
                            style={styles.textInput}
                            placeholderTextColor="#7F8C8D"
                          >
                              {this.state.balance}
                          </TextInput>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "#154360",
                              marginHorizontal: 20,
                            }}
                          >
                            Debits
                          </Text>
                          <TextInput
                            autoFocus={false}
                            editable={false}
                            placeholder="Debits"
                            style={styles.textInput}
                            placeholderTextColor="#7F8C8D"
                          />
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "#154360",
                              marginHorizontal: 20,
                            }}
                          >
                            Amount Paid for Others
                          </Text>
                          <TextInput
                            autoFocus={false}
                            editable={false}
                            placeholder="Paid"
                            style={styles.textInput}
                            placeholderTextColor="#7F8C8D"
                          />
                        </View>
                        <TouchableOpacity
                          style={{ marginTop: 10 }}
                          onPress={() => {
                            this.props.navigation.navigate(
                              "RefreshAccountDrawer"
                            );
                          }}
                        >
                          <View
                            style={{
                              ...styles.button,
                              backgroundColor: "#154360",
                              borderWidth: 1,
                              borderColor: "white",
                              opacity: this.buttonOpacity,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              REFRESH ACCOUNT
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AccountDetails;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "#154360",
  },
  textArea: {
    height: 200,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "#154360",
  },
});