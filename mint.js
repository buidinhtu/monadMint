const Web3 = require("web3")
const web3 = new Web3("https://testnet-rpc.monad.xyz")
const privateKey = "5072916aaabe2db9fc83782564980fe09f070284fd184a7172dcf355aeb5a731" // input privateKey
async function sendTransaction(wallet, privateKey, contractAddress, inputData, value) {
    console.log(wallet)
    try {
        const transaction = {
            to: contractAddress,
            data: inputData,
            from: wallet,            
            value: web3.utils.toWei(value.toString(), 'ether'),
        };


        const gasLimit = await web3.eth.estimateGas(transaction);
        console.log(gasLimit)
        transaction.gasLimit = web3.utils.toHex(gasLimit);
        transaction.gasPrice = web3.utils.toHex(web3.utils.toWei('53', 'gwei'));

        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log('Transaction receipt', receipt.blockHash);
    } catch (err) {
        console.error('Transaction error:', err);
    }
}

async function mint(_wallet, wallet, privateKey, ct) {
    for(const c of ct ){
        try {
            const inputData = "0x1ff7712f00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
            await sendTransaction(wallet, privateKey, c, inputData, 0)
        } catch {}
    }
}
async function main() {
    const ct = [
        "0x9077D31A794D81c21b0650974d5F581F4000CD1a"
    ]
    
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const wallet = account.address
    const _wallet = wallet.split("x")[1]
    mint(_wallet, wallet, privateKey, ct)
}

main()
