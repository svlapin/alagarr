# Alagarr

Alagarr is an **A**WS **L**ambda/**A**PI **Ga**teway **R**equest-**R**esponse helper utility. It
abstracts the Lambda-handler event-context-callback function signature so that you can spend less
time writing boring Lambda/API Gateway-related boilerplate.

Alagarr has zero-dependencies and is functional and middleware is immutable.

[![CircleCI](https://img.shields.io/circleci/project/github/adieuadieu/alagarr/master.svg?style=flat-square)](https://circleci.com/gh/adieuadieu/alagarr)
[![Coveralls](https://img.shields.io/coveralls/adieuadieu/alagarr/master.svg?style=flat-square)](https://coveralls.io/github/adieuadieu/alagarr)
[![Codacy grade](https://img.shields.io/codacy/grade/cd743cc370104d49a508cc4b7689c1aa.svg?style=flat-square)](https://www.codacy.com/app/adieuadieu/alagarr)
[![David](https://img.shields.io/david/adieuadieu/alagarr.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/adieuadieu/alagarr.svg?style=flat-square)]()

Turns this:

```js
export default handler(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ foo: 'bar' }),
    headers: {
      'content-type': 'application/json',
    },
  })
}
```

Into this:

```js
import handler from 'alagarr'

export default handler((request, response) => {
  response.json({ foo: 'bar' }) // automatically gzipped
})
```

Typescript:

```typescript
FIXTHIS
APIGatewayEvent
APIGatewayEventRequestContext
//github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-lambda/index.d.ts

import handler from 'alagarr'
import { Request, Response } from 'alagarr/types'

export default handler(async (request: Request, response: Response) => {
  response.html('<html/>')
})
```

## Contents

1. [Features](#features)
1. [API](#api)
1. [Configuration](#configuration)
1. [Custom Middleware](#custom-middleware)
   1. [Request Middleware](#request-middleware)
   1. [Response Middleware](#response-middleware)
1. [Error Handling](#error-handling)
1. [Logging](#logging)

## Features

* catches thrown errors and handles callback(error, {}) correctly
* catches errors and responds with a pretty error.
* request logging
* request cookie parsing
* normalize request headers
* parse json request body
* response csp headers
* response gzipping (deprecate)
* easily respond with images/binary data (some API Gateway setup required..)
* throwable errors like throw ClientError, ServerError which get caught and pretty
  response.json()'d
* support for custom request and response middleware

## API

**Request methods**

* [`something(url: string)`](#api-something)

**Response methods**

* [`respondTo(formats: map)`](#api-response-respondTo)
* [`json(json: object)`](#api-response-json)
* [`html(html: string)`](#api-response-html)
* [`svg(image: buffer | stream | string)`](#api-response-svg)
* [`png(image: buffer | stream | base64-encoded-string)`](#api-response-png)
* [`jpeg(image: buffer | stream | base64-encoded-string)`](#api-response-jpeg)
* [`raw(error, result)`](#api-response-raw)

---

<a name="api-response-respondTo" />

### respondTo(formats: object): void

Respond according to request's Accept header with formats provided in `formats` map. Kind of like a Ruby on Rails `respond_to do |format|` [block](http://api.rubyonrails.org/classes/ActionController/MimeResponds.html#method-i-respond_to).

```js
response.respondTo({
  json: {},
  html: '<html />',
})
```

---

<a name="api-response-raw" />

### raw(error?: Error | null, result?: object | boolean | number | string): void

Exposes the underlying `callback` method.

```js
response.raw(null, { something: 'custom' })
```

# Similar Projects

* [Middy](https://github.com/middyjs/middy)
* [corgi](https://github.com/balmbees/corgi)
* [node-lambda-req](https://github.com/doomhz/node-lambda-req)
* [apigateway-utils](https://github.com/silvermine/apigateway-utils)
* [serverless-utils](https://github.com/silvermine/serverless-utils)
* [@graphcool/lambda-helpers](https://www.npmjs.com/package/lambda-helpers)
