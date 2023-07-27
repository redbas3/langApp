import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, ViewBase } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled.View`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function App() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: () => {
        Animated.parallel([
          onPressOut(),
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;
  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true });
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <AnimatedCard
        {...panResponder.panHandlers}
        style={{
          transform: [{ scale }, { translateX: position }],
        }}
      >
        <Ionicons name="pizza" size={98} color="#192a56" />
      </AnimatedCard>
    </Container>
  );
}
