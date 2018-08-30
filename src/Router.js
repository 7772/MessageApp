import React from "react";
import { Text } from "react-native";
import {
  createBottomTabNavigator
} from "react-navigation";

import MessageContainer from "./containers/MessageContainer";
import ProfileContainer from "./containers/ProfileContainer";

const RouteConfigs = {
  Message: {
    screen: MessageContainer,
    navigationOptions: {
      tabBarLabel: ({ focused }) => {
        return focused ? (
          <Text style={{ fontWeight: "bold", color: "blue" }}>메세지</Text>
        ) : (
          <Text style={{ fontSize: 13 }}>메세지</Text>
        );
      }
    }
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: {
      tabBarLabel: ({ focused }) => {
        return focused ? (
          <Text style={{ fontWeight: "bold", color: "blue" }}>프로필</Text>
        ) : (
          <Text style={{ fontSize: 13 }}>프로필</Text>
        );
      }
    }
  }
};

const BottomTabNavigatorConfig = {
  initialRouteName: "Message",
  tabBarOptions: {
    activeTintColor: "#e91e63",
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: "#fff"
    }
  }
};

const RootTabNav = createBottomTabNavigator(
  RouteConfigs,
  BottomTabNavigatorConfig
);

export default RootTabNav;
