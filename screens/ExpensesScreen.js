import React, { Component } from 'react';
import { View,Picker, Text, StyleSheet, Button, ListView,TouchableHighlight } from 'react-native';
//import * from 'react-navigation';
import firebase from 'firebase';
import AddExpense from './AddExpense';
import Basic from '.././components/card';
import { Dropdown } from 'react-native-material-dropdown';

const StatusBar = require('.././components/StatusBar');
const ActionButton = require('.././components/ActionButton');
const ListItem = require('.././components/ListItem');


class Expenses extends Component {
  constructor(props) {
   super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      totalsum: null,
      language: 'All'
    };
    
    }

  listenForItems() {
      console.log("upeer");
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/'+user.uid).child('expenses').on('value', (snap) => {

      // get children as an array
            var items = [],sum=0;
            snap.forEach((child) => {
             // console.log("listenme",child.val());
             sum+=parseInt(child.val().cost);
              items.push({
                //title: child.val().title,
                itemname:child.val().itemname,
                cost:child.val().cost,
                chosenDate:child.val().chosenDate,
                _key: child.key
              });
            });
            this.setState({
              totalsum: sum
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
  gotologin(){
    this.props.navigation.navigate('Welcome');
  }

  
  render(){
 
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row',paddingTop:20}}>
          <View style={{width:250}}> 
              <Text style={{paddingLeft: 25,fontWeight:'bold'}}>Total Expenses</Text>
              <Text style={ {paddingLeft: 25,fontWeight:'bold',textAlign:'left',color:'#1976D2'
              }}>   {'\u20B9'}  {this.state.totalsum}</Text>
            </View>
            
               <Picker
                selectedValue={this.state.language}
                style={{ width:120}}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Monthly" value="Monthly" />
                <Picker.Item label="Yearly" value="Yearly" />
                <Picker.Item label="Quaterly" value="Quaterly" />
              
              </Picker>
          </View>
 
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <TouchableHighlight style={styles.addButton}
            underlayColor='#ff7043' onPress={() => this.props.navigation.navigate('AddExpense')}>
            <Text style={{fontSize: 50, color: 'white'}}>+</Text>
        </TouchableHighlight>  

      </View>
    );
  }
  
}
export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:30
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
  addButton: {
    backgroundColor: '#ff0266',
  //  borderColor: '#ff5722',
  //  borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 100,
    shadowOffset: {
      height: 100,
      width: 100
    }
  }
});
