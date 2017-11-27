import { expect } from 'chai'
import * as HttpStatus from 'http-status-codes'
import 'mocha'
import * as td from 'testdouble'

import { newCommonApiServerMiddleware } from './common-api-server-middleware'


describe('CommonApiServerMiddleware', () => {
    it('should allow request with proper origin and set json type', (done) => {
        const checkOriginMiddleware = newCommonApiServerMiddleware(['base63.com']);

        const mockReq = td.object(['header']);
        const mockRes = td.object(['type']);

        td.when(mockReq.header('Origin')).thenReturn('base63.com');

        checkOriginMiddleware(mockReq as any, mockRes as any, () => {
            td.verify(mockRes.type('json'));
            done();
        });
    });

    it('should allow request with proper origin out of multiple ones', (done) => {
        const checkOriginMiddleware = newCommonApiServerMiddleware(['base63.com', 'base63.io']);

        const mockReq = td.object(['header']);
        const mockRes = td.object('Response');

        td.when(mockReq.header('Origin')).thenReturn('base63.com');

        checkOriginMiddleware(mockReq as any, mockRes as any, () => {
            done();
        });
    });

    it('should block a request with a disallowed origin', () => {
        const checkOriginMiddleware = newCommonApiServerMiddleware(['base63.com']);
        let passedCheck = false;

        /* codecov skip start */
        const mockReq = td.object({
            header: (_name: string) => {},
            log: {warn: (_msg: string) => {}}
        });
        /* codecov skip end */
        const mockRes = td.object(['status', 'end']);

        td.when(mockReq.header('Origin')).thenReturn('base63.io');

        checkOriginMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true; });

        expect(passedCheck).to.be.false;
        td.verify(mockReq.log.warn('Origin is not allowed'));
        td.verify(mockRes.status(HttpStatus.BAD_REQUEST));
        td.verify(mockRes.end());
    });

    it('should copy the list of clients', () => {
        const allowedOrigins = ['base63.com'];
        const checkOriginMiddleware = newCommonApiServerMiddleware(allowedOrigins);

        const mockReq = td.object(['header']);
        const mockRes = td.object('Response');

        td.when(mockReq.header('Origin')).thenReturn('base63.com');

        {
            var passedCheck = false;

            checkOriginMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

            expect(passedCheck).to.be.true;
        }

        allowedOrigins[0] = 'base63.io';

        {
            var passedCheck = false;

            checkOriginMiddleware(mockReq as any, mockRes as any, () => { passedCheck = true });

            expect(passedCheck).to.be.true;
        }
    });
});
