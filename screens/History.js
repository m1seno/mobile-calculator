import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function History({ route }) {

    // Oletusarvo, jos käyttäjä painaa "History"-nappia ilman että yhtäkään laskua on tehty
  const { history = [] } = route.params ?? {};

  return (
    <View style={styles.list}>
      <FlashList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        estimatedItemSize={24}
        keyboardShouldPersistTaps="handled"
        style={{ alignSelf: "stretch" }}
        contentContainerStyle={{
          paddingVertical: 8,
          alignItems: "center",
        }}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, lineHeight: 24, textAlign: "center" }}>
            {item.value1} {item.op} {item.value2} = {item.res}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
