import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    ImageBackground,
    Dimensions,
    CheckBox,
    Image,
    Modal,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import DatePicker from "react-native-datepicker";
import {FontAwesome5} from "@expo/vector-icons";
import axios from 'axios';
import constants from "../Constants/constants";

const qr = '';
export default class TransportManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorCC: "grey",
            colorFC: "#154360",
            date: "2020-10-15",
            fromLocation: '',
            toLocation: '',
            totalAmount: '0',
            totalAmountLoader: true
        };
        this.updateValue = this.updateValue.bind(this);
        this.validateAllFields = this.validateAllFields.bind(this);
    }

    updateValue(text, field) {
        if (field == "fromLocation") {
            this.setState({
                fromLocation: text,
            });
            console.log(this.state.fromLocation);
        }
        if (field == "toLocation") {
            this.setState({
                toLocation: text,
            });
            console.log(this.state.toLocation);

        }
    }

    validateAllFields() {
        if (this.state.date !== '') {
            if (this.state.fromLocation !== '') {
                if (this.state.toLocation !== '') {
                    axios.get(constants.spring_backend_url + '/api/ride/rideamount/' + this.state.fromLocation + '/' +
                        this.state.toLocation + '/' + this.state.date
                    )
                        .then(res => {
                            if (res.data !== 0) {
                                this.setState({
                                    totalAmountLoader: false,
                                    totalAmount: res.data,
                                    toLocation :'',
                                    fromLocation:''
                                });
                            }
                        }).catch(function (error) {
                    })
                } else {
                    alert('To Location Field is Empty');
                }
            } else {
                alert('From Location Field is Empty');
            }
        } else {
            alert('Date Field is Empty');
        }
    }

    render() {
        let screenwidth = Dimensions.get("window").width;
        let screeheight = Dimensions.get("window").height;
        return (


            <View style={{flex: 1}}>
                <View style={{flex: 1.5}}>
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
                                style={{marginTop: 30}}
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
                                flex: 2,
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
                                Administration
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                // backgroundColor: "pink",
                            }}
                        ></View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1, marginTop: 10}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: 400});
                                    this.setState({colorCC: "#154360", colorFC: "grey"});
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.nav,
                                        backgroundColor: this.state.colorCC,
                                        borderWidth: 1,
                                        borderColor: "white",
                                        opacity: this.buttonOpacity,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        CROWD CONTROL
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, marginTop: 10}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: -400});
                                    this.setState({colorCC: "grey", colorFC: "#154360"});
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.nav,
                                        backgroundColor: this.state.colorFC,
                                        borderWidth: 1,
                                        borderColor: "white",
                                        opacity: this.buttonOpacity,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        FEE COLLECTOR
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 7,
                            backgroundColor: "#689F38",
                            flexDirection: "row",
                        }}
                    >
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            ref={(node) => (this.scroll = node)}
                            style={{
                                flex: 9,
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
                                <View style={{flex: 3, backgroundColor: "#fffffff"}}>

                                    <ScrollView>
                                        <View style={{margin: 10, marginTop: 25}}>
                                            <View style={{
                                                backgroundColor: "#F2F4F4",
                                                paddingBottom: 15,
                                                borderRadius: 20,
                                            }}>
                                                <View>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        Date
                                                    </Text>
                                                    <DatePicker
                                                        style={{...styles.textInput, width: 315}}
                                                        date={this.state.date}
                                                        mode="date"
                                                        placeholder="select date"
                                                        format="YYYY-MM-DD"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        customStyles={{
                                                            dateInput: {
                                                                borderColor: "#F2F4F4",
                                                            },
                                                        }}
                                                        onDateChange={(date) => {
                                                            this.setState({date: date});
                                                        }}
                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        From Location
                                                    </Text>
                                                    <TextInput
                                                        style={{}}
                                                        autoFocus={false}
                                                        placeholder="Kaduwela"
                                                        style={styles.textInput}
                                                        placeholderTextColor="#C0C0C0"
                                                        onChangeText={(text) => this.updateValue(text, "fromLocation")}

                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        To Location
                                                    </Text>
                                                    <TextInput
                                                        onFocus={this.onFocus}
                                                        autoFocus={false}
                                                        placeholder="Colombo"
                                                        style={styles.textInput}
                                                        placeholderTextColor="#C0C0C0"
                                                        onChangeText={(text) => this.updateValue(text, "toLocation")}

                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
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
                                                                CHECK
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            <View style={{marginTop: 15}}>
                                                <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                    Total Amount
                                                </Text>

                                                {
                                                    this.state.totalAmountLoader ?
                                                        <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                          RS : {this.state.totalAmount}
                                                        </Text>
                                                        :
                                                        <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                         RS : {this.state.totalAmount}
                                                        </Text>
                                                }


                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>


                            </View>

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
                                    marginLeft: 5,
                                    marginBottom: 20,
                                    marginRight: 15,
                                }}
                            >
                                <View style={{flex: 3, backgroundColor: "#fffffff"}}>


                                    <ScrollView>
                                        <View style={{margin: 10, marginTop: 10}}>
                                            <View style={{
                                                backgroundColor: "#F2F4F4",
                                                paddingBottom: 15,
                                                borderRadius: 20,
                                            }}>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        Date
                                                    </Text>
                                                    <DatePicker
                                                        style={{...styles.textInput, width: 315}}
                                                        date={this.state.date}
                                                        mode="date"
                                                        placeholder="select date"
                                                        format="YYYY-MM-DD"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        customStyles={{
                                                            dateInput: {
                                                                borderColor: "#F2F4F4",
                                                            },
                                                        }}
                                                        onDateChange={(date) => {
                                                            this.setState({date: date});
                                                        }}
                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        Day
                                                    </Text>
                                                    <DatePicker
                                                        style={{...styles.textInput, width: 315}}
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
                                                            this.setState({date: date});
                                                        }}
                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        Time
                                                    </Text>
                                                    <TextInput
                                                        onFocus={this.onFocus}
                                                        autoFocus={false}
                                                        placeholder="12:00"
                                                        style={styles.textInput}
                                                        placeholderTextColor="#C0C0C0"
                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                        Bus Number
                                                    </Text>
                                                    <TextInput
                                                        autoFocus={false}
                                                        secureTextEntry={true}
                                                        placeholder="--enter--"
                                                        style={styles.textInput}
                                                        placeholderTextColor="#C0C0C0"
                                                    />
                                                </View>
                                                <View style={{marginTop: 15}}>
                                                    <TouchableOpacity>
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
                                            <View style={{marginTop: 15}}>
                                                <Text style={{color: "#154360", marginHorizontal: 20}}>
                                                    Number of people travelled
                                                </Text>
                                                <TextInput
                                                    autoFocus={false}
                                                    secureTextEntry={true}
                                                    placeholder="Number"
                                                    style={styles.textInput}
                                                    placeholderTextColor="#C0C0C0"
                                                />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

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
    nav: {
        backgroundColor: "white",
        height: 40,
        marginHorizontal: 3,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",

    },
});
  