import React, {Component} from "react";
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
    Modal,
} from "react-native";
import DatePicker from "react-native-datepicker";
import axios from 'axios';
import constants from "../Constants/constants";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "2016-05-15",
            modalState: false,
            modalStateValidation: false,
            modalStatepayment: false,
            name: '',
            nic: '',
            mobileNo: '',
            address: '',
            email: '',
            paymentMode: '',
            cardHoldName: '',
            cardNo: '',
            expiredDate: '',
            cvcNo: '',
            password: '',
            conPassword: '',
            username: '',
            paymentMethodId: '',
            cardHoldersName: '',
            cardNumber: '',
            cvcNumber: '',
            expireDate: '',


            colorname: '#154360',
            colornic: '#154360',
            colormobileNo: '#154360',
            coloraddress: '#154360',
            coloremail: '#154360',
            colorpaymentMode: '#154360',
            colorcardHoldName: '#154360',
            colorcardNo: '#154360',
            colorexpiredDate: '#154360',
            colorcvcNo: '#154360',
            colorpassword: '#154360',
            colorconPassword: '#154360',
            colorusername: '#154360',
            colorpaymentMethodId: '#154360',
            colorcardHoldersName: '#154360',
            colorcardNumber: '#154360',
            colorcvcNumber: '#154360',
            colorexpireDate: '#154360',

            invalidText: '',
        };
    }


    manageSave = () => {
        console.log("modalstate : " + this.state.modalState);
        this.validateAllFields;
        if (this.state.modalState === true) {
            this.setState({
                modalState: false,
            });

        } else if (this.state.modalState === false) {
            this.addLocalUser();


        }

    };
    managePayment = () => {
        console.log("modalstate : " + this.state.modalStatepayment);

    if (this.state.modalStatepayment === true) {
        this.setState({
            modalStatepayment: false,
        });
    } else if (this.state.modalStatepayment === false) {
        this.setState({
            modalStatepayment: true,
        });
    }
};

validateAllFields = () => {
  console.log("card holder name : " + this.state.cardHoldersName);
  console.log("Card Number  :" + this.state.cardNumber );
  console.log("CVC :" + this.state.cvcNo);
  console.log("Date :" + this.state.expireDate );
  console.log("color :" + this.state.colorpaymentMode );

  this.setState({
      colorname:'#154360',
      colornic:'#154360',
      colormobileNo:'#154360',
      coloraddress:'#154360',
      coloremail:'#154360',
      colorpaymentMode:'#154360',
      colorcardHoldName:'#154360',
      colorcardNo:'#154360',
      colorexpiredDate:'#154360',
      colorcvcNo:'#154360',
      colorpassword:'#154360',
      colorconPassword:'#154360',
      colorusername:'#154360',
      colorpaymentMethodId:'#154360',
      colorcardHoldersName:'#154360',
      colorcardNumber:'#154360',
      colorcvcNumber:'#154360',
      colorexpireDate:'#154360',
      
  });
  console.log("color2 :" + this.state.colorpaymentMode );

  if(this.state.email == ""){
      this.setState({
          coloremail: "#E74C3C",
          
      });
      
  }else{
      if(!this.validateEmail(this.state.email)){
          this.setState({
              invalidText: "Email Address",
              modalStateValidation:true,
          });
         
      }
  }

 
  if(this.state.name == ""){
      this.setState({
          colorname: "#E74C3C",
          
      });
  }

  if(this.state.nic==""){
      this.setState({
          colornic: "#E74C3C",
      });
  }else{
     if(!this.validateNic(this.state.nic))
     {
      this.setState({
          invalidText: "NIC Number",
          modalStateValidation:true,
          
      });
     }
  }
  if(this.state.address==""){
      this.setState({
          coloraddress: "#E74C3C",
      });
  }
  if(this.state.mobileNo==""){
      this.setState({
          colormobileNo: "#E74C3C",
      });
  }
  
  // else{
  //     if(!this.validateMobilePhone(this.state.mobileNo)){
  //         alert("Invalid mobile")
  //     }

  // }

  if(this.state.username==""){
      this.setState({
          colorusername: "#E74C3C",
      });
  }
  if(this.state.password==""){
      this.setState({
          colorpassword: "#E74C3C",
         
      });
  }
  if(this.state.conPassword == ""){
      this.setState({
       
          colorconPassword: "#E74C3C",
      });
  }
  if(this.state.password!==this.state.conPassword){
      this.setState({
          colorpassword: "#E74C3C",
          colorconPassword: "#E74C3C",
      });
  }
  if(this.state.cardHoldersName==""){
      this.setState({
          colorcardHoldersName: "#E74C3C",
      });
  }
  if(this.state.cardNumber==""){
      this.setState({
          colorcardNumber: "#E74C3C",
      });
  }
 
  if(this.state.expireDate==""){
      this.setState({
          colorexpireDate: "#E74C3C",
      }); 
  }
  if(this.state.cvcNo == ""){
      this.setState({
          colorcvcNo: "#E74C3C",
      });
  }
  if(this.state.cardHoldersName !=="" && this.state.cardNumber !== "" && this.state.cvcNo !== "" && this.state.expireDate !== ""){
      
      this.setState({
          colorpaymentMode: "#154360",
      });
      console.log("color3 :" + this.state.colorpaymentMode );
  }else{
      this.setState({
          colorpaymentMode: "#E74C3C",
      });
      console.log("color4 else :" + this.state.colorpaymentMode );
  }



  this.manageSave();

};

