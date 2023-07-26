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
  width: 160px;
  height: 160px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const screenTop = -SCREEN_HEIGHT / 2 + 80;
const screenBottom = SCREEN_HEIGHT / 2 - 80;
const screenLeft = -SCREEN_WIDTH / 2 + 80;
const screenRight = SCREEN_WIDTH / 2 - 80;

export default function App() {
  const positionX = useRef(new Animated.Value(screenLeft)).current;
  const positionY = useRef(new Animated.Value(screenBottom)).current;

  const toLeft = Animated.timing(positionX, {
    toValue: screenLeft,
    useNativeDriver: true,
    duration: 500,
  });
  const toRight = Animated.timing(positionX, {
    toValue: screenRight,
    useNativeDriver: true,
    duration: 500,
  });

  const toBottom = Animated.timing(positionY, {
    toValue: screenBottom,
    useNativeDriver: true,
    duration: 1700,
  });

  const toTop = Animated.timing(positionY, {
    toValue: screenTop,
    useNativeDriver: true,
    duration: 1700,
  });

  Animated.loop(Animated.sequence([toRight, toLeft])).start();
  Animated.loop(Animated.sequence([toTop, toBottom])).start();

  const borderRadius = positionX.interpolate({
    inputRange: [screenLeft, screenRight],
    outputRange: [100, 10],
  });

  return (
    <Container>
      <AnimatedBox
        style={{
          borderRadius,
          backgroundColor: "tomato",
          transform: [{ translateX: positionX }, { translateY: positionY }],
        }}
      />
    </Container>
  );
}
