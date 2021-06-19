import * as React from 'react';
import {
  text,
  View,
  StyleSheet,
  textInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  //Adding a bunch of comments to make changes and look smart


  //fun fact this really doesnt work

  render() {
    return (
      <View style={styles.ViewContainer}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Word Chunks!',
            style: { color: '#fff', fontSize: 15 },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />

        <textInput
          style={styles.inputBox}
          onChangetext={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSounds: db[word].phones })
            ):
            Alert.alert("The word does not exist in our database");
          }}>
          <text style={styles.buttontext}>GO</text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewContai: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 5,
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 100,
    height: 100,
    marginLeft: 95,
  }
});
