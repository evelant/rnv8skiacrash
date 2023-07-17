import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextWithBorderSkia } from "./TextWithBorder";
import { LoremIpsum } from "lorem-ipsum";
import { useEffect, useState } from "react";

const gen = new LoremIpsum({});

function TestComponent() {
  const [text, setText] = useState(() => gen.generateSentences(1));

  useEffect(() => {
    const i = setInterval(() => {
      setText(gen.generateSentences(1));
    }, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <View>
      <TextWithBorderSkia
        // frontWidth={1.5}
        //
        // Invalid prop crashes v8 but not JSC or Hermes
        frontWidth={NaN}
        text={text}
        color={"red"}
        frontColor="blue"
        fontSize={16}
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute" }}>
        <TestComponent />
      </View>
      <TestComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
