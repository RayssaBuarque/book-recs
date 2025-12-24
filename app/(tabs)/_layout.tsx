// É possível consultar ícones da mesma galeria de vetores (ionicons), pelo link abaixo:
// https://icons.expo.fyi/Index
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return(
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#bc6c25",
        headerShown: false,
        tabBarActiveTintColor: "#dda15e",
        tabBarInactiveTintColor: "#fefae0",
        tabBarStyle:{
          backgroundColor: "#606c3b",
          borderTopWidth: 1,
          borderTopColor: "#283618",
          height: 115,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle:{
          fontSize: 12,
          fontWeight: "600",
        }
      }}
    >

      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({color, size}) => { return <Ionicons name="home" size={size} color={color} />; }
        }}
      /> 

      <Tabs.Screen 
        name='pages/book'
        options={{
          title: "Book",
          tabBarIcon: ({color, size}) => { return <Ionicons name="bookmarks" size={size} color={color}/>}
        }}
      />

    </Tabs>
  );
}

export default TabsLayout;