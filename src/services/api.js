// src/services/api.js

import axios from 'axios';

// ⚠️ ATENÇÃO: É CRUCIAL AJUSTAR ESTA URL! 
// Se o seu celular/emulador e sua API estiverem na mesma rede Wi-Fi:
// Use o endereço IP da sua máquina na rede, seguido da porta da sua API.
// EX: const BASE_URL = 'http://192.168.1.10:8080/servicos'; 
const BASE_URL = 'http://SEU_IP_AQUI:PORTA_DA_API/servicos'; 

// Cria uma instância do axios. Esta é a nossa base de comunicação.
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Funções CRUD para a entidade Bicicleta (usando a rota /servicos)
 * Estas funções abstraem a complexidade do Axios/HTTP para as telas.
 */

// 1. LISTAR ITENS (GET /servicos)
export async function getBicicletas() {
    try {
        const response = await api.get('/'); // GET /servicos
        return response.data; // Retorna o array de bicicletas
    } catch (error) {
        console.error("Erro ao listar bicicletas:", error);
        throw error;
    }
}

// 2. BUSCAR ITEM POR ID (GET /servicos/:id)
export async function getBicicletaById(id) {
    try {
        const response = await api.get(`/${id}`); // GET /servicos/:id
        return response.data; // Retorna o objeto Bicicleta
    } catch (error) {
        console.error(`Erro ao buscar bicicleta ID ${id}:`, error);
        throw error;
    }
}

// 3. CADASTRAR NOVO ITEM (POST /servicos)
export async function createBicicleta(data) {
    try {
        const response = await api.post('/', data); // POST /servicos
        return response.data; // Retorna a nova bicicleta criada
    } catch (error) {
        console.error("Erro ao cadastrar bicicleta:", error);
        throw error;
    }
}

// 4. EDITAR ITEM (PUT /servicos/:id)
export async function updateBicicleta(id, data) {
    try {
        const response = await api.put(`/${id}`, data); // PUT /servicos/:id
        return response.data; // Retorna a bicicleta atualizada
    } catch (error) {
        console.error(`Erro ao editar bicicleta ID ${id}:`, error);
        throw error;
    }
}

// 5. EXCLUIR ITEM (DELETE /servicos/:id)
export async function deleteBicicleta(id) {
    try {
        const response = await api.delete(`/${id}`); // DELETE /servicos/:id
        return response.data; 
    } catch (error) {
        console.error(`Erro ao excluir bicicleta ID ${id}:`, error);
        throw error;
    }
}