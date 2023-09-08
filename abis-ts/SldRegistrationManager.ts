[
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
        components: [
          {
            internalType: "uint80",
            name: "startTimestamp",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "endTimestamp",
            type: "uint80",
          },
          {
            internalType: "uint8",
            name: "discountPercentage",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isRegistration",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isRenewal",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct SldDiscountSettings",
        name: "_discount",
        type: "tuple",
      },
    ],
    name: "DiscountSet",
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
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "PaymentSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tldNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_secret",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
    ],
    name: "RegisterSld",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_tldNamehash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
    ],
    name: "RenewSld",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
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
    name: "ValidSigner",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressDiscounts",
    outputs: [
      {
        internalType: "uint80",
        name: "startTimestamp",
        type: "uint80",
      },
      {
        internalType: "uint80",
        name: "endTimestamp",
        type: "uint80",
      },
      {
        internalType: "uint8",
        name: "discountPercentage",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isRegistration",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isRenewal",
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
        name: "buyer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "subdomainHash",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "checkSignatureValid",
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
    name: "commitIntent",
    outputs: [
      {
        internalType: "contract ICommitIntent",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeWalletPayoutAddress",
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
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addr",
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
    name: "getRegistrationBasePrice",
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
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "subdomainHash",
        type: "bytes32",
      },
    ],
    name: "getRegistrationHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addr",
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
    ],
    name: "getRegistrationPrice",
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
        internalType: "address",
        name: "_addr",
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
    ],
    name: "getRenewalPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
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
    ],
    name: "getRenewalPricePerDay",
    outputs: [
      {
        internalType: "uint256",
        name: "_price",
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
        name: "_sldNamehash",
        type: "bytes32",
      },
    ],
    name: "getTenYearGuarenteedPricing",
    outputs: [
      {
        internalType: "uint80[10]",
        name: "_history",
        type: "uint80[10]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWeiValueOfDollar",
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
    name: "globalStrategy",
    outputs: [
      {
        internalType: "contract IGlobalRegistrationRules",
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
        internalType: "contract IHandshakeTld",
        name: "_tld",
        type: "address",
      },
      {
        internalType: "contract IHandshakeSld",
        name: "_sld",
        type: "address",
      },
      {
        internalType: "contract ICommitIntent",
        name: "_commitIntent",
        type: "address",
      },
      {
        internalType: "contract IPriceOracle",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "contract ILabelValidator",
        name: "_validator",
        type: "address",
      },
      {
        internalType: "contract IGlobalRegistrationRules",
        name: "_globalRules",
        type: "address",
      },
      {
        internalType: "address",
        name: "_payoutWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "minDevContribution",
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
    name: "percentCommission",
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
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pricesAtRegistration",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_secret",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_registrationLength",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "registerWithCommit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
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
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "registerWithSignature",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
      {
        internalType: "uint80",
        name: "_registrationLength",
        type: "uint80",
      },
    ],
    name: "renewSld",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "bytes32",
        name: "_parentNamehash",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint80",
            name: "startTimestamp",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "endTimestamp",
            type: "uint80",
          },
          {
            internalType: "uint8",
            name: "discountPercentage",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isRegistration",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isRenewal",
            type: "bool",
          },
        ],
        internalType: "struct SldDiscountSettings[]",
        name: "_discounts",
        type: "tuple[]",
      },
    ],
    name: "setAddressDiscounts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sld",
    outputs: [
      {
        internalType: "contract IHandshakeSld",
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
    name: "sldRegistrationHistory",
    outputs: [
      {
        internalType: "uint80",
        name: "RegistrationTime",
        type: "uint80",
      },
      {
        internalType: "uint80",
        name: "RegistrationLength",
        type: "uint80",
      },
      {
        internalType: "uint96",
        name: "RegistrationPrice",
        type: "uint96",
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
    name: "subdomainRegistrationNonce",
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
    name: "tld",
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
        internalType: "contract ICommitIntent",
        name: "_commitIntent",
        type: "address",
      },
    ],
    name: "updateCommitIntent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGlobalRegistrationRules",
        name: "_strategy",
        type: "address",
      },
    ],
    name: "updateGlobalRegistrationStrategy",
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
        name: "_minFeeInWei",
        type: "uint256",
      },
    ],
    name: "updateMinDevFee",
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
    ],
    name: "updatePaymentAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_percent",
        type: "uint256",
      },
    ],
    name: "updatePaymentPercent",
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
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "updateSigner",
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
