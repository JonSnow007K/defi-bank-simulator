//-----------Real Blockchain---------
// /**
//  * Web3 Service for interacting with smart contracts
//  * Provides abstraction layer for blockchain interactions
//  */


// export interface ContractAddresses {
//   bank: string;
//   governance: string;
//   bankMock: string;
// }

// export class Web3Service {
//   private static instance: Web3Service;
//   private contractAddresses: ContractAddresses | null = null;

//   private constructor() {}

//   static getInstance(): Web3Service {
//     if (!Web3Service.instance) {
//       Web3Service.instance = new Web3Service();
//     }
//     return Web3Service.instance;
//   }

//   /**
//    * Initialize contract addresses
//    */
//   async initializeContracts(): Promise<void> {
//     // In production, this would fetch from your deployment configuration
//     // For now, using mock deployment addresses
//     this.contractAddresses = {
//       bank: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//       governance: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//       bankMock: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
//     };
//   }

//   /**
//    * Get contract addresses
//    */
//   getContractAddresses(): ContractAddresses {
//     if (!this.contractAddresses) {
//       throw new Error("Contracts not initialized");
//     }
//     return this.contractAddresses;
//   }

//   /**
//    * Check if MetaMask is installed
//    */
//   isMetaMaskInstalled(): boolean {
//     return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
//   }

//   /**
//    * Request account access
//    */
//   async requestAccounts(): Promise<string[]> {
//     if (!this.isMetaMaskInstalled()) {
//       throw new Error("MetaMask is not installed");
//     }
//     return await window.ethereum.request({ method: "eth_requestAccounts" });
//   }

//   /**
//    * Get current accounts
//    */
//   async getAccounts(): Promise<string[]> {
//     if (!this.isMetaMaskInstalled()) {
//       throw new Error("MetaMask is not installed");
//     }
//     return await window.ethereum.request({ method: "eth_accounts" });
//   }

//   /**
//    * Switch or add network
//    */
//   async switchNetwork(chainId: string): Promise<void> {
//     if (!this.isMetaMaskInstalled()) {
//       throw new Error("MetaMask is not installed");
//     }

//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId }],
//       });
//     } catch (switchError: any) {
//       // If the network doesn't exist, add it
//       if (switchError.code === 4902) {
//         await window.ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId,
//               chainName: "Localhost 8545",
//               nativeCurrency: {
//                 name: "ETH",
//                 symbol: "ETH",
//                 decimals: 18,
//               },
//               rpcUrls: ["http://127.0.0.1:8545"],
//               blockExplorerUrls: [null],
//             },
//           ],
//         });
//       } else {
//         throw switchError;
//       }
//     }
//   }

//   /**
//    * Convert wei to ether
//    */
//   weiToEther(wei: string): number {
//     return parseFloat(wei) / 1e18;
//   }

//   /**
//    * Convert ether to wei
//    */
//   etherToWei(ether: number): string {
//     return (ether * 1e18).toString();
//   }
// }

// export const web3Service = Web3Service.getInstance();



//--------Mock for deploying---------
/**
 * Web3 Service for interacting with smart contracts
 * Provides abstraction layer for blockchain interactions
 */

// web3Service.ts
const useMock = true; // <---- toggle demo mode (set false if using blockchain)

export interface ContractAddresses {
  bank: string;
  governance: string;
  bankMock: string;
}

export class Web3Service {
  private static instance: Web3Service;
  private contractAddresses: ContractAddresses | null = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  /**
   * Initialize contract addresses
   */
  async initializeContracts(): Promise<void> {
    if (useMock) {
      // No blockchain, just fake addresses for display
      this.contractAddresses = {
        bank: "0xFAKE_BANK_ADDRESS",
        governance: "0xFAKE_GOVERNANCE_ADDRESS",
        bankMock: "0xFAKE_BANKMOCK_ADDRESS",
      };
      return;
    }

    // Real blockchain contract addresses (if deployed)
    this.contractAddresses = {
      bank: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      governance: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      bankMock: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    };
  }

  /**
   * Get contract addresses
   */
  getContractAddresses(): ContractAddresses {
    if (!this.contractAddresses) {
      throw new Error("Contracts not initialized");
    }
    return this.contractAddresses;
  }

  /**
   * Request account access (mocked)
   */
  async requestAccounts(): Promise<string[]> {
    if (useMock) {
      return ["0xFAKE_USER_ADDRESS_123"];
    }

    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }
    return await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  /**
   * Get current accounts
   */
  async getAccounts(): Promise<string[]> {
    if (useMock) {
      return ["0xFAKE_USER_ADDRESS_123"];
    }

    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }
    return await window.ethereum.request({ method: "eth_accounts" });
  }

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    if (useMock) return true;
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  }

  /**
   * Switch or add network (mock-safe)
   */
  async switchNetwork(chainId: string): Promise<void> {
    if (useMock) {
      console.log(`Mock: switching to fake network ${chainId}`);
      return;
    }

    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: "Localhost 8545",
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              rpcUrls: ["http://127.0.0.1:8545"],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
  }

  weiToEther(wei: string): number {
    return parseFloat(wei) / 1e18;
  }

  etherToWei(ether: number): string {
    return (ether * 1e18).toString();
  }
}

export const web3Service = Web3Service.getInstance();
