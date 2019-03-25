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
  Text,
  TextInput
} from "native-base";

import firebase from 'firebase';

class AddExpense extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date() ,
      itemname: null,
      cost: null
   };

    this.setDate = this.setDate.bind(this);
   // this.setItem = this.setItem.bind(this);
   // this.setCost = this.setCost.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  // setItem(newItem){
  //   this.setState({ itemname: newItem });
  // }
  // setCost(newCost){
  //   this.setState({ cost: newCost });
  // }
  validate() {
    if(this.state.itemname==null||this.state.cost==null){
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
        console.log(this.state.itemname);
        console.log(this.state.cost);
        console.log(this.state.chosenDate.toString().substr(4, 12));
        var user=firebase.auth().currentUser
            if (user) {      
                    console.log(user.uid);
                    //var newPostKey = firebase.database().ref().child('expenses').push().key;
                    firebase
                      .database()
                      .ref('users/'+user.uid+'/expenses')
                      .push({
                       // userid:user.uid,
                        itemname: this.state.itemname,
                        cost: this.state.cost,
                        chosenDate: this.state.chosenDate.toString().substr(4, 12)
                      })
                      .then(function(snapshot) {
                        // console.log('Snapshot', snapshot);
                         console.log("ehat the fck",user.uid);
                         //this.props.navigation.navigate('Dashboard');
                         //navigation.openDrawer();
                      });
              
            
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
              <Label>Name of Expenses</Label>
              <Input  maxLength={15} onChangeText={(itemname) => this.setState({itemname})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Expenses Amount</Label>
              <Input keyboardType='numeric' maxLength={15} onChangeText={(cost) => this.setState({cost})}/>
            </Item>
            <Content padder style={{ backgroundColor: "#fff" }}>
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
          />
          <Text>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>
        </Content>
         
          <Button block style={{ margin: 15, marginTop: 50 ,backgroundColor: '#1976D2'}}  color='#1976D2' onPress={() => {this.onSubmit();}}>
            <Text>Add</Text>
          </Button>
         </Form>
        </Content>

      </Container>
        
      </View>
    );
  }
}
export default AddExpense;



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
