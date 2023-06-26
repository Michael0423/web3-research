import * as tokenList from "./token-list.js";
import Web3Provider from './web3-provider.js';
import configs from "./configs.js";

const web3Instance = Web3Provider.web3Instance 
console.log(tokenList.default);

const tokenListDiv = document.getElementById('token_list');
const contracts = {};
tokenList.default.forEach(token => {
    createTokenList(tokenListDiv, token);
    contracts[token.contractName] = new web3Instance.eth.Contract(token.abi, token.networks[5777].address);
    contracts[token.contractName].defaultAccount = configs.defaultAccount; // contract owner
    contracts[token.contractName].defaultChain = 5777;
});


function createTokenList(area, token) {
    const tokenElement = document.createElement('div');
    tokenElement.classList = ['token-area'];

    const contractNameDiv = document.createElement('div');
    contractNameDiv.innerText = token.contractName;
    
    const functionListDiv = document.createElement('ul');
    const abis = token.abi;
    abis.forEach(abi => {
        if(abi.type === 'function') createABIItem(functionListDiv, token.contractName, abi);
    });

    tokenElement.append(contractNameDiv);
    tokenElement.append(functionListDiv);
    area.append(tokenElement);
}


function createABIItem(area, contractName, abi) {
    const abiDiv = document.createElement('li');

    const abiNameDiv = document.createElement('div');
    abiNameDiv.innerText = abi.name;
    abiDiv.append(abiNameDiv);

    if(abi.inputs.length > 0) {
        const paramsDiv = document.createElement('div');

        abi.inputs.forEach(param => {
            const paramLabel = document.createElement('label');

            const paramSpan = document.createElement('span');
            paramSpan.innerText = param.name;
            paramSpan.classList = ['param'];

            const input = document.createElement('input');
            switch(param.type){
                case 'address':
                    input.type = 'text';
                    break;
                case 'uint256':
                case 'uint128':
                case 'uint64':
                case 'uint32':
                case 'uint16':
                case 'uint8':
                    input.type = 'number';
                    break;
            }
            input.placeholder = param.name;

            paramLabel.append(paramSpan);
            paramLabel.append(input);
                
            paramsDiv.append(paramLabel);
        });

        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Submit';
        submitBtn.addEventListener('click', () => {
            console.log(contracts[contractName]);
            console.log(`trigger function: ${abi.name}`);
            const method = abi.name;

            let params = [];
            paramsDiv.querySelectorAll('input').forEach((v) => {
                params.push(v.value);
            });
            console.log(params);

            console.log(contractName, method)
            // 用abi名稱來判斷使用call/send
            if(method.search('get') !== -1){
                contracts[contractName].methods[method](...params).call().then((res) => {
                    console.log(res);
                });
            } else if(method.search('send') !== -1){
                contracts[contractName].methods[method](...params).send().then((res) => {
                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });

        abiDiv.append(paramsDiv);
        abiDiv.append(submitBtn);
    }

    area.append(abiDiv);
}