import React, { Component } from 'react';
import { View,Image, Picker,Text, SafeAreaView,ScrollView ,StyleSheet, Button } from 'react-native';
import Icon from '@expo/vector-icons/Entypo';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu"

import WelcomeScreen from './screens/WelcomeScreen';
import Expenses from './screens/ExpensesScreen';
import AddExpense from './screens/AddExpense';
import Profile from './screens/ProfileScreen';
//import Settings from './screens/SettingScreen';
import EditProfile from './screens/EditProfile';

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);


class App extends Component {

  async componentWillMount() {
      await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
     });
    }
  render() {
    return <AppContainer />;
  }
}
export default App;


class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const DeawerUpper =(props)=>(
  <SafeAreaView style={{fles:1}}>
    <View style={{backgroundColor: '#1976D2'}}>
    <Text style={{margin:20,paddingLeft: 20,color:'#BBDEFB',paddingTop:50,fontSize:40}}>Expense</Text>
    <Text style={{margin:20,paddingLeft: 20,color:'#BBDEFB',fontSize:40,fontWeight:'bold'}}>Manager</Text>
   
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
    </SafeAreaView>

  )
const ExpensesStack = createStackNavigator(
  {
    Expenses: {
      screen: Expenses,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Expenses',
          headerTitleStyle:{
            color:'white'
          },
          headerStyle: {
          backgroundColor: '#1976D2'
          },
          headerLeft: (
            <Icon style={{ paddingLeft: 10 ,color:'white'}} onPress={() => navigation.openDrawer()} name="menu" size={30} />
          ),
          headerRight: (
            <View>
             <Icon style={{ paddingLeft: 50,paddingTop:20 ,color:'white',position: 'absolute',top: -10, left: 10,right: 0,bottom: 0}} name="dots-three-vertical" size={30} />

          
               <Picker
                selectedValue=""
                style={{ width:100,opacity:0}}
                mode='dropdown'
                itemStyle={{fontWeight:'bold',textAlign:'center'}}
                onValueChange={(itemValue, itemIndex) =>
                  {
                    firebase.auth().signOut();
                    navigation.navigate('Welcome');
                    alert("You are Logged Out");
                }
                }>
                <Picker.Item label="Cancel" value="Logged in" />
                <Picker.Item  label="Sign Out" value="Sign Out" />
              
              </Picker>

          

              </View>
        )
        };
      }
    },
    AddExpense: {
      screen: AddExpense
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
         return {
          headerTitle: 'Profile',
          headerTitleStyle:{
            color:'white'
          },
          headerStyle: {
          backgroundColor: '#1976D2'
          },
          headerLeft: (
            <Icon style={{ paddingLeft: 10 ,color:'white'}} onPress={() => navigation.openDrawer()} name="menu" size={30} />
          ),
          headerRight: (
            <View>
             <Icon style={{ paddingLeft: 50,paddingTop:20 ,color:'white',position: 'absolute',top: -10, left: 10,right: 0,bottom: 0}} name="dots-three-vertical" size={30} />

          
               <Picker
                selectedValue=""
                style={{ width:100,opacity:0}}
                mode='dropdown'
                itemStyle={{fontWeight:'bold',textAlign:'center'}}
                onValueChange={(itemValue, itemIndex) =>
                  {
                    firebase.auth().signOut();
                    navigation.navigate('Welcome');
                    alert("You are Logged Out");
                }
                }>
                <Picker.Item label="Cancel" value="Logged in" />
                <Picker.Item  label="Sign Out" value="Sign Out" />
              
              </Picker>

          

              </View>
        )
        };
    }
  },
    EditProfile: {
      screen: EditProfile
    }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    // ExpensesStack,
    // ProfileStack,
     SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName ,
        headerRight: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        ),
        headerRight: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Expenses:{
    screen: ExpensesStack
  },
  Profile:{
    screen: ProfileStack
  }
},{
  contentComponent:DeawerUpper
}
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
