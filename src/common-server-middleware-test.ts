import { expect } from 'chai'
import 'mocha'
import * as td from 'testdouble'

import { Env } from '@base63/common-js'

import { newLocalCommonServerMiddleware } from './common-server-middleware'


describe('LocalCommonServerMiddleware', () => {
    it('should create a completed request object', () => {
        const serverMiddleware = newLocalCommonServerMiddleware('base63', Env.Local);

        var passedCheck = false;

        const mockReq = td.object({
            requestTime: null,
            log: null,
            errorLog: null,
            header: () => {}
        });
        const mockRes = td.object(['on']);

        serverMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

        expect(passedCheck).to.be.true;
        expect(mockReq.requestTime).to.be.not.null;
        expect(mockReq.log).to.be.not.null;
        expect(mockReq.errorLog).to.be.not.null;
    });
});
