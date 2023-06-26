# Web3 Research

## Prepare Environment

+ Install [Ganache](https://trufflesuite.com/docs/ganache/) for local blockchain.
+ Install [Truffle](https://trufflesuite.com/docs/truffle/) for smart contract develop, compile, deploy to blockchain with Solidity.


## Example 

### test-project

+ Using Web3.js
+ Folder description: 
    - contracts: contract code
    - dapp: web app to interactive with contracts
+ Notice: The MetaCoin contract is not a ERC-20 contract!!!


### Run Test Project

+ CD to test-project folder
    ```linux
    cd ./test-project
    ```
+ Modify the config of truffle in ``truffle-config.js`` file
    - find ``networks.development``
    - change the config to your blockchain which create with Ganache
+ complie contract & deploy contract
    ```linux
    truffle build
    truffle migrate
    ```
+ Find the From Address & Contract Address in Ganache > TRANSACTIONS tab, then replace the value in dapp > js > configs.js 
+ Deploy the dapp to your web server then visit the website
+ Enjoy the journey