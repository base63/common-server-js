import { use, expect } from 'chai'
import 'mocha'
import * as td from 'testdouble'

import { newCheckOriginMiddleware } from './check-origin-middleware'

const testdoubleChai = require('testdouble-chai');


use(testdoubleChai(td));


describe('CheckOriginMiddleware', () => {
    it('should allow request with proper origin', () => {
        const checkOriginMiddleware = newCheckOriginMiddleware(['base63.com']);
        var passedCheck = false;

        const mockReq = td.object(['header']);
        const mockRes = td.object('Response');

        td.when(mockReq.header('Origin')).thenReturn('base63.com');

        checkOriginMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

        expect(passedCheck).to.be.true;
    });
});
