import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";

export default function RootLayout() {

  return <ThemeProvider>  
    <Stack>

      {/* Telas de navegação */}
      <Stack.Screen
        name="(tabs)" 
        options={{
          title: 'Home',
          headerShown: false,
        }}/>

      {/* Telas extras */}
      <Stack.Screen 
        name="pages/readSearch" 
      />
      
      <Stack.Screen 
        name="pages/livroInfo" 
      />

      <Stack.Screen 
        name="pages/saveLeitura" 
      />

    </Stack>
  </ThemeProvider>
}
