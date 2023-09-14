# HNS.ID Subgraph

This Subgraph sources events from the HNS.ID contracts. This includes the registration managers and any resolvers that are created and linked to domains. The resolvers are added through dynamic data sources. More information on all of this can be found at [The Graph Documentation](https://thegraph.com/docs/developer/quick-start/).

### Example Query
```

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
# Then, restart the Docker containers
```bash
docker-compose down
docker-compose up
```
# Deploying Subgraphs

## Creating a Subgraph
# Before deploying, you'll need to create a subgraph on the Graph Explorer
```bash
graph create --node http://localhost:8020/ hns-id-subgraph         
```
## Deploying to the Local Node
# If your schema has not changed, you can build and deploy your subgraph using
```bash
graph build
graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001/ hns-id-subgraph
```
# If your schema has changed, you'll need to restart the Graph Node
```bash
docker-compose down
docker-compose up
```
# Then build and deploy as mentioned above

# Clearing the Graph
# To clear the graph and start fresh, you can delete the Postgres data folder
```bash
rm -rf ./data
# Then restart the Docker containers
```bash
docker-compose down
docker-compose up
graph deploy --studio hns-id

# deploying hosted service
graph auth --product hosted-service 21ff9bf3e7d7f7ab4c524014a1588d78
graph deploy --product hosted-service namebasehq/hns-id
```
