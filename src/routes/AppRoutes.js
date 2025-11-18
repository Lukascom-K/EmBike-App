// src/routes/AppRoutes.js

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das Telas (criadas no passo anterior)
import CadastroScreen from '../screens/CadastroScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import EdicaoScreen from '../screens/EdicaoScreen';
import HomeScreen from '../screens/HomeScreen';
import ListagemScreen from '../screens/ListagemScreen';

// Criação dos Navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * BikeStack: Stack Navigation (Pilha) para o fluxo CRUD 
 * Permite que o usuário navegue entre Listagem, Detalhes, Edição e Cadastro.
 */
function BikeStack() {
    return (
        <Stack.Navigator initialRouteName="Listagem">
            {/* O nome da tela "Listagem" é o ponto de entrada da Stack */}
            <Stack.Screen 
                name="Listagem" 
                component={ListagemScreen} 
                options={{ title: 'Bicicletas Disponíveis' }}
            />
            
            {/* Telas para as operações CRUD que usam navegação em pilha */}
            <Stack.Screen 
                name="Detalhes" 
                component={DetalhesScreen} 
                options={{ title: 'Detalhes da Bicicleta' }}
            />
            <Stack.Screen 
                name="Edicao" 
                component={EdicaoScreen} 
                options={{ title: 'Editar Bicicleta' }}
            />
            <Stack.Screen 
                name="Cadastro" 
                component={CadastroScreen} 
                options={{ title: 'Cadastrar Nova Bike' }}
            />
        </Stack.Navigator>
    );
}

/**
 * AppRoutes: Tab Navigation (Menu Inferior) para telas principais
 */
export default function AppRoutes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // Configuração dos Ícones do Menu Inferior
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Gerenciar Bikes') {
                            iconName = focused ? 'bicycle' : 'bicycle-outline';
                        } else if (route.name === 'Cadastro Rápido') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#4B0082', // Cor principal (Roxo/Indigo)
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false, // Oculta o cabeçalho duplicado
                })}
            >
                {/* Aba 1: Home (Tela inicial) */}
                <Tab.Screen name="Home" component={HomeScreen} />
                
                {/* Aba 2: Gerenciamento (A Stack completa de Listagem/Detalhes/Edição) */}
                <Tab.Screen name="Gerenciar Bikes" component={BikeStack} />
                
                {/* Aba 3: Cadastro Rápido (Acesso rápido ao formulário POST) */}
                <Tab.Screen name="Cadastro Rápido" component={CadastroScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}