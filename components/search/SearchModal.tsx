import getWeatherTheme from "@/utils/weatherTheme";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Button from "../Button";

type SearchModalProps = {
  toggleSearch: boolean;
  setToggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

export default function SearchModal({
  toggleSearch,
  setToggleSearch,
  search,
  setSearch,
  handleSearch,
}: SearchModalProps) {
  const theme = getWeatherTheme();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleSearch}
      onRequestClose={() => setToggleSearch(!toggleSearch)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            autoFocus={toggleSearch}
            placeholder="city"
            defaultValue={search}
            onChangeText={setSearch}
            style={[
              styles.input
            ]}
          />
          <Button onPress={handleSearch} title={'Search'} />
          <Button onPress={()=> setToggleSearch(false)} title={'Close'} variant={'#FFF'} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
    marginRight: 8,
  },
  input: {
    width: 200,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: '#2b2a2a',
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
