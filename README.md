# Common [![Build Status](https://travis-ci.org/base63/common-server-js.svg?branch=master)](https://travis-ci.org/base63/common-server-js) [![Coverage](https://codecov.io/gh/base63/common-server-js/branch/master/graph/badge.svg)](https://codecov.io/gh/base63/common-server-js)

A bunch of basic type definitions, utility functions and [connect middleware](https://github.com/senchalabs/connect), meant to be used across `base63` JavaScript/TypeScript server-side code. This package crucially depends on [`express`](https://expressjs.com/), making it unsuitable for client contexts.

The principal goal is to define the common structure of the servers running in `base63`, on top of whatever express and Node provide. Things like approaches to logging and error reporting, expected headers on requests and responses etc.
