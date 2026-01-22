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

// Template de tela de Livro
const templateLivro = () => {
    const { colors } = useTheme(); 
    
    const page_styles = StyleSheet.create({
      container:{
        backgroundColor: colors.bg,
        flex: 1,
      },
      
      contentContainer:{
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 75,
        paddingLeft: 30,
        paddingRight: 30,
      },
    
      wrapper:{
        backgroundColor: colors.bg,
      },
    
      titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
      },

      capa: {
        height: 350,
        width: 230,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
      },

      lista_autores: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 15,
      },
      
      autor: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: colors.secondary,
        padding: 5,
        borderRadius: 5,
      }

    });
    
    return page_styles;
}

// Template de tela de Leitura
const templateLeitura = () => {
    const { colors } = useTheme(); 
    
    const page_styles = StyleSheet.create({
      container:{
        backgroundColor: colors.bg,
        flex: 1,
      },
      
      contentContainer:{
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 75,
        paddingLeft: 30,
        paddingRight: 30,
      },
    
      wrapper:{
        backgroundColor: colors.bg,
      },
    
      titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
      },

      general_info:{
        flexDirection: 'column',
        gap: 25,
      },

      caixa_resenha: {
        backgroundColor: colors.surface,
        borderBlockColor: colors.textMuted,
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        minHeight: 175,
        padding: 10,
        textAlignVertical: 'top'
      },

      multipla_escolha: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
      },

      botaoOpcao: {
        backgroundColor: colors.surface,
        paddingVertical: 10,
        width: 110,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
      },

      botaoSelecionado: {
        backgroundColor: colors.secondary,
        borderColor: colors.primary,
      },

      textoOpcao: {
        fontSize: 16,
        textAlign: 'center',
      },

      textoSelecionado: {
        color: 'white',
        fontWeight: 'bold',
      },

      caixa_estrelas: {
        // flexDirection: 'column',
        // alignItems: 'center',
        // marginBottom: 35,
      },

      estrelas: {
        backgroundColor: colors.secondary,
      },

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

      search_inform:{
        color: colors.textMuted,
        marginTop: 10,
      },

      danger: {
        color: colors.danger,
        fontWeight: 'bold',
        fontSize: 22,
      }
    });
    
    return busca_styles;
} 

export { buscaStyles, templateLeitura, templateLivro, templateStyles };
export default templateStyles;