// src/screens/HomeScreen.js

import { Ionicons } from '@expo/vector-icons';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Cores baseadas no seu mockup (Roxo/Azul escuro)
const PRIMARY_COLOR = '#4B0082'; // Roxo Escuro/Indigo
const ACCENT_COLOR = '#FFD700'; // Dourado/Amarelo
const LIGHT_TEXT_COLOR = '#fff';

export default function HomeScreen({ navigation }) {

    // Função para navegar para a Stack de Gerenciamento (Listagem)
    const goToBikesList = () => {
        // Navega para a Tab "Gerenciar Bikes" (definida em AppRoutes.js)
        navigation.navigate('Gerenciar Bikes'); 
    };

    // Função para navegar para o Cadastro Rápido (Tab)
    const goToCadastro = () => {
        // Navega para a Tab "Cadastro Rápido" (definida em AppRoutes.js)
        navigation.navigate('Cadastro Rápido'); 
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
            
            {/* Ícone ou Placeholder para o Logo */}
            <View style={styles.logoContainer}>
                <Ionicons name="bicycle-outline" size={120} color={LIGHT_TEXT_COLOR} />
                <Text style={styles.title}>emBike Gestão de Frotas</Text>
            </View>

            <Text style={styles.subtitle}>
                Sistema de gerenciamento de bicicletas elétricas.
            </Text>

            {/* Botão 1: Listagem/Gerenciamento */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={goToBikesList}
            >
                <Ionicons name="list" size={24} color={PRIMARY_COLOR} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>VER BICICLETAS (LISTAGEM)</Text>
            </TouchableOpacity>

            {/* Botão 2: Cadastro */}
            <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={goToCadastro}
            >
                <Ionicons name="add-circle-outline" size={24} color={PRIMARY_COLOR} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>CADASTRAR NOVA BIKE</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Use o Menu Abaixo (Tab Navigation) para navegar rapidamente.</Text>
            </View>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR, // Fundo principal com a cor do mockup
        padding: 30,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: LIGHT_TEXT_COLOR,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 50,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: ACCENT_COLOR, // Usa cor de destaque
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    secondaryButton: {
        // Mantém o mesmo estilo de botão, pode-se ajustar cores se houver variação no mockup
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: PRIMARY_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
    },
    footerText: {
        color: '#999',
        fontSize: 12,
        textAlign: 'center',
    }
});