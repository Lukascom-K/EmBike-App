// src/screens/EdicaoScreen.js

import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { updateBicicleta } from '../services/api';

// Cores baseadas no seu mockup (Roxo/Azul escuro)
const PRIMARY_COLOR = '#4B0082'; // Roxo Escuro/Indigo
const ACCENT_COLOR = '#FFD700'; // Dourado

export default function EdicaoScreen({ navigation, route }) {
    // Captura os dados da bicicleta passados da tela Detalhes
    const { bikeData } = route.params; 

    // O ID é fixo e usado na chamada PUT
    const idBike = bikeData.idBike;

    // Estados iniciais são preenchidos com os dados existentes
    // Os campos são modelo, status e localizacao
    const [modelo, setModelo] = useState(bikeData.modelo || '');
    const [status, setStatus] = useState(bikeData.status || '');
    const [localizacao, setLocalizacao] = useState(bikeData.localizacao || '');
    const [loading, setLoading] = useState(false);

    const handleEdicao = async () => {
        // Validação básica de campos
        if (!modelo || !status || !localizacao) {
            Alert.alert("Erro de Validação", "Todos os campos são obrigatórios.");
            return;
        }

        const dadosAtualizados = {
            modelo: modelo,
            status: status,
            localizacao: localizacao,
        };

        setLoading(true);
        try {
            // Chamada PUT /servicos/:id com os novos dados
            await updateBicicleta(idBike, dadosAtualizados); 
            
            Alert.alert("Sucesso", `Bicicleta ID ${idBike} atualizada com êxito!`);

            // Volta para a tela de Detalhes, que irá recarregar os dados atualizados automaticamente
            navigation.goBack(); 

        } catch (error) {
            console.error("Erro ao editar:", error);
            Alert.alert("Erro na Edição", "Houve uma falha ao tentar atualizar a bicicleta. Verifique a API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Bicicleta #{idBike}</Text>
            
            {/* Campo Modelo */}
            <TextInput
                style={styles.input}
                placeholder="Modelo"
                placeholderTextColor="#999"
                value={modelo}
                onChangeText={setModelo}
                editable={!loading}
            />

            {/* Campo Status */}
            <TextInput
                style={styles.input}
                placeholder="Status"
                placeholderTextColor="#999"
                value={status}
                onChangeText={setStatus}
                editable={!loading}
            />

            {/* Campo Localização */}
            <TextInput
                style={styles.input}
                placeholder="Localização"
                placeholderTextColor="#999"
                value={localizacao}
                onChangeText={setLocalizacao}
                editable={!loading}
            />

            {/* Botão de Edição */}
            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleEdicao}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Salvando...' : 'SALVAR EDIÇÃO (PUT)'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Text style={styles.backButtonText}>Cancelar e Voltar</Text>
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