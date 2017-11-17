import { expect } from 'chai'
import 'mocha'
import * as td from 'testdouble'

import { Env } from '@base63/common-js'

import { newLocalCommonServerMiddleware, newCommonServerMiddleware } from './common-server-middleware'


describe('LocalCommonServerMiddleware', () => {
    it('should create a completed request object', () => {
        const serverMiddleware = newLocalCommonServerMiddleware('base63', Env.Local, true);

        const rightNow = new Date(Date.now());
        let passedCheck = false;

        const mockReq = td.object({
            requestTime: null,
            log: null,
            errorLog: null,
            header: () => { }
        });
        const mockRes = td.object(['on']);

        serverMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

        expect(passedCheck).to.be.true;
        expect(mockReq.requestTime).to.be.not.null;
        expect((mockReq as any).requestTime.getTime()).to.be.gte(rightNow.getTime());
        expect((mockReq as any).requestTime.getTime()).to.be.approximately(rightNow.getTime(), 10);
        expect(mockReq.log).to.be.not.null;
        expect(mockReq.errorLog).to.be.not.null;
    });
});


describe('CommonServerMiddleware', () => {
    it('should create a completed request object', () => {
        const serverMiddleware = newCommonServerMiddleware('base63', Env.Prod, 'BAD', 'BAD', 'BAD');

        const rightNow = new Date(Date.now());
        let passedCheck = false;

        const mockReq = td.object({
            requestTime: null,
            log: null,
            errorLog: null,
            header: () => { }
        });
        const mockRes = td.object(['on']);

        serverMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

        expect(passedCheck).to.be.true;
        expect(mockReq.requestTime).to.be.not.null;
        expect((mockReq as any).requestTime.getTime()).to.be.gte(rightNow.getTime());
        expect((mockReq as any).requestTime.getTime()).to.be.approximately(rightNow.getTime(), 10);
        expect(mockReq.log).to.be.not.null;
        expect(mockReq.errorLog).to.be.not.null;
    });
});
