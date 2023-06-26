import configs from "./configs.js";

const web3Instance = new Web3(configs.provider);

export default {
    web3Instance
};