addLocalUser() {

  if (this.validateEmail(this.state.email)) {
      console.log("0")
     
      if(this.state.name!=""){
          console.log("1")
          if(this.validateNic(this.state.nic)){
              console.log("2")
              if(this.state.address!=""){
                  console.log("3")
                  if(this.state.mobileNo!=""){
                      console.log("4")
                      if(this.state.username!=""){
                          console.log("5")
                          if(this.state.password==this.state.conPassword){
                              console.log("6")
                              if(this.state.cardHoldersName!=""){
                                  console.log("7")
                                  if(this.state.cardNumber!=""){
                                      console.log("8")
                                      if(this.state.expireDate!=""){
                                          console.log("9")
                                          if(this.state.cvcNo){
                                              console.log("10")
                                           
                                              axios.get(constants.spring_backend_url + '/api/user/checkusernameisexists/'+ this.state.username)
                                                  .then(res => {
                                                      if(res.data!==true){
                                                          const localUser={
                                                              userId:0,
                                                              address: this.state.address,
                                                              email:this.state.email,
                                                              tokenNumber:this.state.nic,
                                                              localUser:{
                                                                  localUserId:0,
                                                                  paymentMethod:{
                                                                      "paymentMethodId":0,
                                                                      cardHoldersName: this.state.cardHoldersName,
                                                                      cardNumber: this.state.cardNumber,
                                                                      cvcNumber:this.state.cvcNo,
                                                                      expireDate:this.state.expireDate
                                                                  }
                                                              },
                                                              mobile:this.state.mobileNo,
                                                              name: this.state.name,
                                                              userName :this.state.username,
                                                              nic:this.state.nic,
                                                              password:this.state.password,
                                                              role:"local user"
                                                          }
                                                          axios.post(constants.spring_backend_url + '/api/localuser/create', localUser)
                                                              .then(res => {
                                                                  if(res.data!==null){
                                                                      this.setState({
                                                                          modalState: true,
                                                                      });
                                                                  }
                                                              }).catch(function (error) {
                                                          })
                                                      }else{
                                                          alert("User Name Is Exists In the System.Please Enter Another One");
                                                      }

                                                  }).catch(function (error) {
                                                  console.log(error)
                                              })

                                          }else{}
                                      }else{}
                                  }else{}
                              }else{}
                          }else{}
                      }else{}
                  }else{}
              }else{}
          }else{}
      }else{}
  }

};

validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
validateNic =nic=>{
  var nicReg=/^[0-9]{9}[vVxX]$/;
  return nicReg.test(nic);
}
validateMobilePhone =mobileNo=>{
  var mobileNoReg=/^[8]*01[15-9]\d{8}$/;
  return mobileNoReg.test(mobileNo);
}
    render() {
        let screenwidth = Dimensions.get("window").width;
        let screeheight = Dimensions.get("window").height;
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 0.18,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    color: "#154360",
                                    marginTop: 40,
                                }}
                            >
                                Create Your Account Here
                            </Text>
                        </View>
                    </View>
                </View>
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
                            <View
                                style={{
                                    flex: 3,
                                    backgroundColor: "#fffffff",
                                }}
                            >
                                <View
                                    style={{
                                        margin: 10,
                                        marginTop: 25,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginTop: 15,
                                        }}
                                    >
                                        <Text
                                            style={{
                  
                                                marginHorizontal: 20,
                                                color:this.state.colorname
                                            }}
                                        >
                                            Name
                                        </Text>
                                        <TextInput
                                            onFocus={this.onFocus}
                                            autoFocus={false}
                                            placeholder="John Doe"
                                            style={{...styles.textInput ,borderColor: this.state.colorname}}
                                            placeholderTextColor="#7F8C8D"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    name:text
                                                })
                                            }
                                        />
                                    </View>

                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.colornic,
                        marginHorizontal: 20,
                      }}
                    >
                      NIC Number
                    </Text>
                    <TextInput
                      autoFocus={false}
                      placeholder="960591313V"
                      style={{...styles.textInput ,borderColor:this.state.colornic,}}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(text) =>
                          this.setState({
                              nic:text
                          })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.colormobileNo,
                        marginHorizontal: 20,
                      }}
                    >
                      Mobile Number
                    </Text>
                    <TextInput
                      onFocus={this.onFocus}
                      keyboardType="number-pad"
                      autoFocus={false}
                      placeholder="0776355192"
                      style={{...styles.textInput ,borderColor: this.state.colormobileNo,}}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(text) =>
                          this.setState({
                              mobileNo:text
                          })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.coloraddress,
                        marginHorizontal: 20,
                      }}
                    >
                      Address
                    </Text>
                    <TextInput
                      autoFocus={false}
                      placeholder="SLIIT, Sri lanka"
                      style={{...styles.textInput ,borderColor:  this.state.coloraddress,}}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(text) =>
                          this.setState({
                              address:text
                          })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.coloremail,
                        marginHorizontal: 20,
                      }}
                    >
                      Email
                    </Text>
                    <TextInput
                      autoFocus={false}
                      placeholder="samithaperera@gmail.com"
                      style={{...styles.textInput , borderColor: this.state.coloremail}}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(text) =>
                          this.setState({
                              email:text
                          })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.colorpaymentMode,
                        marginHorizontal: 20,
                      }}
                    >
                      Account Details
                    </Text>

                    <TouchableOpacity
                      onPress={this.managePayment}
                      style={{
                        ...styles.textInput,
                        backgroundColor: "white",
                        borderColor:this.state.colorpaymentMode
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 10,
                          color: "#7F8C8D",
                        }}
                      >
                        Account Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                    <View
                        style={{
                            marginTop: 15,
                        }}
                    >
                        <Text
                            style={{
                              color: this.state.colorusername,
                              marginHorizontal: 20,
                            }}
                        >
                            Username
                        </Text>
                        <TextInput
                            autoFocus={false}
                            placeholder="JohnDoe"
                            style={{...styles.textInput ,borderColor:this.state.colorusername,}}
                            placeholderTextColor="#7F8C8D"
                            onChangeText={(text) =>
                                this.setState({
                                    username:text
                                })
                            }
                        />
                    </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.colorpassword,
                        marginHorizontal: 20,
                      }}
                    >
                      Password
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      onFocus={this.onFocus}
                      autoFocus={false}
                      placeholder="*****"
                      style={{
                        ...styles.textInput,
                                                borderColor:this.state.colorpassword,
                                                backgroundColor: "white",
                      }}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(unitPrice) =>
                        this.setState({
                          unitPrice,
                            password:unitPrice
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.colorconPassword,
                        marginHorizontal: 20,
                      }}
                    >
                      Confirm Password
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      onFocus={this.onFocus}
                      autoFocus={false}
                      placeholder="*****"
                      style={{
                        ...styles.textInput,
                                                borderColor:this.state.colorconPassword,
                                                backgroundColor: "white",
                      }}
                      placeholderTextColor="#7F8C8D"
                      onChangeText={(unitPrice) =>
                        this.setState({
                          unitPrice,
                            conPassword:unitPrice
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <TouchableOpacity onPress={this.validateAllFields}>
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
                          Register
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ForeignRegister");
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
                          Foreign Registration
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
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
                        Successfull !
                      </Text>
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
                    source={require("../../assets/Alerts/a2.gif")}
                    style={{ height: 150, width: 150 }}
                  />
                  <Text
                    style={{
                      color: "#7F8C8D",
                      marginBottom: 10,
                    }}
                  >
                    Registered Successfully
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
                      this.props.navigation.navigate("Login");
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

{/* Payment method */}
        <View>
                    <Modal transparent={true} visible={this.state.modalStatepayment}>
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
                                        this.setState({ modalStatepayment: false });
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
                                               Account Details
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
                                        marginTop: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#154360",
                                            marginHorizontal: 20,
                                            

                                        }}
                                    >
                                        Transport Provider Account
                                    </Text>

                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignContent: "center",
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Image
                                            source={require("../../assets/PaymentMethods/logo.png")}
                                            style={{ height: 80, width: 80 }}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginTop: 15,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: this.state.colorcardHoldersName,
                                                marginHorizontal: 20,
                                            }}
                                        >
                                            Card Holder's Name
                                        </Text>
                                        <TextInput
                                            autoFocus={false}
                                            placeholder="Name"
                                            style={{...styles.textInput ,borderColor: this.state.colorcardHoldersName,}}
                                            placeholderTextColor="#7F8C8D"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    cardHoldersName:text
                                                })
                                            }
                                        />
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 15,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: this.state.colorcardNumber,
                                                marginHorizontal: 20,
                                            }}
                                        >
                                            Card Number
                                        </Text>
                                        <TextInput
                                            keyboardType="number-pad"
                                            autoFocus={false}
                                            placeholder="Card No"
                                            style={{...styles.textInput ,borderColor: this.state.colorcardNumber,}}
                                            placeholderTextColor="#7F8C8D"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    cardNumber:text
                                                })
                                            }
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
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
                                                Expired Date
                                            </Text>
                                            <DatePicker
                                                style={{ ...styles.textInput }}
                                                date={this.state.date}
                                                mode="date"
                                                placeholder="select date"
                                                format="YYYY-MM-DD"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    dateInput: {
                                                        borderColor: "white",
                                                    },
                                                }}
                                                onDateChange={(date) => {
                                                    this.setState({ expireDate: date });
                                                }}

                                            />
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 15,
                                                flex: 1,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: this.state.colorcvcNo,
                                                    marginHorizontal: 20,
                                                }}
                                            >
                                                CVC
                                            </Text>
                                            <TextInput
                                                keyboardType="number-pad"
                                                autoFocus={false}
                                                placeholder="CVC"
                                                style={{...styles.textInput ,borderColor: this.state.colorcvcNo,}}
                                                placeholderTextColor="#7F8C8D"
                                                onChangeText={(text) =>
                                                    this.setState({
                                                        cvcNo:text
                                                    })
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: "#d3d3d3",
                                            borderBottomWidth: 1,
                                            padding: 10,
                                        }}
                                    ></View>
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
                      this.setState({ modalStatepayment: false });
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

        {/* Validation modal */}

<View>
                    <Modal transparent={true} visible={this.state.modalStateValidation}>
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
                                        this.setState({ modalStateValidation: false });
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
                                                Warning !
                                            </Text>
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
                                        source={require("../../assets/Alerts/warning.gif")}
                                        style={{ height: 80, width:80 }}
                                    />
                                    <Text
                                        style={{
                                            color: "#7F8C8D",
                                            marginBottom: 10,
                                            marginTop:10
                                        }}
                                    >
                                        Invalid {this.state.invalidText}
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
                                            this.setState({ modalStateValidation: false });
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
      </View>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 70,
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
});