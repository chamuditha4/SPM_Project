import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
} from "react-native";
import { AsyncStorage } from 'react-native';
import Svg, {Image, Circle, ClipPath} from "react-native-svg";
import Animated, {Easing} from "react-native-reanimated";
import {TapGestureHandler, State} from "react-native-gesture-handler";
import Success from "../success";
import Error from "../error";
import axios from 'axios';
import constants from "../Constants/constants";

const {width, height} = Dimensions.get("window");

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat,
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug("stop clock", stopClock(clock))),
        state.position,
    ]);
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: false,
            loginState: false,
            username: "",
            password: "",
        };
        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({state}) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        ),
                    ]),
            },
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({state}) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        ),
                    ]),
            },
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP,
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP,
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP,
        });
        this.logoY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [height / 3 + 40, 0],
            extrapolate: Extrapolate.CLAMP,
        });
    }

    manageNavigation = () => {


        if (this.state.username === "") {
            alert("Please enter username");
        } else if (this.state.password === "") {
            alert("plese enter password");
        } else {
            axios.get(constants.spring_backend_url + '/api/user/login/' + this.state.username + '/' + this.state.password)
                .then(res => {
                    if (res.data !=='') {
                        this.setState({
                            loginState: true,
                            modalState: true,
                        });
                        this.props.navigation.navigate("AppDrawer");
                        AsyncStorage.setItem(
                            'tokenNumber',
                            res.data.tokenNumber
                        );
                        AsyncStorage.setItem(
                            'name',
                            res.data.name
                        );

                        AsyncStorage.setItem(
                            'address',
                            res.data.address
                        );
                        AsyncStorage.setItem(
                            'nic',
                            res.data.nic
                        );
                        AsyncStorage.setItem(
                            'phoneNumber',
                            res.data.mobile
                        );
                        AsyncStorage.setItem(
                            'email',
                            res.data.email
                        );
                    } else {
                        this.setState({
                            loginState: false,
                            modalState: true,
                        });
                    }
                }).catch(function (error) {
                    console.log(error)
            })

        }
    };

    updateValue(text, field) {
        if (field == "username") {
            this.setState({
                username: text,
            });
        }
        if (field == "password") {
            this.setState({
                password: text,
            });
        }


    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "flex-end",
                }}
            >
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{translateY: this.bgY}],
                    }}
                >
                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height + 50} cx={width / 2}/>
                        </ClipPath>
                        <Image
                            href={require("../../assets/bground.jpg")}
                            height={height + 50}
                            width={width}
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#clip)"
                        />
                    </Svg>

                    <Animated.View
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            alignItems: "center",
                            marginTop: 120,
                            transform: [{translateY: this.logoY}],
                        }}
                    >
                        <Svg height={250} width={250}>
                            <Image
                                href={require("../../assets/logo.png")}
                                position="absolute"
                                height="100%"
                                width="100%"
                            />
                        </Svg>
                        <Text style={{fontWeight: "bold", fontSize: 18, color: "white"}}>
                            TICKETING SYSTEM
                        </Text>
                    </Animated.View>
                </Animated.View>
                <View style={{height: height / 3, justifyContent: "center"}}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View
                            style={{
                                ...styles.button,
                                backgroundColor: "#154360",
                                opacity: this.buttonOpacity,
                                borderColor: "white",
                                borderWidth: 2,
                                transform: [{translateY: this.buttonY}],
                            }}
                        >
                            <TouchableOpacity>
                                <Text
                                    style={{fontSize: 18, fontWeight: "bold", color: "white"}}
                                >
                                    LOGIN
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </TapGestureHandler>
                    <TapGestureHandler
                        onHandlerStateChange={() =>
                            this.props.navigation.navigate("Register")
                        }
                    >
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{translateY: this.buttonY}],
                            }}
                        >
                            <TouchableOpacity>
                                <Text
                                    style={{fontSize: 18, fontWeight: "bold", color: "#154360"}}
                                >
                                    REGISTER
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View
                        style={{
                            height: height / 3,
                            ...StyleSheet.absoluteFill,
                            top: null,
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{translateY: this.textInputY}],
                            justifyContent: "center",
                        }}
                    >
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text
                                    style={{
                                        fontSize: 15,
                                        color: "#154360",
                                        transform: [{rotate: concat(this.rotateCross, "deg")}],
                                    }}
                                >
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <TextInput
                            placeholder="USERNAME"
                            style={{
                                ...styles.textInput,
                                borderColor: "#154360",
                                borderWidth: 1,
                                backgroundColor: "white",
                            }}
                            placeholderTextColor="#154360"
                            onChangeText={(text) => this.updateValue(text, "username")}
                        />
                        <TextInput
                            placeholder="PASSWORD"
                            secureTextEntry={true}
                            style={{
                                ...styles.textInput,
                                borderColor: "#154360",
                                borderWidth: 1,
                                backgroundColor: "white",
                            }}
                            placeholderTextColor="#154360"
                            onChangeText={(text) => this.updateValue(text, "password")}
                        />

                        <View>
                            {this.state.loginState ? (
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
                                                        this.setState({modalState: false});
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
                                                    <Success/>
                                                    <Text
                                                        style={{
                                                            color: "#7F8C8D",
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        Login Successful
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
                                                            this.setState({modalState: false});
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
                            ) : (
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
                                                        this.setState({modalState: false});
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
                                                                Login Unsuccessfull !
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
                                                    <Error/>

                                                    <Text
                                                        style={{
                                                            color: "#7F8C8D",
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        Incorrect Username or password !
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
                                                            this.setState({modalState: false});
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
                            )}
                        </View>

                        <TouchableOpacity onPress={this.manageNavigation}>
                            <Animated.View
                                style={{...styles.button, backgroundColor: "#154360"}}
                            >
                                <Text
                                    style={{fontSize: 20, fontWeight: "bold", color: "#ffffff"}}
                                >
                                    Login
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

export default Login;

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
    closeButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -20,
        left: width / 2 - 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: "rgba(0,0,0,0.2)",
    },

    modalView: {
        width: "70%",
        margin: 10,
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});