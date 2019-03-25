import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  DatePicker,
  Right,
  Icon,
  Form,
  Text
} from "native-base";

import firebase from 'firebase';

class EditProfile extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      first_name: null,
      last_name: null,
      gmail: null
   };
  }
  validate() {
    if(this.state.first_name==null||this.state.last_name==null){
        return 0;
    }
    else{
      return 1;
    }
    
  }

  onSubmit(){
    if(!this.validate()){
        alert("All fields Required !");
    }
    else{
          console.log(this.state.first_name);
    console.log(this.state.last_name);
    console.log(this.state.gmail);

    var user=firebase.auth().currentUser
        if (user) {      
         // console.log(user.uid);
          //var newPostKey = firebase.database().ref().child('expenses').push().key;
          firebase.database().ref('users/'+user.uid+'/first_name').set(this.state.first_name);
          firebase.database().ref('users/'+user.uid+'/last_name').set(this.state.last_name);
          firebase.database().ref('users/'+user.uid+'/gmail').set(this.state.gmail);
          this.props.navigation.navigate('dashboard');        
      } 
        else {
          this.props.navigation.navigate('Welcome');
        }
    //   }.bind(this)
    // );
    this.props.navigation.goBack();

    }

  }
  render() {
    return (
      <View style={styles.container}>
        <Container style={styles.container2}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input  onChangeText={(first_name) => this.setState({first_name})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Last Name</Label>
              <Input  onChangeText={(last_name) => this.setState({last_name})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Gmail ID</Label>
              <Input  onChangeText={(gmail) => this.setState({gmail})}/>
            </Item>
         
          <Button block style={{ margin: 15, marginTop: 50,backgroundColor: '#1976D2' }} color='#1976D2' onPress={() => {this.onSubmit();
          }}>
            <Text>Update</Text>
          </Button>
         </Form>
        </Content>

      </Container>
        
      </View>
    );
  }
}
export default EditProfile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    backgroundColor: "#FFF",
    marginTop:30
  }
});
