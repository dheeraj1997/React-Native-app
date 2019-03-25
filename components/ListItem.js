import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={styles.li}>
          <View style={{flex: 1, flexDirection: 'row'}}> 
            <View style={{width:200}}> 
              <Text style={{paddingLeft: 25}}>{this.props.item.itemname}</Text>
              <Text style={{paddingLeft:25, color:'#1976D2'}}>{'\u20B9'}  {this.props.item.cost}</Text>
            </View>
            <Text style={ {
                //textAlign: '', 
                //paddingTop: 10,
                //paddingLeft: 50,
               // paddingRight: -100,
                //paddingBottom: 2
                
              }}>{this.props.item.chosenDate}</Text>

          </View>
          
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
