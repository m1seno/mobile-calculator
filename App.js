import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState(null);

  const toNumber = (s) => {
    const n = Number((s || "").trim().replace(",", "."));
    return isNaN(n) ? 0 : n;
  };
  

  const addition = () => {
    setResult(toNumber(value1) + toNumber(value2));
  }
  const subtraction = () => {
    setResult(toNumber(value1) - toNumber(value2));
  }
  const reset = () => {
    setValue1("");
    setValue2("");
    setResult(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
      {result !== null && <Text style={{fontSize: 24}}>Result: {result.toFixed(2)}</Text>}
      <StatusBar style="auto" />
      </View>
      <View>
        <TextInput
        placeholder="Value 1"
        value={value1}
        onChangeText={setValue1}
        keyboardType="numeric"
        style={styles.input}
        />
        <TextInput
        placeholder="Value 2"
        value={value2}
        onChangeText={setValue2}
        keyboardType="numeric"
        style={styles.input}
        />
      </View>
      <View style={{flexDirection: "row"}}>
        <Button title="+" onPress={addition}/>
        <Button title="-" onPress={subtraction}/>
        <Button title="Reset" onPress={reset}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 200,
    fontSize: 18
  }
});
