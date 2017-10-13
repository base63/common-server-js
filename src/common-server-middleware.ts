import * as express from 'express'
import * as Rollbar from 'rollbar'

import { Env, envToString } from '@base63/common-js'

import { Request } from './request'

const newBunyanLoggerMiddleware = require('express-bunyan-logger');
const Bunyan2Loggly = require('bunyan-loggly');

const LOGGLY_BUFFER_SIZE = 10;
const LOGGLY_TIMEOUT_MS = 1000;


export function newLocalCommonServerMiddleware(name: string, env: Env): express.RequestHandler {
    const bunyanLoggerMiddleware = newBunyanLoggerMiddleware({
        name: name,
        streams: [{
            level: 'info',
            stream: process.stdout
        }],
        base63: {
            serviceName: name,
            env: envToString(env)
        }
    });

    const rollbar = new Rollbar({
        accessToken: 'FAKE_TOKEN_WONT_BE_USED_IN_LOCAL_OR_TEST',
        logLevel: 'warning',
        reportLevel: 'warning',
        captureUncaught: true,
        captureUnhandledRejections: true,
        enabled: false,
        payload: {
            // TODO: fill in the person field!
            serviceName: name,
            environment: envToString(env)
        }
    });

    return function(req: Request, res: express.Response, next: express.NextFunction): any {
        req.requestTime = new Date(Date.now());
        req.errorLog = rollbar;
        bunyanLoggerMiddleware(req, res, next);
    };
}

export function newCommonServerMiddleware(name: string, env: Env, logglyToken: string, logglySubdomain: string, rollbarToken: string): express.RequestHandler {
    const bunyanLoggerMiddleware = newBunyanLoggerMiddleware({
        name: name,
        streams: [{
            level: 'info',
            stream: process.stdout
        }, {
            level: 'info',
            type: 'raw',
            stream: new Bunyan2Loggly({token: logglyToken, subdomain: logglySubdomain}, LOGGLY_BUFFER_SIZE, LOGGLY_TIMEOUT_MS)
        }],
        base63: {
            serviceName: name,
            env: envToString(env)
        }
    });

    const rollbar = new Rollbar({
        accessToken: rollbarToken,
        logLevel: 'warning',
        reportLevel: 'warning',
        captureUncaught: true,
        captureUnhandledRejections: true,
        enabled: true,
        payload: {
            // TODO: fill in the person field!
            serviceName: name,
            environment: envToString(env)
        }
    });

    return function(req: Request, res: express.Response, next: express.NextFunction): any {
        req.requestTime = new Date(Date.now());
        req.errorLog = rollbar;
        bunyanLoggerMiddleware(req, res, next);
    };
}
