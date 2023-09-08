export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tokenNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_enabled",
        type: "bool",
      },
    ],
    name: "EnabledSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tokenNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_prices",
        type: "uint256[]",
      },
    ],
    name: "LengthCostSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tokenNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_discounts",
        type: "uint256[]",
      },
    ],
    name: "MultiYearDiscountSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tokenNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
    ],
    name: "PremiumNameSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tokenNamehash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_claimant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
    ],
    name: "ReservedNameSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_buyingAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_registrationLength",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isRenewal",
        type: "bool",
      },
    ],
    name: "getPriceInDollars",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
    ],
    name: "isEnabled",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
] as const;
