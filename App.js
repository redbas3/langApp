import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
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
  const Y = new Animated.Value(0);
  const moveUp = () => {
    // Animated.timing(Y, {
    //   toValue: 200,
    //   useNativeDriver: true,
    // }).start();

    Animated.spring(Y, {
      toValue: 200,
      useNativeDriver: true,
      // bounciness: 15,
      friction: 1,
      tension: 100,
    }).start();
  };

  Y.addListener(() => console.log(Y));

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
