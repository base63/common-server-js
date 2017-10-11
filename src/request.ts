import * as Logger from 'bunyan'
import * as express from 'express'
import * as Rollbar from 'rollbar'


export interface Request extends express.Request {
    requestTime: Date;
    log: Logger;
    errorLog: Rollbar;
    xsrfToken: string | null;
}
