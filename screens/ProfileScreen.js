import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      first_name: null,
      last_name: null,
      gmail: null,
      profile_picture: null,
      created_at:null
   };
  }
 componentWillMount() {
    this.getuserinfo();
  }
getuserinfo(){
  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        firebase.database().ref('users/'+user.uid).on('value', (snap) => {
             // console.log("listenme",child.val());
                //console.log("hhh",snap.val().gmail);
                //return gmailid=snap.val(); 
                 this.setState({
                    first_name: snap.val().first_name,
                    last_name: snap.val().last_name,
                    gmail: snap.val().gmail,
                    profile_picture: snap.val().profile_picture,
                    created_at: new Date(snap.val().created_at).toLocaleDateString("en-US") 
                });
                //return snap.val().gmail;
          });
        } else {
        }
  }.bind(this));
}


  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:this.state.profile_picture}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.first_name} {this.state.last_name}</Text>
              <Text style={styles.info}>{this.state.gmail}</Text>
              <Text style={styles.description}>You Joined Expense Manager on {this.state.created_at} </Text>
              
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text>Edit Your Profile</Text>  
              </TouchableOpacity>              
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});