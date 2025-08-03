// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenAmbiental
 * @dev Token ERC20 para la tokenización de CO2 capturado por el proyecto Bio Attalea
 * @author Bio Attalea Team
 */
contract TokenAmbiental is ERC20, Ownable {
    uint256 public totalCO2Capturado = 0; // Total de CO2 capturado en toneladas
    uint256 public constant RATIO_CO2_TOKEN = 1; // 1 token = 1 tonelada de CO2

    event CO2Tokenizado(address indexed owner, uint256 toneladas, uint256 tokensEmitidos);
    event CO2CapturadoActualizado(uint256 totalToneladas);

    constructor(address initialOwner) ERC20("Bio Attalea Token", "BIOA") Ownable(initialOwner) {}

    /**
     * @dev Función para que el owner pueda emitir tokens basado en CO2 capturado
     * @param to Dirección que recibirá los tokens
     * @param toneladas Cantidad de toneladas de CO2 capturado
     */
    function mint(address to, uint256 toneladas) public onlyOwner {
        require(toneladas > 0, "Las toneladas deben ser mayores a 0");
        require(to != address(0), "Direccion invalida");

        uint256 tokensAEmitir = toneladas * RATIO_CO2_TOKEN;
        
        _mint(to, tokensAEmitir);
        totalCO2Capturado += toneladas;

        emit CO2Tokenizado(to, toneladas, tokensAEmitir);
        emit CO2CapturadoActualizado(totalCO2Capturado);
    }

    /**
     * @dev Función para actualizar el total de CO2 capturado (solo owner)
     * @param nuevasToneladas Nuevas toneladas de CO2 capturado
     */
    function actualizarCO2Capturado(uint256 nuevasToneladas) public onlyOwner {
        totalCO2Capturado = nuevasToneladas;
        emit CO2CapturadoActualizado(totalCO2Capturado);
    }

    /**
     * @dev Función para obtener el balance de tokens de una dirección
     * @param account Dirección a consultar
     * @return Balance de tokens
     */
    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }

    /**
     * @dev Función para obtener el total de tokens emitidos
     * @return Total de tokens emitidos
     */
    function totalSupply() public view override returns (uint256) {
        return super.totalSupply();
    }
} 