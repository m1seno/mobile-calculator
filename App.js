import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";

export default function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const toNumber = (s) => {
    const n = Number((s || "").trim().replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const calculate = (op) => {
    const num1 = toNumber(value1);
    const num2 = toNumber(value2);
    let res = 0;
    switch (op) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          Alert.alert("Division by zero is not allowed!");
          return;
        }
        res = num1 / num2;
        break;
      default:
        Alert.alert("Invalid operation");
    }
    setResult(res);
    setHistory((prev) => [{ value1: num1, value2: num2, op, res }, ...prev]);
  };

  const reset = () => {
    setValue1("");
    setValue2("");
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* YKSI vanhempi View kaikkien sisäosien ympärillä */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View>
            {result !== null && (
              <Text style={{ fontSize: 24 }}>Result: {result}</Text>
            )}
          </View>

          <View style={{ width: "60%", alignItems: "center" }}>
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

          <View
            style={styles.buttons}
          >
            <Button title="+" onPress={() => calculate("+")} />
            <Button title="-" onPress={() => calculate("-")} />
            <Button title="x" onPress={() => calculate("*")} />
            <Button title="/" onPress={() => calculate("/")} />
          </View>

          <View style={{ paddingTop: 20 }}>
            <Button title="Reset" onPress={reset} color="red" />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.list}>
        <FlashList
          data={history}
          keyExtractor={(_, i) => i.toString()}
          estimatedItemSize={24}
          keyboardShouldPersistTaps="handled"
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18, lineHeight: 24 }}>
              {item.value1} {item.op} {item.value2} = {item.res}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 200,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    width: "60%",
    justifyContent: "space-around",
  },
  list: {
    flex: 1,
    justifyContent: "flex-start",
    width: "60%",
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
  },
});
