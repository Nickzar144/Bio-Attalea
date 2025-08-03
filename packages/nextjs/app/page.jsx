"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [toneladasCO2, setToneladasCO2] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  // Contract reads using Scaffold-ETH 2 hooks
  const { data: owner } = useScaffoldReadContract({
    contractName: "TokenAmbiental",
    functionName: "owner",
  });

  const { data: totalCO2Capturado } = useScaffoldReadContract({
    contractName: "TokenAmbiental",
    functionName: "totalCO2Capturado",
  });

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "TokenAmbiental",
    functionName: "totalSupply",
  });

  const { data: userBalance } = useScaffoldReadContract({
    contractName: "TokenAmbiental",
    functionName: "balanceOf",
    args: [connectedAddress],
    enabled: !!connectedAddress,
  });

  // Contract write using Scaffold-ETH 2 hooks
  const { writeContractAsync: writeTokenAmbientalAsync, isMining } = useScaffoldWriteContract("TokenAmbiental");

  // Check if connected user is owner
  useEffect(() => {
    if (owner && connectedAddress) {
      setIsOwner(owner.toLowerCase() === connectedAddress.toLowerCase());
    }
  }, [owner, connectedAddress]);

  const handleMint = async () => {
    if (!toneladasCO2 || !connectedAddress) return;
    
    try {
      await writeTokenAmbientalAsync({
        functionName: "mint",
        args: [connectedAddress, parseEther(toneladasCO2)],
      });
      setToneladasCO2("");
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bio Attalea Tokenization</h1>
                <p className="text-sm text-green-600">Tokenización de captura de CO₂</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Conectado:</span>
                  <Address address={connectedAddress} />
                </div>
              ) : (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Conectar Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-900">Tokenización de Reforestación Bio Attalea</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conecta tu wallet y comienza a tokenizar la captura de CO₂ de nuestro proyecto de reforestación con palmeras Bio Attalea. 
            Cada tonelada de CO₂ capturado se convierte en 1 token BIOA.
          </p>
        </div>

        {/* Functionality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conecta tu Wallet</h3>
            <p className="text-gray-600">Usa MetaMask para conectar tu wallet y acceder a la dApp</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Emitir Tokens</h3>
            <p className="text-gray-600">Ingresa la cantidad de CO₂ capturado y emite tokens automáticamente</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitorea Estadísticas</h3>
            <p className="text-gray-600">Visualiza el total de CO₂ capturado y tokens emitidos en tiempo real</p>
          </div>
        </div>

        {/* Interactive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mint Tokens Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Emitir Tokens por CO₂ Capturado</h2>
            </div>

            {isConnected ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad de CO₂ (toneladas)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={toneladasCO2}
                    onChange={(e) => setToneladasCO2(e.target.value)}
                    placeholder="Ej: 10.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>

                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Ratio:</strong> 1 token = 1 tonelada de CO₂ capturado
                  </p>
                </div>

                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Escribe la cantidad de CO₂ y haz clic en 'Generar BIOA'
                  </p>
                </div>

                {isOwner ? (
                  <button
                    onClick={handleMint}
                    disabled={!toneladasCO2 || isMining}
                    className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isMining ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Generar BIOA
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800">Solo el owner puede emitir tokens</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-600 mb-4">Conecta tu wallet para continuar</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Conectar Wallet
                </button>
              </div>
            )}
          </div>

          {/* Statistics Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Estadísticas del Token</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total CO₂ Capturado</p>
                <p className="text-3xl font-bold text-green-600">
                  {totalCO2Capturado ? formatEther(totalCO2Capturado) : "0"} toneladas
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Tokens Emitidos</p>
                <p className="text-3xl font-bold text-green-600">
                  {totalSupply ? formatEther(totalSupply) : "0"}
                </p>
              </div>

              {isConnected && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Tus Tokens BIOA</p>
                  <p className="text-2xl font-bold text-green-600">
                    {userBalance ? formatEther(userBalance) : "0"}
                  </p>
                </div>
              )}

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Token:</strong> BIOA
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ratio:</strong> 1 = 1 tonelada de CO₂ capturado
                </p>
              </div>

              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar Estadísticas
              </button>
            </div>
          </div>
        </div>

        {/* About Project Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-green-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sobre el Proyecto Bio Attalea</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Palmeras Bio Attalea</h3>
              <p className="text-gray-600 mb-4">
                Las palmeras Bio Attalea son nativas de la Amazonía y excelentes capturadoras de CO₂. 
                Cada palmera puede capturar hasta 50 kg de CO₂ por año.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Crecimiento sostenible y natural
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Alto potencial de captura de CO₂
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Beneficios ecológicos múltiples
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tokenización Verde</h3>
              <p className="text-gray-600 mb-4">
                Nuestro sistema de tokenización permite convertir la captura de CO₂ en tokens digitales 
                verificables en la blockchain.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Transparencia total en la blockchain
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verificación inmutable de captura
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Incentivos para la reforestación
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 