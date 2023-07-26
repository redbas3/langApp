import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const position = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });
  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  const rotationValue = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });

  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  // position.addListener(() => console.log(position.getTranslateTransform()));
  // position.addListener(() => console.log(rotationValue));
  // console.log(opacityValue);

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [
              // { rotateY: rotationValue },
              ...position.getTranslateTransform(),
            ],
          }}
        />
      </Pressable>
    </Container>
  );
}
