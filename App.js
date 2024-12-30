import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserLists from "./components/UserList";
import UserDetails from "./components/UserDetails";
import UserPhotos from "./components/UserPhotos";
import ReadModelComponent from "./components/ReadModelComponent";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserLists">
          <Stack.Screen
            name="UserLists"
            component={UserLists}
            options={{ title: "User List" }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{ title: "User Detail" }}
          />
          <Stack.Screen
            name="UserPhotos"
            component={UserPhotos}
            options={{ title: "User Photos" }}
          />

          <Stack.Screen
            name="ReadModelComponent"
            component={ReadModelComponent}
            options={{ title: "ReadModelComponent" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
