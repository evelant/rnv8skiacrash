import { Canvas, Text as SkiaText, useFont } from "@shopify/react-native-skia";
import React from "react";
import type { TextStyle } from "react-native";
import { View, Text } from "react-native";

export interface TextWithBorderProps {
  text: string;
  color: string;
  fontSize: number;
  frontWidth?: undefined | number;
  backWidth?: undefined | number;
  showForeground?: undefined | boolean;
  showFront?: undefined | boolean;
  showBack?: undefined | boolean;
  frontColor?: undefined | string;
  backColor?: undefined | string;
  textStyle?: undefined | TextStyle;
  fontFamily?: string;
}

export const TextWithBorderSkia = function TextWithBorderSkia({
  backColor = "black",
  backWidth = 1.5,
  color,
  fontFamily = "Boogaloo",
  fontSize,
  frontColor = "white",
  frontWidth = 1,
  showBack = true,
  showForeground = true,
  showFront = true,
  text,
  textStyle = {},
}: TextWithBorderProps) {
  const font_req =
    fontFamily == "Boogaloo"
      ? require(`./assets/Boogaloo.ttf`)
      : require(`./assets/Comicy.ttf`);
  const font = useFont(font_req, fontSize);

  const strokeWidth = frontWidth * 2;

  //https://github.com/Shopify/react-native-skia/discussions/924
  const textWidth = font?.getTextWidth(text) ?? 0; //argh this measurement is inaccurate.  shitty.

  // const textWidth = useComputedValue(() => {
  //     return font?.getTextWidth(text)
  // }, [font, text, fontSize]) ?? 0

  return (
    <View
      style={{
        height: fontSize + strokeWidth * 2,
        width: textWidth + strokeWidth * 2,
        alignItems: "center",
      }}
      pointerEvents={"none"}
    >
      {font ? (
        <Canvas
          style={{
            position: "absolute",
            left: -strokeWidth,
            right: -strokeWidth - 500,
            top: -strokeWidth,
            bottom: -strokeWidth,
          }}
          //
        >
          {/* <Group
                    //
                    // transform={[{ translateX: "5" }]}
                    > */}
          <SkiaText
            text={text}
            font={font}
            x={strokeWidth}
            // y={fontSize*0.9}
            y={fontSize + strokeWidth}
            strokeWidth={strokeWidth}
            color={frontColor}
            style="stroke"
          />
          <SkiaText
            text={text}
            font={font}
            x={strokeWidth}
            y={fontSize + strokeWidth}
            color={color}
          />
          {/* </Group> */}
        </Canvas>
      ) : (
        <Text
          style={{
            //
            color,
            fontSize,
            fontFamily,
            alignSelf: "center",
            position: "absolute",
            textShadowColor: "black",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 3,
          }}
          numberOfLines={1}
        >
          {text}
        </Text>
      )}
    </View>
  );
};
