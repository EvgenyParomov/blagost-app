import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./linking-configuration";
import { RootNavigator } from "./root-navigator";

export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
