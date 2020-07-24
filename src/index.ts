import * as express from 'express';
import * as compression from 'compression';
import * as http from 'http';
import * as querystring from 'querystring';

import { Request, Response, NextFunction } from 'express';

import api from './api';
import mockGenerator from './mock-generator';

class Server {
  server: http.Server;
  app: any;

  constructor() {
    this.app = express();

    this.app
      .use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      })
      .use(compression());

    this.server = http.createServer(this.app);

    this.setUpHttpApiRoutes();
    this.runMempoolIntervalFunctions();

    this.server.listen(50001, () => {
      console.log(`Server started on port ${50001}`);
    });
  }

  async runMempoolIntervalFunctions() {
    setTimeout(this.runMempoolIntervalFunctions.bind(this), 100000);
  }

  setUpHttpApiRoutes() {
    this.app
      .get('/mempool', (req: Request, res: Response) => res.json(api.getMempoolInfo()))
      .get('/mempool/txids', (req: Request, res: Response) => res.json(api.getRawMempool()))
      .get('/tx/:id', (req: Request, res: Response) => {
        const tx = api.getRawTransaction(req.params.id);
        if (!tx) {
          return res.status(404).end();
        }
        res.json(tx);
      })
      .get('/blocks/tip/height', (req: Request, res: Response) => res.json(api.getBlockHeightTip()))
      .get('/blocks', (req: Request, res: Response) => res.json(api.getBlocks()))
      .get('/block/:hash/txids', (req: Request, res: Response) => res.json(api.getTxIdsForBlock(req.params.hash)))
      .get('/tx/:hash/outspends', (req: Request, res: Response) => res.json([]))
      .get('/block/:hash/txs/:fromHash', (req: Request, res: Response) => res.json(
        api.getTransactionsForBlockFrom(req.params.hash, req.params.fromHash)
      ))
      .get('/block-height/:height', (req: Request, res: Response) => res.json(api.getBlockHash(req.params.height)))
      .get('/block/:hash', (req: Request, res: Response) => res.json(api.getBlock(req.params.hash)))

      .get('/create-block', (req: Request, res: Response) => {
        mockGenerator.createNewBlock.call(mockGenerator); res.json('block created');
      })
      .get('/create-transactions', (req: Request, res: Response) => {
        mockGenerator.addMempoolTransactions.call(mockGenerator,
          typeof req.query.amount === 'string' ? parseInt(req.query.amount, 10) : 0); res.json('created txs');
      })
      .get('/start-auto', (req: Request, res: Response) => { mockGenerator.setAuto(true); res.json('auto started'); })
      .get('/stop-auto', (req: Request, res: Response) => { mockGenerator.setAuto(false); res.json('auto stopped'); })

      .get('/rbf', (req: Request, res: Response) => { res.send(mockGenerator.addRbfTransaction()); })
      .get('/address/:address', (req: Request, res: Response) => res.json(api.getAddress(req.params.address)))
      .get('/address/:address/txs', (req: Request, res: Response) => res.json([]))

      ;
  }
}

const server = new Server();
