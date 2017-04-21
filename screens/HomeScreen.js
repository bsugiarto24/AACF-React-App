import React from 'react';
import Exponent from 'exponent';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import renderIf from './renderIf';


global.username = 'anonymous';
global.picture = 'http://www.realestatetaxgroup.com/wp-content/uploads/2013/03/empty-profile.png';
global.empty = 'http://www.realestatetaxgroup.com/wp-content/uploads/2013/03/empty-profile.png';
global.id = 'sdfs';

export default class HomeScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }
  constructor(props) {
    super(props)
  }


  async logIn() {
    const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync('1534983139847058', {
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);
      responseObj = (await response.json());
      global.id = responseObj.id;
      global.username = responseObj.name;
      global.picture = "http:/graph.facebook.com/"+ global.id +"/picture?type=large";

      Alert.alert(
        'Logged in!',
        `Hi ${global.username}!`,
      );

      this.forceUpdate();
    }
  }

  async logout() {
      global.username = 'anonymous';
      global.picture = global.empty;
      global.id = '';

      Alert.alert(
        'Logged Out!',
        `Successful log out`,
      );

      this.forceUpdate();
    
  }


  render() {
    return (
      <View style={styles.container}>


          <Text>{global.id}</Text>

          <View style={styles.welcomeContainer}>
           {/*} <Image
              source={require('../assets/images/exponent-icon@3x.png')}
              style={styles.welcomeImage}
            /> */}

        
            
              {/* PROFILE IMAGE */}
              <Image
                style={{width: 150, 
                        height: 150,
                        marginBottom: 10,
                      }}
                source={{uri: global.picture }}
              />
 
              {renderIf(global.username != 'anonymous', 
                <Text> {global.username} </Text>
              )}


          
              <Text style = {{marginTop: 100}}> {''} </Text>

          {renderIf(global.username == 'anonymous', 
            <TouchableOpacity onPress={this.logIn.bind(this)}>
              <Text style={{backgroundColor: 'blue', color: 'white', padding: 20}}>
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
          )}
          {renderIf(global.username != 'anonymous', 
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Text style={{backgroundColor: 'blue', color: 'white', padding: 20}}>
                Sign out
              </Text>
            </TouchableOpacity>
          )}
          </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4CCE1',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 50,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    height: 200,
  },
  welcomeImage: {
    width: 250,
    height: 200,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


