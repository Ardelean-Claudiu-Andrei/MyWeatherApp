import { React, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

export default function App() {

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = {
    key: '0527c15856e0276845547997f01997c8',
    baseUrl: 'https://api.openweathermap.org/data/3.0/',
  }

  const fetchDataWeather = useCallback(() => {
    if (!input) return;
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);


  const getBackgroundImage = (temperature) => {
    if (temperature <= 15) {
      return require('./assets/cloudy.jpg');
    } else if (temperature > 15 && temperature <= 25) {
      return require('./assets/sunny.jpeg');
    } else {
      return require('./assets/desert.jpg');
    }
  };

  
  return (
    <View style={styles.root}>
      <ImageBackground
        source={getBackgroundImage(data?.main?.temp)}
        resizeMode="cover"
        style={styles.image}>

        {data &&
          <View style={styles.infoView}>
            <Text style={styles.cityCountyText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.displayTemp}>{`${Math.round(data?.main?.temp,)}°C`}</Text>
            <Text style={styles.minMaxTemp}>{`Min ${Math.round(data?.main?.temp_min,
            )}°C / Max ${Math.round(data?.main?.temp_max,)}°C`}</Text>
          </View>}

        <View>
          <TextInput
            placeholder="Enter city name..."
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#fff'}
            style={styles.textInput}
            onSubmitEditing={fetchDataWeather}
          />
        </View>
        {loading &&
          <View>
            <ActivityIndicator size={'large'} color='#000' />
          </View>
        }

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    flexDirection: 'column',
  },

  root: {
    flex: 1,
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 10,
    marginVertical: 50,
    marginHorizontal: 10,
    backgroundColor: '#696969',
    color: "#fff",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: 'coral',
  },

  infoView: {
    alignItems: 'center',
  },

  cityCountyText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 40,
  },

  dateText: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 10,
  },

  displayTemp: {
    fontSize: 100,
    color: '#fff',
    marginVertical: 10,
  },
  
  minMaxTemp: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});
