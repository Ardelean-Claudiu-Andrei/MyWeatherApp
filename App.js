import { React, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import SearchInput from "./SearchInput";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = {
    key: "0527c15856e0276845547997f01997c8",
    baseUrl: "https://api.openweathermap.org/data/3.0/",
  };

  const fetchDataWeather = useCallback(() => {
    if (!input) return;
    setLoading(true);
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  const getBackgroundImage = (temperature) => {
    if (temperature <= 15) {
      return require("./assets/cloudy.jpg");
    } else if (temperature > 15 && temperature <= 25) {
      return require("./assets/sunny.jpeg");
    } else {
      return require("./assets/desert.jpg");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackgroundImage(data?.main?.temp)}
        resizeMode="cover"
        style={styles.image}
      >
        <SearchInput
          input={input}
          setInput={setInput}
          onSubmitEditing={fetchDataWeather}
        />

        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountyText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.displayTemp}>{`${Math.round(
              data?.main?.temp
            )}°C`}</Text>
            <Text style={styles.minMaxTemp}>{`Min ${Math.round(
              data?.main?.temp_min
            )}°C / Max ${Math.round(data?.main?.temp_max)}°C`}</Text>
          </View>
        )}

        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#000" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cityCountyText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 10,
  },
  displayTemp: {
    fontSize: 100,
    color: "#fff",
    marginVertical: 10,
  },
  image: { flex: 1, width: null, height: null },
  infoView: {
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  infoView: {
    alignItems: "center",
  },
  minMaxTemp: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
    fontWeight: "500",
  },
  root: {
    flex: 1,
  },
});
