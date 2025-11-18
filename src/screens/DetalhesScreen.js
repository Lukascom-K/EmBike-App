// src/screens/DetalhesScreen.js

import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { getBicicletaById } from '../services/api';

// Cores baseadas no seu mockup (Roxo/Azul escuro)
const PRIMARY_COLOR = '#4B0082'; // Roxo Escuro/Indigo
const ACCENT_COLOR = '#FFD700'; // Dourado

// Componente auxiliar para exibir linha de detalhe
const DetailRow = ({ icon, label, value }) => (
    <View style={styles.row}>
        <Ionicons name={icon} size={24} color={PRIMARY_COLOR} style={styles.icon}/>
        <View style={styles.textContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);


export default function DetalhesScreen({ navigation, route }) {
    // Captura o 'idBike' que foi passado como parâmetro pela ListagemScreen
    // As informações exibidas serão: modelo, status e localizacao
    const { idBike } = route.params; 

    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para carregar os detalhes da bicicleta (GET /servicos/:id)
    const fetchBikeDetails = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getBicicletaById(idBike); // Chamada GET by ID
            setBike(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes:", error);
            Alert.alert("Erro", `Não foi possível carregar os detalhes da bicicleta ID ${idBike}.`);
            // Se falhar, navega de volta para a Listagem
            navigation.goBack(); 
        } finally {
            setLoading(false);
        }
    }, [idBike, navigation]);

    // Efeito para carregar os detalhes na montagem e recarregar após edição
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
             // Recarrega sempre que a tela recebe o foco (útil ao voltar da edição)
            fetchBikeDetails();
        });
        // Carrega na montagem inicial
        fetchBikeDetails();
        
        return unsubscribe; // Limpeza do listener
    }, [navigation, fetchBikeDetails]);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text style={{color: PRIMARY_COLOR, marginTop: 10}}>Carregando detalhes...</Text>
            </View>
        );
    }
    
    if (!bike) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Bicicleta não encontrada ou indisponível.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalhes da Bicicleta #{bike.idBike}</Text>

            {/* Container principal de informações */}
            <View style={styles.detailsBox}>
                <DetailRow icon="cube-outline" label="Modelo" value={bike.modelo} />
                <DetailRow icon="locate-outline" label="Localização" value={bike.localizacao} />
                
                {/* Status com cor de destaque */}
                <View style={styles.statusRow}>
                    <Ionicons name="alert-circle-outline" size={24} color={PRIMARY_COLOR} style={styles.icon}/>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.label}>Status</Text>
                        <Text style={[
                            styles.value, 
                            bike.status === 'Disponível' && styles.available,
                            bike.status === 'Em Manutenção' && styles.maintenance,
                        ]}>
                            {bike.status}
                        </Text>
                    </View>
                </View>

            </View>

            {/* Botão para Editar (PUT) */}
            <TouchableOpacity 
                style={styles.editButton} 
                // Passa o objeto completo da bike para a tela de Edição
                onPress={() => navigation.navigate('Edicao', { bikeData: bike })}
            >
                <Ionicons name="create-outline" size={24} color={PRIMARY_COLOR} />
                <Text style={styles.editButtonText}>EDITAR (PUT)</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginBottom: 30,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: ACCENT_COLOR,
        paddingBottom: 10,
    },
    detailsBox: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    icon: {
        marginRight: 15,
        width: 30,
        textAlign: 'center',
    },
    textContainer: {
        flex: 1,
    },
    statusTextContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 2,
    },
    available: {
        color: '#28a745', // Verde
        fontWeight: 'bold',
    },
    maintenance: {
        color: '#dc3545', // Vermelho
        fontWeight: 'bold',
    },
    editButton: {
        flexDirection: 'row',
        backgroundColor: ACCENT_COLOR,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        elevation: 5,
    },
    editButtonText: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    errorText: {
        fontSize: 18,
        color: '#dc3545',
        textAlign: 'center',
    }
});