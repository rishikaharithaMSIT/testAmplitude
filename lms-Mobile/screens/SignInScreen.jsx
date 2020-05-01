import React, {Component} from 'react'
import * as Google from 'expo-google-app-auth';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { logger } from 'react-native-logs';
import { AsyncStorage } from 'react-native';
import * as Amplitude from 'expo-analytics-amplitude';

class SignInScreen extends Component {
   state = {
     InvalidUser: false
   }
  signInWithGoogleAuth = async() => {
    Amplitude.logEvent("In signin screen")
    var log = logger.createLogger();
    try{
      const result = await Google.logInAsync({
        // androidClientId:'847482059081-bhn4rte6gbiln5bv8abmgsjgndlc2ose.apps.googleusercontent.com',
        androidClientId:'148455826215-4ueofqrrbip53f4k6c942llsvqk37fgq.apps.googleusercontent.com',
        androidStandaloneAppClientId: '148455826215-lpfcpfstl3uvudi7mdf71vtq5pjlmjrs.apps.googleusercontent.com',

      });
      if(result.type === 'success'){
        //local server url with IP:port
        url = 'http://192.168.43.14:3000/api/auth/mlogin'
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": result.user.email,
            "accessToken": result.accessToken,
          }),
        }).then(response => response.json())
              .then(json => {
                // console.log(json);
                if(json.token === undefined){
                 this.setState({InvalidUser: true})
                  log.debug(json);
                }else{
                 AsyncStorage.setItem('userDetails', JSON.stringify(json));
                 AsyncStorage.getItem('userDetails')
                  .then((data) => {
                        console.log(data);
                        Amplitude.logEvent("signed in")
                        Amplitude.setUserId(result.user.email)
                        // var date = new Date().getDate();
                        // Amplitude.logEventWithProperties("user signed in", {date : date})
                        this.props.navigation.navigate('Home');
                  }); 
                }
              })
              .catch(error => {
                // console.log("error here");
                Amplitude.logEvent("Invalid user")
                this.setState({InvalidUser: true})
                log.debug(error);
              });
    }
    }
    catch(e){
      // console.log("error here in catch");
      return {error: true}
    }
}

render() {
  if(this.state.InvalidUser){
    return (
        <View style = {styles.container}>
          <Image source = {{uri:'https://i.ibb.co/7R8FGgK/msitlogo-1-3.png'}}
   style = {{ width: 138, height: 165, alignItems: 'center', bottom:90}}></Image>
          <Text style={{alignContent:"center", left:10}}>This app allows users from the class of 2021 who </Text>
          <Text style={{alignContent:"center", left:10}}>have a valid msitprogram.net email account.</Text>
            <Text style={{alignContent:"center", left:10}}>Please contact help@msitprogram.net in for help.</Text>
            <Text>{"\n"}</Text> 
            <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]} onPress={() => this.signInWithGoogleAuth()}>
              <View style={styles.socialButtonContent}>
                <Text style={styles.loginText}>Sign-in with Google</Text>
              </View>  
            </TouchableOpacity>
    </View>
    );
  }
  else{
    return (
     
      <View style = {styles.container}>
         <Image source = {{uri:'https://i.ibb.co/7R8FGgK/msitlogo-1-3.png'}}
   style = {{ width: 138, height: 165, alignItems: 'center', bottom:90}}></Image>
            <Text style={{fontWeight: "bold", fontSize:25, paddingBottom:50}}>Welcome to MSIT-LMS</Text>
            <Text style={{alignContent:"center", left:10}}>Please login with your msitprogram.net</Text>
            <Text style={{alignContent:"center", left:10}}> google account to use the App.</Text>
            <Text>{"\n"}</Text>      
            <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]} onPress={() => this.signInWithGoogleAuth()}>
            <View style={styles.socialButtonContent}>
              <Text style={styles.loginText}>Sign-in with Google</Text>
            </View>
        </TouchableOpacity>                                       
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},

inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:30,
  borderBottomWidth: 1,
  width:250,
  height:45,
  marginBottom:15,
  flexDirection: 'row',
  alignItems:'center'
},
inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},
icon:{
width:15,
height:15,
},
inputIcon:{
marginLeft:15,
justifyContent: 'center'
},
buttonContainer: {
height:45,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginBottom:20,
width:250,
borderRadius:30,
},
loginButton: {
backgroundColor: '#3498db',
},
fabookButton: {
backgroundColor: "#3b5998",
},
googleButton: {
backgroundColor: "#3498db",
},
loginText: {
color: 'white',
fontSize: 17,
},
restoreButtonContainer:{
width:250,
marginBottom:15,
alignItems: 'flex-end'
},
socialButtonContent:{
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center', 
},
socialIcon:{
color: "#FFFFFF",
marginRight:5
}
});
 
export default SignInScreen;