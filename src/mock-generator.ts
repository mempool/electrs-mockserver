import { Block, Transaction } from './interfaces';
import * as fs from 'fs';

const INITIAL_BLOCKS_AMOUNT = 10;

class MockGenerator {
  rbfFee = 6825;
  lastRbfTxId = '';
  auto = false;
  tip: number = 633008;
  blocks: Block[] = [];
  mempoolTransactions: Transaction[] = [];
  randomTransactions: Transaction[] = [];
  blockTransactions: { [hash: string]:  Transaction[] }  = {};

  constructor() {
    this.loadRandomTransactions();
    this.addMempoolTransactions((INITIAL_BLOCKS_AMOUNT) * 100);

    for (let i = 0; i < INITIAL_BLOCKS_AMOUNT; i++) {
      this.createNewBlock();
    }

    setInterval(() => { if (!this.auto) { return; } this.addMempoolTransactions(4); }, 1000);
    setInterval(() => { if (!this.auto) { return; } this.createNewBlock(); }, 25000);

    this.addBisqTransaction();
  }

  addBisqTransaction() {
    this.mempoolTransactions.push(
      {'txid':'9ea4949cd3accdb4317e507937198ab5bc0bc07040079a9c8a2956fdbb054ed4','version':1,'locktime':0,'vin':[{'txid':'0c0ad832044d4fb6fa3210bbc478430fbf712386c1e644dd6aa3fec1611e3148','vout':0,'prevout':{'scriptpubkey':'76a91483882a62fdb3d6640cc665f80a3d511a5bcf0b3188ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 83882a62fdb3d6640cc665f80a3d511a5bcf0b31 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'1CzUe5cy84JgJG7jQqjich6P9qXhUtZCX1','value':620},'scriptsig':'47304402203f327ef19b4853f6331d4fd73f2ffff687c17030955f9950b0d6360a1c0c142102206e913f87d2db80a8ff960ca1eecd595a03d042207e3e8fd149d15b651584ae8101210291096355cf995d7c961c50f2b319498b9513c2a51586dd7a2425c0084bbebef2','scriptsig_asm':'OP_PUSHBYTES_71 304402203f327ef19b4853f6331d4fd73f2ffff687c17030955f9950b0d6360a1c0c142102206e913f87d2db80a8ff960ca1eecd595a03d042207e3e8fd149d15b651584ae8101 OP_PUSHBYTES_33 0291096355cf995d7c961c50f2b319498b9513c2a51586dd7a2425c0084bbebef2','is_coinbase':false,'sequence':4294967295},{'txid':'0401cafaee7684b7b5ff119377a96096b07c25e872ed5d1d841c44da3618b861','vout':0,'prevout':{'scriptpubkey':'76a91453df36e60de2636fd331fd901c6581b99afc9cf188ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 53df36e60de2636fd331fd901c6581b99afc9cf1 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'18eUV8kcv3BA7fghsSZfjTesRGi5e4dG8Q','value':9763},'scriptsig':'483045022100c7c87237eb817d8239ca81d5d7f61cb50af7601f91e17367c317c977ee3d44860220751292858e2061825df647c62a022fe9c29fc1ccb8c5c8edf3abb05de0d27fe50121023ae2ad208bdcccf6dcded15dde5c25361f9b24fe49e21a1bc0e0c43d83ae9aff','scriptsig_asm':'OP_PUSHBYTES_72 3045022100c7c87237eb817d8239ca81d5d7f61cb50af7601f91e17367c317c977ee3d44860220751292858e2061825df647c62a022fe9c29fc1ccb8c5c8edf3abb05de0d27fe501 OP_PUSHBYTES_33 023ae2ad208bdcccf6dcded15dde5c25361f9b24fe49e21a1bc0e0c43d83ae9aff','is_coinbase':false,'sequence':4294967295},{'txid':'d1aa28bdc2aa23721d3cd752096e5d63b4a7e97b1108cad2a22ef6fa5e119594','vout':0,'prevout':{'scriptpubkey':'76a914e278a3943077f29a9d1e708d482cc247726b466088ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 e278a3943077f29a9d1e708d482cc247726b4660 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'1MeUEVpjtUbvQhkCAEa4wUSAVmiKXZdtpZ','value':10500000},'scriptsig':'463043021f569532a51e772c887f43fb4708f7d1172614e053e01005d9d0d6d1849ec4b102201fa0b5a2a25092fe07cf728bafbff0fd0de0dd64ca332f80043bc84f556ed50b0121032f7fb9837b4af2669381f2837637d9553d61815fa8c94f509707c6ad8407a0de','scriptsig_asm':'OP_PUSHBYTES_70 3043021f569532a51e772c887f43fb4708f7d1172614e053e01005d9d0d6d1849ec4b102201fa0b5a2a25092fe07cf728bafbff0fd0de0dd64ca332f80043bc84f556ed50b01 OP_PUSHBYTES_33 032f7fb9837b4af2669381f2837637d9553d61815fa8c94f509707c6ad8407a0de','is_coinbase':false,'sequence':4294967295}],'vout':[{'scriptpubkey':'76a914d26402eddc4e3e4e056806db84d0c1d0aa64e4b788ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 d26402eddc4e3e4e056806db84d0c1d0aa64e4b7 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'1LBSiCfqExVi4guv269zXAB4PpCjDJxa1j','value':10325},{'scriptpubkey':'76a9146edab495aa676a00212c1ee641a7820cd77cc1a088ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 6edab495aa676a00212c1ee641a7820cd77cc1a0 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'1B79L28kgaiuytndJziEN6sDr5C7ag4XQx','value':1500000},{'scriptpubkey':'76a914c9b89b5f2cb9f71cc75500dff840e497834d129688ac','scriptpubkey_asm':'OP_DUP OP_HASH160 OP_PUSHBYTES_20 c9b89b5f2cb9f71cc75500dff840e497834d1296 OP_EQUALVERIFY OP_CHECKSIG','scriptpubkey_type':'p2pkh','scriptpubkey_address':'1KPbyGkqjmrS3gn5DW7LvG1ie5t2NYRhLk','value':8995958}],'size':553,'weight':2212,'fee':4100,'status':{'confirmed':false}}
    );
  }

  addRbfTransaction(): string {
    if (this.lastRbfTxId !== '') {
      const index = this.mempoolTransactions.findIndex((tx) => tx.txid === this.lastRbfTxId);
      if (index > -1) {
        this.mempoolTransactions.splice(index, 1);
      }
    }
    this.rbfFee *= 1.5;
    const txHash = this.getRandomTxHash();
    this.lastRbfTxId = txHash;
    console.log('******* RBF Transaction *****', txHash);
    this.mempoolTransactions.push({
        'txid': txHash,
        'version': 2,
        'locktime': 632699,
        'vin': [
          {
            'txid': '02238126a63ea2669c5f378012180ef8b54402a949316f9b2f1352c51730a086',
            'vout': 0,
            'prevout': {
              'scriptpubkey': 'a914f8e495456956c833e5e8c69b9a9dc041aa14c72f87',
              'scriptpubkey_asm': 'OP_HASH160 OP_PUSHBYTES_20 f8e495456956c833e5e8c69b9a9dc041aa14c72f OP_EQUAL',
              'scriptpubkey_type': 'p2sh',
              'scriptpubkey_address': '3QP3LMD8veT5GtWV83Nosif2Bhr73857VB',
              'value': 25000000
            },
            'scriptsig': '22002043288fbbc0fc5efa86c229dbb7d88ab78d57957c65b5d5ceaece70838976ad1b',
            'scriptsig_asm': 'OP_PUSHBYTES_34 002043288fbbc0fc5efa86c229dbb7d88ab78d57957c65b5d5ceaece70838976ad1b',
            'witness': [
              '',
              '3044022009e2d3a8e645f65bc89c8492cd9c08e6fb02609fd402214884a754a1970145340220575bb325429def59f3a3f1e22d9740a3feecbe97438ff3bb5796b2c46b3c477f01',
              '3044022039c34372882da8fc1c1243bd72b5e7e5e6870301ef56bdebb87bc647fb50f9b5022071a704ee77d742f78b10e45be675d4c45a5f31e884139e75c975144fde70e41701',
              '522102346eb7133f11e0dc279bc592d5ac948a91676372a6144c9ae2085625d7fbf70421021b9508a458f9d59be4eb8cc87ad582c3b494106fb1d4ec22801569be0700eb7b52ae'
            ],
            'is_coinbase': false,
            'sequence': 4294967293,
            'inner_redeemscript_asm': 'OP_0 OP_PUSHBYTES_32 43288fbbc0fc5efa86c229dbb7d88ab78d57957c65b5d5ceaece70838976ad1b',
            'inner_witnessscript_asm': 'OP_PUSHNUM_2 OP_PUSHBYTES_33 02346eb7133f11e0dc279bc592d5ac948a91676372a6144c9ae2085625d7fbf704 OP_PUSHBYTES_33 021b9508a458f9d59be4eb8cc87ad582c3b494106fb1d4ec22801569be0700eb7b OP_PUSHNUM_2 OP_CHECKMULTISIG'
          }
        ],
        'vout': [
          {
            'scriptpubkey': 'a914fd4e5e59dd5cf2dc48eaedf1a2a1650ca1ce9d7f87',
            'scriptpubkey_asm': 'OP_HASH160 OP_PUSHBYTES_20 fd4e5e59dd5cf2dc48eaedf1a2a1650ca1ce9d7f OP_EQUAL',
            'scriptpubkey_type': 'p2sh',
            'scriptpubkey_address': '3QnNmDhZS7toHA7bhhbTPBdtpLJoeecq5c',
            'value': 13986350
          },
          {
            'scriptpubkey': '76a914edc93d0446deec1c2d514f3a490f050096e74e0e88ac',
            'scriptpubkey_asm': 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 edc93d0446deec1c2d514f3a490f050096e74e0e OP_EQUALVERIFY OP_CHECKSIG',
            'scriptpubkey_type': 'p2pkh',
            'scriptpubkey_address': '1NgJDkTUqJxxCAAZrrsC87kWag5kphrRtM',
            'value': 11000000
          }
        ],
        'size': 372,
        'weight': 828,
        'fee': this.rbfFee,
        'status': { 'confirmed': false }
      }
    );
    return txHash;
  }

  setAuto(auto: boolean): void {
    this.auto = !!auto;
  }

  createNewBlock(): void {
    const newBlockTransactions = this.mempoolTransactions.sort((a, b) => b['_feePerVsize'] - a['_feePerVsize'] ).splice(0, 100);

    this.tip++;
    const template = {
      'id': this.getRandomBlockHash(),
      'height': this.tip,
      'version': 939515904,
      'timestamp': this.getTimeStamp(),
      'tx_count': newBlockTransactions.length,
      'size': newBlockTransactions.reduce((a, b) => a + b.size, 0),
      'weight': newBlockTransactions.reduce((a, b) => a + b.weight, 0),
      'merkle_root': this.getRandomBlockHash(),
      'previousblockhash': this.getRandomBlockHash(),
      'nonce': 2877743144,
      'bits': 387094518,
    };

    newBlockTransactions.unshift(this.generateCoinbaseTransaction(template));

    console.log('Creating block #' + template.height, template.id);
    this.blocks.push(template);

    newBlockTransactions.forEach((tx) => {
      tx.status = {
        'confirmed': true,
        'block_height': template.height,
        'block_hash': template.id,
        'block_time': template.timestamp,
      };
    });

    // Add transactions to block
    this.blockTransactions[template.id] = newBlockTransactions;
  }

  getRandomTx(): Transaction {
    return this.randomTransactions[this.getRandomNumberBetween(0, this.randomTransactions.length - 1)];
  }

  getRandomBlock(): Block {
    return this.blocks[this.getRandomNumberBetween(0, this.blocks.length - 1)];
  }

  addMempoolTransactions(amount: number): void {
    for (let i = 0; i < amount; i++) {
      let randomTx = this.getRandomTx();
      randomTx = JSON.parse(JSON.stringify(randomTx));
      randomTx.size = 10000;
      randomTx.weight = 40000;
      // @ts-ignore
      randomTx['_feePerVsize'] = randomTx.feePerVsize * 4;
      randomTx.fee = randomTx.fee * 80;
      randomTx.txid = this.getRandomTxHash();
      console.log('Creating transaction', randomTx.txid);
      delete randomTx['firstSeen'];
      delete randomTx['feePerVsize'];
      this.mempoolTransactions.push(randomTx);
    }
  }

  private getTimeStamp(): number {
    return (new Date()).getTime() / 1000;
  }

  private loadRandomTransactions(): void {
    const transactionObjects = JSON.parse(fs.readFileSync('db/mempool.json', 'utf8')).mempool;
    this.randomTransactions = Object.values(transactionObjects);
  }

  private generateCoinbaseTransaction(block: Block): Transaction {
    return {
      'txid': this.getRandomBlockHash(),
      'version': 1,
      'fee': 0,
      'locktime': 2110681864,
      'vin': [
          {
              'txid': '0000000000000000000000000000000000000000000000000000000000000000',
              'vout': 4294967295,
              'prevout': null,
              'scriptsig': '0351a90904f206da5e2f706f6f6c696e2e636f6d2ffabe6d6d77baef22a696c4b203c8b2d0a8e2a32519232eeefb41d37532245e92059e4b9101000000000000001f9e6ee782ece45b0c676f9532f7cd5810591e677a00761a000000000000',
              'scriptsig_asm': 'OP_PUSHBYTES_3 51a909 OP_PUSHBYTES_4 f206da5e OP_PUSHBYTES_47 706f6f6c696e2e636f6d2ffabe6d6d77baef22a696c4b203c8b2d0a8e2a32519232eeefb41d37532245e92059e4b91 OP_PUSHBYTES_1 00 OP_0 OP_0 OP_0 OP_0 OP_0 OP_0 OP_PUSHBYTES_31 <push past end>',
              'witness': [
                  '0000000000000000000000000000000000000000000000000000000000000000'
              ],
              'is_coinbase': true,
              'sequence': 4294967295
          }
      ],
      'vout': [
          {
              'scriptpubkey': '76a91467b8392ea973b086758ee0d2c56a8e727f740c5188ac',
              'scriptpubkey_asm': 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 67b8392ea973b086758ee0d2c56a8e727f740c51 OP_EQUALVERIFY OP_CHECKSIG',
              'scriptpubkey_type': 'p2pkh',
              'scriptpubkey_address': '1ATRHpi6GxaLX4CLwEimTHiBP7HMktS2Uc',
              'value': 640772666
          },
          {
              'scriptpubkey': '6a24b9e11b6d067b8923e8c71fbb4282caa39d0f79c6b8ebcb99cae14430bc7be60ccab1ec21',
              'scriptpubkey_asm': 'OP_RETURN OP_PUSHBYTES_36 b9e11b6d067b8923e8c71fbb4282caa39d0f79c6b8ebcb99cae14430bc7be60ccab1ec21',
              'scriptpubkey_type': 'op_return',
              'value': 0
          },
          {
              'scriptpubkey': '6a24aa21a9ed0744f136a6a03cee4a0288471b83c305503681901bdd4061d96e35d963076e36',
              'scriptpubkey_asm': 'OP_RETURN OP_PUSHBYTES_36 aa21a9ed0744f136a6a03cee4a0288471b83c305503681901bdd4061d96e35d963076e36',
              'scriptpubkey_type': 'op_return',
              'value': 0
          },
          {
              'scriptpubkey': '6a2952534b424c4f434b3a2de33de44af1c17a9bee59ed4c094e64d3d97f0b1fd283ba91a46c1b0024e0b7',
              'scriptpubkey_asm': 'OP_RETURN OP_PUSHBYTES_41 52534b424c4f434b3a2de33de44af1c17a9bee59ed4c094e64d3d97f0b1fd283ba91a46c1b0024e0b7',
              'scriptpubkey_type': 'op_return',
              'value': 0
          }
      ],
      'size': 362,
      'weight': 1340,
      'status': {
          'confirmed': true,
          'block_height': block.height,
          'block_hash': block.id,
          'block_time': block.timestamp,
      }
    };
  }

  private getRandomBlockHash(): string {
    return '00000000' + this.getRandomSha256(56, 'abcdefABCDEF123456789');
  }

  private getRandomTxHash(): string {
    return this.getRandomSha256(64, 'abcdefABCDEF123456789');
  }

  private getRandomSha256(length: number, charset: string): string {
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  private getRandomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default new MockGenerator();
