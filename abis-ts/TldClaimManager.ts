export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_claimant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_manager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
    ],
    name: "AllowedTldMintUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_labelValidator",
        type: "address",
      },
    ],
    name: "NewLabelValidator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_usdEthPriceOracle",
        type: "address",
      },
    ],
    name: "NewUsdOracle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
    ],
    name: "TldClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_allowed",
        type: "bool",
      },
    ],
    name: "UpdateAllowedTldManager",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addr",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "_domain",
        type: "string[]",
      },
    ],
    name: "addTldAndClaimant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowedTldManager",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_namehash",
        type: "bytes32",
      },
    ],
    name: "canClaim",
    outputs: [
      {
        internalType: "bool",
        name: "_canClaim",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_domain",
        type: "string",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "claimTld",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultRegistrationStrategy",
    outputs: [
      {
        internalType: "contract ISldRegistrationStrategy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintPriceInWei",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "handshakeTldContract",
    outputs: [
      {
        internalType: "contract IHandshakeTld",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "handshakeWalletPayoutAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ILabelValidator",
        name: "_validator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract IHandshakeTld",
        name: "_tld",
        type: "address",
      },
      {
        internalType: "contract ISldRegistrationStrategy",
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "contract IPriceOracle",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintPriceInDollars",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_handshakeWalletPayoutAddress",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "isNodeRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "labelValidator",
    outputs: [
      {
        internalType: "contract ILabelValidator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPriceInDollars",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHandshakeTld",
        name: "_tld",
        type: "address",
      },
    ],
    name: "setHandshakeTldContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tldClaimantMap",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tldProviderMap",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_allowed",
        type: "bool",
      },
    ],
    name: "updateAllowedTldManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ILabelValidator",
        name: "_validator",
        type: "address",
      },
    ],
    name: "updateLabelValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_priceInDollarDecimals",
        type: "uint256",
      },
    ],
    name: "updateMintPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPriceOracle",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "updatePriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdOracle",
    outputs: [
      {
        internalType: "contract IPriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
