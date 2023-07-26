import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
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

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
    }).start(toggleUp);
    // Animated.spring(Y_POSITION, {
    //   toValue: 200,
    //   useNativeDriver: true,
    //   bounciness: 15,
    //   // friction: 1,
    //   // tension: 100,
    // }).start();
  };

  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-300, 100, 300],
    outputRange: [1, 0.5, 1],
  });

  // Y_POSITION.addListener(() => console.log(Y_POSITION));
  Y_POSITION.addListener(() => console.log(opacityValue));
  console.log(opacityValue);

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            opacity: opacityValue,
            borderRadius: borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
