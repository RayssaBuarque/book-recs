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

    return (
        <View style={[styles.container, isFocused && styles.containerFocused]}>
        <View style={styles.searchIcon}>
            <Ionicons 
            name="search" 
            size={20} 
            color={isFocused ? '#6200ee' : '#666'} 
            />
        </View>
      
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#999"
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
            <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
        )}
        
        {query.length > 0 && (
            <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
            >
            <Ionicons name="arrow-forward" size={20} color="#6200ee" />
            </TouchableOpacity>
        )}
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffff',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    containerFocused: {
        borderColor: '#6200ee',
        backgroundColor: '#fff',
        shadowColor: '#6200ee',
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
        color: '#333',
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

export default SearchBar;