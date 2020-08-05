import { Transaction, Block, Address } from './interfaces';
import mockGenerator from './mock-generator';

class Api {
  constructor() { }

  getMempoolInfo(): any {
    return {
      'count': mockGenerator.mempoolTransactions.length,
      'vsize': mockGenerator.mempoolTransactions.map((tx) => tx.weight / 4),
    };
  }

  getRawMempool(): string[] {
    return mockGenerator.mempoolTransactions.map((tx) => tx.txid);
  }

  getRawTransaction(txId: string): Transaction | undefined {
    const findMempoolTx = mockGenerator.mempoolTransactions.find((tx) => txId === tx.txid);
    if (findMempoolTx) {
      return findMempoolTx;
    }

    for (const block in mockGenerator.blockTransactions) {
      if (true) {
        const tx = mockGenerator.blockTransactions[block].find((t) => txId === t.txid);
        if (tx) {
          return tx;
        }
      }
    }

    console.log('could not locate TX', txId);
  }

  getBlocks() {
    return mockGenerator.blocks.slice(mockGenerator.blocks.length - 10, mockGenerator.blocks.length).reverse();
  }

  getTransactionsForBlockFrom(hash: string, fromHash: string) {
    return mockGenerator.blockTransactions[hash].slice(0, 10);
  }

  getRandomTx(): Transaction {
    return mockGenerator.getRandomTx();
  }

  getBlockHeightTip(): number {
    return mockGenerator.tip;
  }

  getTxIdsForBlock(hash: string): string[] {
    return mockGenerator.blockTransactions[hash].map((tx: Transaction) => tx.txid);
  }

  getBlockHash(height: string): string {
    const findblock = mockGenerator.blocks.find((blk) => blk.height === parseInt(height, 10));
    if (findblock) {
      return findblock.id;
    } else {
      return '';
    }
  }

  getBlock(hash: string): Block | undefined {
    const block = mockGenerator.blocks.find((blk) => blk.id === hash);
    if (block) {
      return block;
    }
    console.log('cant find block with hash' + hash + ' returning random block.');
    return mockGenerator.getRandomBlock();
  }

  getAddress(address: string): Address {
    return {"address":"2MvFhfwmyb2Zci6YdivuTyJGKBvVEBwcLBE","chain_stats":{"funded_txo_count":315,"funded_txo_sum":13464123699,"spent_txo_count":314,"spent_txo_sum":13427390245,"tx_count":626},"mempool_stats":{"funded_txo_count":0,"funded_txo_sum":0,"spent_txo_count":0,"spent_txo_sum":0,"tx_count":0}};
  }

  getAddressses(prefix: string) {
    return ["1a113XgWoA8hi5e3jvbkoMBxxthVsm9Xk","1a119xrUWML42xyoV3QUjZGMxF3HAsro6","1a11KAx1bQmCE7fuwG54tyv3CLZHByq9W","1a11LD4orSd3Whp4VaHRwW9U4n7dVNyk8","1a11Vjzo5LQ5PXY4ZaUr3qi3tSrZmqhG6","1a11dzCKy7WEbmrMQvj1tPyGeQnxJfS5C","1a11t25Y6nJMRwbJQgmPTY14buWovFi6d","1a12FaGQAZG88kjUKTC9c4JrSVqgZrAo6","1a12V34C2Ghfw7REM6BqN9JQyFc9mZkzz","1a135i9SdVqLET821221agyVBmWUh92Xr",
    "Bc1p23jk6urvv96x2gp3yqszqgpqyqszqgqa6qtuj", "bc1p8qsysgrgypgjqufqtgs85gpcyqjzqsqfrw0l9", "bc1p8ysyjgrfypfzqu3q9usrqgpeyqnzqfgexpv74", "bc1pq2kqvpm76ewe20lcacq740p054at9sv7vxs0jn2u0r90af0k633322m7s8v", "bc1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqs3wf0qm", "bc1pv22mcnt30gwvk8g72szz700n4tkkx2qur2adj6pt8hl37hcf9dascxyf42", "bc1px5sy2gr9yp8zqm3q2us8wgp4yq4jq0guggdp8", "bc1pxcsyvgrxyp8jqmeqtqs8sgpkyq7zq0snaecz5", "bc1pxgsyygrzyp9jq6eq2ss8ggpjyq5zq2gqvjed5", "bc1pxqsrzgpjyqejqdpqx5srvgphyquzqwgdd7yg9"]
    .filter((str) => str.indexOf(prefix) === 0);
  }
}

export default new Api();
