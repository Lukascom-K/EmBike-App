// App.js (NA RAIZ do projeto, ao lado de package.json)

import AppRoutes from './src/routes/AppRoutes';

export default function App() {
  // O App.js agora retorna o nosso componente de navegação principal
  return (
    <AppRoutes />
  );
}