# HNS.ID Subgraph

This Subgraph sources events from the HNS.ID contracts. This includes the registration managers and any resolvers that are created and linked to domains. The resolvers are added through dynamic data sources. More information on all of this can be found at [The Graph Documentation](https://thegraph.com/docs/developer/quick-start/).


```sh
# init new subgraph repo from contract
graph init --product subgraph-studio --from-contract 0xDDa56f06D80f3D8E3E35159701A63753f39c3BCB --contract-name DefaultResolver --start-block 108383420 --network optimism --protocol ethereum hns-id 
  
# https://optimistic.etherscan.io/address/0xDDa56f06D80f3D8E3E35159701A63753f39c3BCB
graph add 0xDDa56f06D80f3D8E3E35159701A63753f39c3BCB --contract-name DefaultResolver --start-block 108383420 --merge-entities

# https://optimistic.etherscan.io/address/0xfda87cc032cd641ac192027353e5b25261dfe6b3
graph add 0xfda87cc032cd641ac192027353e5b25261dfe6b3 --contract-name SldRegistrationManager --start-block 108382558 --merge-entities

# https://optimistic.etherscan.io/address/0x01eBCf32e4b5da0167eaacEA1050B2be63122B6f
graph add 0x01eBCf32e4b5da0167eaacEA1050B2be63122B6f --contract-name HandshakeTld --start-block 108382202 --merge-entities

# https://optimistic.etherscan.io/address/0x7963bfA8F8f914b9776ac6259a8C39965d26f42F
graph add 0x7963bfA8F8f914b9776ac6259a8C39965d26f42F --contract-name HandshakeSld --start-block 108382206 --merge-entities

# https://optimistic.etherscan.io/address/0x84EE3763E5F2faB55E8d7197632Aa234159C2f5f
graph add 0x84EE3763E5F2faB55E8d7197632Aa234159C2f5f --contract-name SldCommitIntent --start-block 108382221 --merge-entities

# https://optimistic.etherscan.io/address/0x9209397263427413817Afc6957A434cF62C02c68
graph add 0x9209397263427413817Afc6957A434cF62C02c68 --contract-name TldClaimManager --start-block 108382569 --merge-entities

# https://optimistic.etherscan.io/address/0x0F1143972197B63053709794f718e60599Ce4730
graph add 0x0F1143972197B63053709794f718e60599Ce4730 --contract-name DefaultRegistrationStrategy --start-block 108382562 --merge-entities

# https://optimistic.etherscan.io/address/0x0b26062CB10DA260CC1659C2a4b2fDe6023f4B18
# graph add 0x0b26062CB10DA260CC1659C2a4b2fDe6023f4B18 --contract-name LabelValidator --start-block 123 --merge-entities

# https://optimistic.etherscan.io/address/0x178767FDEA4D43C8B7086C4B92a2569db930655C
# graph add 0x178767FDEA4D43C8B7086C4B92a2569db930655C --contract-name UsdPriceOracle --start-block 123 --merge-entities

# https://optimistic.etherscan.io/address/0xe2E4d33f5E2cd7c9b74cedfcbF8Bd6C3A239e2c9
# graph add 0xe2E4d33f5E2cd7c9b74cedfcbF8Bd6C3A239e2c9 --contract-name GlobalRegistrationRules --start-block 123 --merge-entities

# https://optimistic.etherscan.io/address/0x93Cea80D190eB1401b15e3dbBE3d0392D32e3FCf
# graph add 0x93Cea80D190eB1401b15e3dbBE3d0392D32e3FCf --contract-name GenericMetadataService --start-block 123 --merge-entities

```
