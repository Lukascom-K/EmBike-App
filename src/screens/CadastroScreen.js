// src/screens/CadastroScreen.js

import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { createBicicleta } from '../services/api';

// Cores baseadas no seu mockup (Roxo/Azul escuro)
const PRIMARY_COLOR = '#4B0082'; // Roxo Escuro/Indigo
const ACCENT_COLOR = '#FFD700'; // Dourado para destaque

export default function CadastroScreen({ navigation }) {
    // Campos da entidade Bicicleta (modelo, status, localizacao)
    const [modelo, setModelo] = useState('');
    const [status, setStatus] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCadastro = async () => {
        // Validação básica de campos
        if (!modelo || !status || !localizacao) {
            Alert.alert("Erro de Validação", "Todos os campos são obrigatórios.");
            return;
        }

        const novaBike = {
            modelo: modelo,
            status: status,
            localizacao: localizacao,
        };

        setLoading(true);
        try {
            await createBicicleta(novaBike); // Chamada POST /servicos
            Alert.alert("Sucesso", "Bicicleta cadastrada com êxito!");

            // Limpa o formulário
            setModelo('');
            setStatus('');
            setLocalizacao('');

            // Navega para a Listagem (que irá recarregar os dados)
            // Se estiver na Stack (Gerenciar Bikes), volta para a tela anterior
            if (navigation.canGoBack()) {
                navigation.goBack(); 
            } else {
                 // Se estiver na Tab 'Cadastro Rápido', navega para a Tab 'Gerenciar Bikes'
                navigation.navigate('Gerenciar Bikes', { screen: 'Listagem' });
            }

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            Alert.alert("Erro no Cadastro", "Houve uma falha ao tentar cadastrar a bicicleta. Verifique a API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastrar Nova Bicicleta</Text>
            
            {/* Campo Modelo */}
            <TextInput
                style={styles.input}
                placeholder="Modelo (Ex: X200)"
                placeholderTextColor="#999"
                value={modelo}
                onChangeText={setModelo}
                editable={!loading}
            />

            {/* Campo Status */}
            <TextInput
                style={styles.input}
                placeholder="Status (Ex: Disponível, Em Manutenção)"
                placeholderTextColor="#999"
                value={status}
                onChangeText={setStatus}
                editable={!loading}
            />

            {/* Campo Localização */}
            <TextInput
                style={styles.input}
                placeholder="Localização (Ex: Estação Central, Rua Y)"
                placeholderTextColor="#999"
                value={localizacao}
                onChangeText={setLocalizacao}
                editable={!loading}
            />

            {/* Botão de Cadastro */}
            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleCadastro}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Cadastrando...' : 'CADASTRAR BIKE (POST)'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: ACCENT_COLOR,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: PRIMARY_COLOR,
        fontSize: 16,
    }
});