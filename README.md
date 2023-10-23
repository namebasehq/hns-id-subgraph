# HNS.ID Subgraph

## Overview

This Subgraph sources events from the HNS.ID contracts, including the registration managers and any resolvers linked to domains. The resolvers are added through dynamic data sources.

For more information on the underlying technology, consult [The Graph Documentation](https://thegraph.com/docs/developer/quick-start/).

### Entities Diagram

![Entities Diagram](./Tld_Entity_Hierarchy_v2.png)

## Table of Contents
1. [Example Query](#example-query)
2. [Installing and Running Graph Node Locally with Docker](#installing-and-running-graph-node-locally-with-docker)
3. [Clearing Postgres Data](#clearing-postgres-data)
4. [Deploying Subgraphs](#deploying-subgraphs)
5. [Deployment to Hosted Service](#deployment-to-hosted-service)


# Example Query
```graphql
{
  tlds {
    id
    claimant {
      id
    }
    owner {
      id
      tlds {
        id
      }
      slds {
        id
      }
    }
    tokenId
    label
    registrationBlockNumber
    registrationBlockTimestamp
    lastUpdateBlockNumber
    lastUpdateTimestamp
    transferCount
    saleSettings {
      id
      enabled
      prices
      discounts
      blockNumber
      blockTimestamp
      premiumPrices {
        id
        label
        price
      }
      reservedNames {
        id
        label
        claimant
      }
    }
    slds {
      id
      label
      fullName
      owner {
        id
      }
      registrant {
        id
      }
      registrationBlockNumber
      registrationTimestamp
      lastUpdateBlockNumber
      lastUpdateTimestamp
      expirationTimestamp
      resolver {
        id
        addresses {
          id
          address
          cointype
        }
        textRecords {
          id
          key
          value
        }
        dnsRecords {
          id
          node
          name
          resource
          record
        }
        dnsZonehash
        version
        delegate {
          id
          delegate
        }
      }
      renewalCount
      renewals {
        id
        expirationTimestamp
        owner {
          id
        }
        renewer {
          id
        }
        blockNumber
        blockTimestamp
        transactionHash
      }
      transferCount
      transfers {
        id
        oldOwner {
          id
        }
        newOwner {
          id
        }
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
    royalty {
      id
      percentage
      payoutAddress {
        id
      }
    }
    royaltyHistory {
      id
      percentage
      payoutAddress {
        id
      }
      blockNumber
      blockTimestamp
      transactionHash
    }
    resolver {
      id
      addresses {
        id
        address
        cointype
      }
      textRecords {
        id
        key
        value
      }
      dnsRecords {
        id
        node
        name
        resource
        record
      }
      dnsZonehash
      version
      delegate {
        id
        delegate
      }
    }
    transfers {
      id
      oldOwner {
        id
      }
      newOwner {
        id
      }
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
}


```

## Installing and Running Graph Node Locally with Docker

### Prerequisites
- Make sure you have Docker and Docker Compose installed on your system.

### Steps

1. **Clone the Graph Node repository:**
    ```bash
    git clone https://github.com/graphprotocol/graph-node/
    ```

2. **Navigate to the Docker folder:**
    ```bash
    cd graph-node/docker
    ```

3. **Edit the `docker-compose.yml` file:**

    Locate the `ethereum` line under the `graph-node` service and set it to either:
    - `"mainnet:http://host.docker.internal:8545"` for a local Ethereum node
    - `"mainnet:https://mainnet.infura.io/v3/YOUR_INFURA_ACCESS_TOKEN"` for a remote Ethereum node via Infura

    Here's how it should look for a local node:
    ```yaml
    ethereum: "mainnet:http://host.docker.internal:8545"
    ```
    Or for a remote Infura node:
    ```yaml
    ethereum: "mainnet:https://mainnet.infura.io/v3/YOUR_INFURA_ACCESS_TOKEN"
    ```

4. **Start Docker containers:**
    ```bash
    docker-compose up
    ```


## Clearing Postgres Data

If you need to clear the Postgres data, you can delete the `data` folder under `graph-node/docker`:
```bash
rm -rf ./data
```
Then, restart the Docker containers
```bash
docker-compose down
docker-compose up
```
# Deploying Subgraphs

## Creating a Subgraph
Before deploying, you'll need to create a subgraph on the Graph Explorer
```bash
graph create --node http://localhost:8020/ hns-id-subgraph
```
## Deploying to the Local Node
If your schema has not changed, you can build and deploy your subgraph using
```bash
graph build
graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001/ hns-id-subgraph
```
If your schema has changed, you'll need to restart the Graph Node
```bash
docker-compose down
docker-compose up
```
Then build and deploy as mentioned above

### Clearing the Graph
To clear the graph and start fresh, you can delete the Postgres data folder
```bash
rm -rf ./data
# Then restart the Docker containers
```bash
docker-compose down
docker-compose up
```


## Deployment to Hosted Service

This section provides instructions for deploying your subgraph to a hosted service. It assumes that you have already created and tested the subgraph locally.

### Steps

1. **Authentication:**
    ```bash
    graph auth --product hosted-service YOUR_ACCESS_TOKEN
    ```

2. **Deploy:**
    ```bash
    graph deploy --product hosted-service YOUR_SUBGRAPH_NAME
    ```

This will deploy your subgraph to the hosted service where it will be publicly queryable.


```sh
# init new subgraph repo from contract
graph init --product subgraph-studio --from-contract 0xDDa56f06D80f3D8E3E35159701A63753f39c3BCB --contract-name 

# deploying subgraph
graph auth --studio xxxx
graph codegen
graph build
graph deploy --studio hns-id

# deploying hosted service
graph auth --product hosted-service xxxxx
graph deploy --product hosted-service namebasehq/hns-id
```
