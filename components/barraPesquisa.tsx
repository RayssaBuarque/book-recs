import useTheme from "@/hooks/useTheme";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput, TouchableOpacity, View
} from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
  realTime?: boolean; 
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,          // frase em display na caixa de texto
  onSearch,             // função chamada ao realizar a busc
  initialValue = '',    // valor inicial da caixa de texto
  autoFocus = false,    // se a caixa de texto deve 'focar' automaticamente (focar = teclado aparece automaticamente)
  realTime = false      // se a busca deve ser feita em tempo real enquanto o usuário digita
}) => {

    // Puxando o layout de cores:
    const {colors} = useTheme();

    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => {
        if (query.trim()) {
        onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    const handleChangeText = (text: string) => {
        setQuery(text);
        
        // Busca em tempo real (opcional)
        if (realTime && text.trim()) {
        onSearch(text.trim());
        }
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 25,
            paddingHorizontal: 15,
            height: 50,
            borderWidth: 1,
            borderColor: colors.textMuted,
        },
        containerFocused: {
            borderColor: colors.primary,
            backgroundColor: colors.surface,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        searchIcon: {
            marginRight: 10,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: colors.text,
            height: '100%',
            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        },
        clearButton: {
            padding: 5,
            marginRight: 5,
        },
        searchButton: {
            padding: 5,
        },
    });

    return (
        <View style={[styles.container, isFocused && styles.containerFocused]}>
        <View style={styles.searchIcon}>
            <Ionicons 
            name="search" 
            size={20} 
            color={isFocused ? colors.primary : colors.textMuted} 
            />
        </View>
      
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearch}
            onFocus={() => setIsFocused(true)}
            autoFocus={autoFocus}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
        />
        
        {query.length > 0 && (
            <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClear}
            >
            <Ionicons name="close-circle" size={20} color={colors.secondary} />
            </TouchableOpacity>
        )}
        
        {query.length > 0 && (
            <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
            >
            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </TouchableOpacity>
        )}
        </View>
    );
    };

export default SearchBar;