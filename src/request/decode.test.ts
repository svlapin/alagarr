// tslint:disable:no-expression-statement
import decode from './decode'

const testBody = 'foobar test body'
const testBodyBuffer = Buffer.from(testBody, 'utf8')

describe('Decode request', () => {
  test('Base64 encoded body correctly when isBase64Encoded is true', () => {
    const testRequest = {
      body: testBodyBuffer.toString('base64'),
      isBase64Encoded: true,
    }

    const { body } = decode(testRequest)

    expect(body).toBe(testBody)
  })

  test("doesn't modify the request if isBase64Encoded is false", () => {
    const testRequest = {
      body: testBodyBuffer.toString('base64'),
      isBase64Encoded: false,
    }

    const request = decode(testRequest)

    expect(request).toBe(testRequest)
  })

  test("doesn't modify the request if the request body is not a Base64 string", () => {
    const testRequest = {
      body: {},
      isBase64Encoded: false,
    }

    const request = decode(testRequest)

    expect(request).toBe(testRequest)
  })
})
