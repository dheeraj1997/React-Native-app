import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ListView,TouchableHighlight } from 'react-native';
//import * from 'react-navigation';
import firebase from 'firebase';
import AddExpense from './AddExpense';
import Basic from '.././components/card';
const StatusBar = require('.././components/StatusBar');
const ActionButton = require('.././components/ActionButton');
const ListItem = require('.././components/ListItem');

class DashboardScreen extends Component {

  constructor(props) {
   super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    
    }

  listenForItems() {
      console.log("upeer");
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/'+user.uid).child('expenses').on('value', (snap) => {

      // get children as an array
            var items = [];
            snap.forEach((child) => {
             // console.log("listenme",child.val());
              items.push({
                //title: child.val().title,
                itemname:child.val().itemname,
                cost:child.val().cost,
                chosenDate:child.val().chosenDate,
                _key: child.key
              });
            });

            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(items)
            });

          });
        } else {
          // No user is signed in.
        }
      }.bind(this));

      
  }
  componentDidMount() {
    this.listenForItems();
  }
  _renderItem(item) {
    //console.log(items);
    return (
      <ListItem item={item}  />
    );
  }

  addExpense(){
    this.props.navigation.navigate('AddExpense');
  }
  gotologin(){
    this.props.navigation.navigate('LoinScreen');
  }
  
  render(){
    return (
      <View style={styles.container}>

        <StatusBar title="Expenses List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <Button style={styles.plusbutton} title="Add" onPress={() => {this.addExpense();
          console.log("iam pressed");}} /> 
        <Button title="Sign out" onPress={() => {firebase.auth().signOut();
                this.gotologin();}} />

      </View>
    );
  }
  
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  plusbutton:{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:50
  },
  listview: {
    flex: 1,
  },
});
