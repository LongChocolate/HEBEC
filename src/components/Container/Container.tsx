import { View, StyleSheet, ViewProps } from "react-native";
import styled from "styled-components/native";
import React from "react";

const Container = props => {
  return <View {...props} style={[styles.container]}></View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1
  }
});

export default Container;
