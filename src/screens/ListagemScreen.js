// src/screens/ListagemScreen.js

import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { deleteBicicleta, getBicicletas } from '../services/api';

// Cores baseadas no seu mockup (Roxo/Azul escuro)
const PRIMARY_COLOR = '#4B0082'; // Roxo Escuro/Indigo
const ACCENT_COLOR = '#FFD700'; // Dourado para destaque

export default function ListagemScreen({ navigation, route }) {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar os dados da API (GET /servicos)
    // Requisito: Listar itens existentes
    const fetchBikes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getBicicletas(); 
            setBikes(data);
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Erro de Conexão", 
                "Não foi possível carregar a lista. Verifique a URL da API em src/services/api.js."
            );
            setBikes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Função para confirmar e excluir o item (DELETE /servicos/:id)
    // Requisito: Excluir item com validação do usuário
    const handleDelete = (id, modelo) => {
        Alert.alert(
            "Confirmação de Exclusão",
            `Tem certeza que deseja excluir a bicicleta "${modelo}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => confirmDelete(id) }
            ]
        );
    };

    const confirmDelete = async (id) => {
        try {
            await deleteBicicleta(id); // Chamada DELETE
            Alert.alert("Sucesso", `Bicicleta ID ${id} excluída.`);
            fetchBikes(); // Recarrega a lista após exclusão
        } catch (error) {
            Alert.alert("Erro", "Falha ao excluir a bicicleta. Verifique a API.");
        }
    };
    
    // Ouve o evento de foco na tela para recarregar quando voltamos do Cadastro/Edição
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchBikes);
        fetchBikes(); // Carrega na montagem inicial
        return unsubscribe;
    }, [navigation, fetchBikes]);

    // Componente de Item da Lista
    const renderBikeItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.itemContainer} 
            // Navega para Detalhes (GET by ID)
            onPress={() => navigation.navigate('Detalhes', { idBike: item.idBike })} 
        >
            <View style={styles.infoContainer}>
                {/* Exibe os campos modelo, status, localizacao */}
                <Text style={styles.itemTitle}>{item.modelo || `Bike #${item.idBike}`}</Text>
                <Text style={styles.itemStatus}>Status: {item.status || 'Não Informado'}</Text>
                <Text style={styles.itemLocation}>Local: {item.localizacao || 'Desconhecido'}</Text>
            </View>
            
            {/* Botão de Excluir */}
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.idBike, item.modelo)}
            >
                <Ionicons name="trash-bin-outline" size={24} color="#dc3545" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading && bikes.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text style={{color: PRIMARY_COLOR, marginTop: 10}}>Carregando bicicletas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {bikes.length === 0 ? (
                <Text style={styles.emptyText}>
                    Nenhuma bicicleta cadastrada. Adicione uma pela aba "Cadastro Rápido".
                </Text>
            ) : (
                <FlatList
                    data={bikes}
                    keyExtractor={(item) => String(item.idBike)}
                    renderItem={renderBikeItem}
                    contentContainerStyle={styles.listContent}
                    onRefresh={fetchBikes} // Implementa Pull-to-refresh
                    refreshing={loading}
                />
            )}
            
            {/* Botão flutuante para Cadastro (Acesso rápido) */}
            <TouchableOpacity 
                style={styles.addButton}
                // Navega para a tela 'Cadastro' dentro da Stack 'Gerenciar Bikes'
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        borderLeftWidth: 5,
        borderLeftColor: PRIMARY_COLOR, 
        elevation: 3,
    },
    infoContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    itemStatus: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    itemLocation: {
        fontSize: 14,
        color: '#6c757d',
    },
    deleteButton: {
        padding: 5,
        marginLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: ACCENT_COLOR, 
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    }
});