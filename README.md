# 🚲 emBike-App: Gestão de Frotas

## 🎯 Resumo

Este é o aplicativo mobile em **React Native** (Expo) para a gestão de bicicletas elétricas. Implementamos o **CRUD completo** (Listagem, Cadastro, Detalhes, Edição e Exclusão) consumindo uma API REST externa (`/servicos`).

## 💻 Setup Rápido

O projeto utiliza React Native, React Navigation (Tabs e Stack) e Axios para as chamadas HTTP.

1.  **Clone e Dependências:**
    ```bash
    git clone [https://github.com/Lukascom-K/EmBike-App.git](https://github.com/Lukascom-K/EmBike-App.git)
    cd EmBike-App
    npm install
    ```

2.  **Ajuste da API (Obrigatório para Teste):**

    Para que o app se conecte à sua API, você precisa mudar o IP.

    * Abra `src/services/api.js`.
    * Localize a linha `const BASE_URL = '...';` e substitua o IP e a porta pelo endereço da sua máquina na rede local.

    *Exemplo de URL da API:* `http://192.168.1.10:8080/servicos`

3.  **Para Iniciar:**
    ```bash
    npx expo start
    ```
    Use o Expo Go para escanear o QR Code.

## 🔎 Estrutura CRUD

Todas as funcionalidades estão mapeadas nas seguintes telas e métodos REST:

| Tela | Funcionalidade | Método REST |
| :--- | :--- | :--- |
| **Listagem** | Busca inicial e Exclusão | `GET` e `DELETE /:id` |
| **Cadastro** | Criação de novos itens | `POST` |
| **Detalhes** | Visualizar item específico | `GET /:id` |
| **Edição** | Atualização de item | `PUT /:id` |

---

## ⏭️ Próximo Passo

Agora que você tem o `README.md` pronto, execute os comandos finais para enviá-lo para o GitHub, garantindo que a entrega esteja completa:

1.  `git add README.md`
2.  `git commit -m "docs: Adicionado README final."`
3.  `git push origin main`