import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../../types/navigation";
import FeedScreen from "../../screens/feed/FeedScreen";
import LibraryScreen from "../../screens/library/LibraryScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#333",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: "Reading Feed",
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: "Library",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}
