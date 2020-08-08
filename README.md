# electrs-mockserver
A simple mock server that emulated electrs responses for the mempool project backend

## Install

```bash
yarn install
```

Place a mempool.space mempool dump into /db named mempool.json

## Run
```bash
ts-node src/index.ts
```

## Configure 
for the mockserver: 
```
mkdir db
cp mempool.json db
```

for the mempool-config.json
```
"ELECTRS_API_URL": "http://localhost:50001"
```

## Commands

http://localhost:50001/start-auto (starts automatic random transaction and block creation)

http://localhost:50001/stop-auto

http://localhost:50001/create-block

http://localhost:50001/create-transactions?amount={amount}
