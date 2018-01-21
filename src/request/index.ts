import * as AWSLambda from 'aws-lambda' // tslint:disable-line:no-implicit-dependencies
import { InterfaceRequest } from '../types'
import applyMiddleware from '../utils/applyMiddleware'
import cookies from './cookies'
import decode from './decode'
import hostname from './hostname'
import jsonBody from './jsonBody'
import normalize from './normalize'
import timestamp from './timestamp'
import urlEncodedBody from './urlEncodedBody'

/*
parse a Lambda APIG event into a request object by
running the request event through list of middleware
*/
export default (
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context,
  options = {}
): InterfaceRequest =>
  applyMiddleware(
    [timestamp, normalize, decode, cookies, jsonBody, urlEncodedBody, hostname],
    {
      ...event,
      context,
    },
    options
  )
