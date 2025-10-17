import AsyncStorage from "@react-native-async-storage/async-storage";

const writeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`cant set value of key: ${key} with value ${value}`)
  }
};

const readData = async (key, defaultValue) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(`cant read value of key: ${key}`)
    return defaultValue;
  }
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(`cant delete value of key: ${key}`)
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(`cant clear data: ${e}`)
  }
};

const useAsyncStorage = () => {
  return {
    readData,
    writeData,
    deleteData,
    clearAll,
  };
};

export default useAsyncStorage;
