import * as express from 'express'
import * as HttpStatus from 'http-status-codes'

import { Request } from './request'


export function newCommonApiServerMiddleware(clients: string[]): express.RequestHandler {
    const localClients = clients.slice(0);

    return (req: Request, res: express.Response, next: express.NextFunction) => {
        const origin = req.header('Origin') as string;

        if (localClients.indexOf(origin) == -1) {
            req.log.warn('Origin is not allowed');
            res.status(HttpStatus.BAD_REQUEST);
            res.end();
            return;
        }

        res.type('json');

        // Fire away.
        next();
    };
}
