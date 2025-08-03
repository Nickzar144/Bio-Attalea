# 🌱 Bio Attalea Tokenization dApp

Una dApp para la tokenización de captura de CO₂ del proyecto de reforestación Bio Attalea.

## 🚀 Características

- **Tokenización Verde**: Convierte la captura de CO₂ en tokens BIOA verificables en la blockchain
- **Interfaz Moderna**: Diseño limpio y accesible con paleta de colores verdes
- **Control de Acceso**: Solo el owner puede emitir tokens
- **Estadísticas en Tiempo Real**: Monitoreo del total de CO₂ capturado y tokens emitidos
- **Integración con Wallet**: Conexión con MetaMask y otras wallets compatibles

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- Yarn
- MetaMask o wallet compatible con Ethereum

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias

```bash
cd bio-attalea
yarn install
```

### 2. Compilar Contratos

```bash
yarn compile
```

### 3. Desplegar Contratos Localmente

```bash
# Iniciar blockchain local
yarn chain

# En otra terminal, desplegar contratos
yarn deploy
```

### 4. Verificar Deployment (Opcional)

```bash
# Verificar que los contratos estén desplegados correctamente
node update-contract-addresses.js
```

### 5. Iniciar Frontend

```bash
yarn start
```

La dApp estará disponible en `http://localhost:3000`

## 🏗️ Arquitectura del Proyecto

### Contratos Inteligentes

- **TokenAmbiental.sol**: Contrato ERC20 para el token BIOA
  - Función `mint(address to, uint256 toneladas)`: Solo para el owner
  - Ratio: 1 token = 1 tonelada de CO₂ capturado
  - Tracking del total de CO₂ capturado

### Frontend

- **Next.js**: Framework de React
- **TailwindCSS**: Estilos y diseño
- **Scaffold-ETH 2**: Framework completo con:
  - **RainbowKit**: Conexión automática de wallets
  - **Wagmi + Viem**: Integración con Ethereum
  - **Hooks personalizados**: `useScaffoldReadContract`, `useScaffoldWriteContract`
  - **Gestión automática de direcciones**: No es necesario actualizar manualmente

## 🎯 Funcionalidades

### Para el Owner (Deployer)

1. **Conectar Wallet**: Usar MetaMask para conectar
2. **Emitir Tokens**: 
   - Ingresar cantidad de toneladas de CO₂ capturado
   - Hacer clic en "Generar BIOA"
   - Los tokens se emiten automáticamente

### Para Usuarios Regulares

1. **Conectar Wallet**: Para ver estadísticas personales
2. **Ver Balance**: Consultar tokens BIOA propios
3. **Monitorear Estadísticas**: Ver totales globales

## 🔧 Configuración de Redes

### Red Local (Desarrollo)

- **Chain ID**: 31337
- **RPC URL**: http://127.0.0.1:8545
- **Currency Symbol**: ETH

### Redes de Prueba

Para desplegar en redes de prueba como Sepolia:

```bash
yarn deploy --network sepolia
```

## 📊 Variables de Entorno

Crear archivo `.env` en `packages/hardhat/`:

```env
DEPLOYER_PRIVATE_KEY_ENCRYPTED=tu_private_key_encriptada
ETHERSCAN_API_KEY=tu_api_key_de_etherscan
```

## 🧪 Testing

```bash
yarn test
```

## 📝 Scripts Disponibles

- `yarn chain`: Inicia blockchain local
- `yarn deploy`: Despliega contratos
- `yarn start`: Inicia frontend
- `yarn compile`: Compila contratos
- `yarn test`: Ejecuta tests
- `yarn account`: Genera nueva cuenta
- `yarn account:import`: Importa cuenta existente

## 🌍 Sobre el Proyecto Bio Attalea

### Palmeras Bio Attalea

- **Origen**: Nativas de la Amazonía
- **Capacidad de Captura**: Hasta 50 kg de CO₂ por año por palmera
- **Beneficios**:
  - Crecimiento sostenible y natural
  - Alto potencial de captura de CO₂
  - Beneficios ecológicos múltiples

### Tokenización Verde

- **Transparencia**: Total en la blockchain
- **Verificación**: Inmutable de captura
- **Incentivos**: Para la reforestación

## 🔒 Seguridad

- Solo el owner puede emitir tokens
- Contratos verificados en Etherscan
- Uso de OpenZeppelin para estándares de seguridad

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:

- Revisar la documentación de Scaffold-ETH 2
- Consultar los issues del repositorio
- Contactar al equipo de desarrollo

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**🌱 Haciendo la reforestación más accesible a través de la blockchain** 