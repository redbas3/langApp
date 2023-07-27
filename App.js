import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
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

const durationX = 500;
const durationY = 1700;

export default function App() {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        console.log(dy);
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
      },
    })
  ).current;

  const borderRadius = position.x.interpolate({
    inputRange: [screenLeft, screenRight],
    outputRange: [100, 10],
  });

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: "tomato",
          transform: [...position.getTranslateTransform()],
        }}
      />
    </Container>
  );
}
