import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text> asdf </Text>


      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
