import Exponent, {
  Notifications, Permissions
} from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDxe3Adw94y0kEaoyUckhJRPYV8kaHLQ8o",
    authDomain: "aacf2-dc0b9.firebaseapp.com",
    databaseURL: "https://aacf2-dc0b9.firebaseio.com",
    storageBucket: "aacf2-dc0b9.appspot.com",
    messagingSenderId: "874313332955"
};

firebase.initializeApp(firebaseConfig);

//var registerForPushNotificationsAsync =  require('./api/registerForPushNotificationsAsync');

const PUSH_ENDPOINT = 'https://frozen-temple-80213.herokuapp.com/';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    notification: {},
  }

   async _registerForPushNotificationsAsync() {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExponentPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
         },
         user: {
          username: 'Brent',
         },
      }),
    });
  }


  componentWillMount() {
    //this._registerForPushNotificationsAsync();
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this._loadAssetsAsync();
  }

  /*_handleNotification = (notification) => {
    this.setState({notification: notification});
  };*/

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
        ],
        fonts: [
          FontAwesome.font,
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
        ],
      });
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
  }

 

  render() {

    date = new Date().toDateString();
    itemRef = firebase.database().ref().child("moi").child(date);
    
    itemRef.on('value', (snap) => {
      count = 0;
      snap.forEach((child) => {
        count+=1;
      });

      Exponent.Notifications.presentLocalNotificationAsync(
      {title: 'recieved', 
        data: count + ' slots of MOIs scheduled for today!', 
        body: count + ' slots of MOIs scheduled for today!'}, 
      {time: 1, repeat: 'day'});
    });

    //Exponent.Notifications.setBadgeNumberAsync(count);

    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation id="root" initialRoute={Router.getRoute('rootNavigation')} />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Exponent.registerRootComponent(AppContainer);
