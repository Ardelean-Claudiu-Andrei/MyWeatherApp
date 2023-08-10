import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
const SearchInput = ({ input, setInput, onSubmitEditing }) => {
  return (
    <View>
      <TextInput
        placeholder="Enter city name..."
        onChangeText={(text) => setInput(text)}
        value={input}
        placeholderTextColor={"white"}
        style={styles.searchInput}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    marginTop: 100,
    marginHorizontal: 15,
    height: 40,
    backgroundColor: "#666",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  textInput: {
    color: "white",
  },
});
