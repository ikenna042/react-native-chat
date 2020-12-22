import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image }
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

export default class Login extends React.Component {

  state = {
    name: ''
  };

  continue = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/chat.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your username'
              onChangeText={ name => {
                this.setState({ name });
              }}
              value={
                this.state.name
              }
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon} onPress={this.continue}>
                <Ionicons
                  name='arrow-forward'
                  size={24}
                  color='#FFF'
                />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7'
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: -120,
    top: -20
  },
  imageContainer: {
    marginTop: 64
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  textContainer: {
    marginHorizontal: 32
  },
  textHeader: {
    fontWeight: '500',
    fontSize: 30,
    color: '#514E5A',
    marginTop: 32
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514E5A',
    fontWeight: '600'
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginTop: 64
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#03b6fc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
