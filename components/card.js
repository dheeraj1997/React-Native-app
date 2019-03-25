import React, { Component } from "react";
import {StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right
} from "native-base";
//import styles from "./styles";

class Basic extends Component {
  render() {
    return (
      

        <Content padder>
          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text>Item Name : {this.props.itemname} </Text>
                <Text>Cost :</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
    );
  }
}

export default Basic;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  }
});
 