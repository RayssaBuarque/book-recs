import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

// Template de tela genérica
const templateStyles = () => {
    const { colors } = useTheme(); 
    
    const page_styles = StyleSheet.create({
      container:{
        backgroundColor: colors.bg,
        paddingTop: 100,
        paddingLeft: 30,
        paddingRight: 30,
        height: '100%',
      },
    
      wrapper:{
        backgroundColor: colors.bg,
      },
    
      titulo_pagina: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
      },

      texto: {
        color: colors.text,
      },

      danger: {
        color: colors.danger,
        fontWeight: 'bold',
        fontSize: 22,
      },

      button: {
        margin: 20,
        backgroundColor: colors.secondary,
        padding: 9,
        borderRadius: 3.5,
      },

      texto_button:{
        color: colors.bg,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'medium',
      }
    });
    
    return page_styles;
}

// Template de tela de busca
const buscaStyles = () => {
  const { colors } = useTheme(); 

  const busca_styles = StyleSheet.create({
      container:{
        backgroundColor: colors.bg,
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 20,
        height: '100%',
      },
    
      wrapper:{
        backgroundColor: colors.bg,
      },
    
      titulo_pagina: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
      },

      texto: {
        color: colors.text,
      },

      danger: {
        color: colors.danger,
        fontWeight: 'bold',
        fontSize: 22,
      }
    });
    
    return busca_styles;
} 

export { buscaStyles, templateStyles };
export default templateStyles;