#!/usr/bin/env node

/**
 * Script para verificar que los contratos estén desplegados correctamente
 * en Scaffold-ETH 2. Este script verifica que el contrato TokenAmbiental
 * esté presente en deployedContracts.ts.
 */

const fs = require('fs');
const path = require('path');

// Función para verificar que el contrato esté desplegado
function checkContractDeployment() {
  const deployedContractsPath = path.join(__dirname, 'packages/nextjs/contracts/deployedContracts.ts');
  
  if (!fs.existsSync(deployedContractsPath)) {
    console.log('❌ Archivo deployedContracts.ts no encontrado. Ejecuta "yarn deploy" primero.');
    return false;
  }

  const content = fs.readFileSync(deployedContractsPath, 'utf8');
  
  // Buscar la dirección del contrato TokenAmbiental
  const tokenAmbientalMatch = content.match(/TokenAmbiental:\s*{\s*address:\s*"([^"]+)"/);
  
  if (!tokenAmbientalMatch) {
    console.log('❌ Contrato TokenAmbiental no encontrado en deployedContracts.ts');
    console.log('💡 Ejecuta "yarn deploy" para desplegar el contrato');
    return false;
  }

  const contractAddress = tokenAmbientalMatch[1];
  
  // Verificar que la dirección no sea la dirección cero
  if (contractAddress === '0x0000000000000000000000000000000000000000') {
    console.log('❌ Contrato TokenAmbiental tiene dirección cero');
    console.log('💡 Ejecuta "yarn deploy" para desplegar el contrato correctamente');
    return false;
  }

  return {
    tokenAmbiental: contractAddress
  };
}

// Función principal
function main() {
  console.log('🔍 Verificando deployment de contratos...');
  
  const addresses = checkContractDeployment();
  if (!addresses) {
    process.exit(1);
  }
  
  console.log('✅ Contratos desplegados correctamente:');
  console.log(`   TokenAmbiental: ${addresses.tokenAmbiental}`);
  console.log('');
  console.log('🚀 La dApp está lista para usar');
  console.log('💡 Scaffold-ETH 2 maneja automáticamente las direcciones de los contratos');
  console.log('💡 No es necesario actualizar manualmente las direcciones en el código');
}

// Ejecutar el script
if (require.main === module) {
  main();
}

module.exports = { checkContractDeployment }; 