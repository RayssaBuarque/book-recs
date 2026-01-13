import useTheme from "@/hooks/useTheme";
// É possível consultar ícones da mesma galeria de vetores (ionicons), pelo link abaixo:
// https://icons.expo.fyi/Index
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

const TabsLayout = () => {

  // Puxando o layout de cores:
  const {colors} = useTheme();

  return(
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle:{
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
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
        name='shelf'
        options={{
          title: "Estante",
          tabBarIcon: ({color, size}) => { return <Ionicons name="book" size={size} color={color} />; }
        }}
      /> 

      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({color, size}) => { return <Ionicons name="home" size={size} color={color} />; }
        }}
      /> 

      <Tabs.Screen 
        name='booksearch'
        options={{
          title: "Search",
          tabBarIcon: ({color, size}) => { return <Ionicons name="bookmark" size={size} color={color}/>}
        }}
      />

    </Tabs>
  );
}

export default TabsLayout;