/* eslint-disable no-use-before-define */
// import config from './../config'

import { FetchError } from './errors/FetchError'

export type FetchMethods = 'GET' | 'POST' | 'PUT' | 'DEL'

// TODO - Improve methods, add better type checking, performance improvements

/**
 * Performs a JSON stringify on a body for the fetch request
 * @param body - The fetch body to stringify
 * @returns The stringified body
 * Private Function
 */
const bodyToString = (body: string | object): string =>
  typeof body === 'string' ? body : JSON.stringify(body)

/**
 * Generic Fetch Wrapper
 */
const fetchWrap = (
  method: FetchMethods,
  endpoint: string,
  body: object | string,
  opts: any = {}
) => {
  switch (method) {
    case 'GET':
      return fetchGet(endpoint, body, '', opts)
    case 'POST':
      return fetchPost(endpoint, body, '', opts)
    case 'PUT':
      return fetchPut(endpoint, body, '', opts)
    case 'DEL':
      return fetchDelete(endpoint, body, '', opts)
  }
}

/**
 * GET Request
 */
const fetchGet = (
  endpoint: string,
  body?: object | string,
  contentType?: string,
  opts: any = {},
  ip?: string
) => {
  opts.method = 'GET'

  const tmpBody = typeof body === 'string' ? JSON.parse(body) : body

  const paramArr = !tmpBody
    ? []
    : Object.keys(tmpBody).map((key) => `${key}=${tmpBody[key]}`)

  const bodyAsUrlParams = paramArr.length > 0 ? `?${paramArr.join('&')}` : ''

  return fetchWithErrors(endpoint + bodyAsUrlParams, opts, contentType, ip)
}

/**
 * POST Request
 */
const fetchPost = (
  endpoint: string,
  body: string | object,
  token?: string,
  contentType?: string,
  opts: any = {},
  ip?: string
) => {
  opts.method = 'POST'
  opts.body = bodyToString(body)

  return fetchWithErrors(endpoint, opts, token, contentType, ip)
}

/**
 * DELETE Request
 */
const fetchDelete = (
  endpoint: string,
  body: string | object,
  token?: string,
  contentType?: string,
  opts: any = {},
  ip?: string
) => {
  opts.method = 'DELETE'
  opts.body = bodyToString(body)

  return fetchWithErrors(endpoint, opts, token, contentType, ip)
}

/**
 * PUT Request
 */
const fetchPut = (
  endpoint: string,
  body: string | object,
  token?: string,
  contentType?: string,
  opts: any = {},
  ip?: string
) => {
  opts.method = 'PUT'
  opts.body = bodyToString(body)

  return fetchWithErrors(endpoint, opts, token, contentType, ip)
}

/**
 * Perform an fetch request, throwing on errors
 */
const fetchWithErrors = (
  endpoint: string,
  opts?: any,
  token?: string,
  contentType?: string,
  ip?: string
): any => {
  const headers: { [key: string]: string } = {}

  headers['Content-Type'] = contentType || 'application/json'

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (ip) {
    headers['X-Forwarded-For'] = ip
  }

  // Add Cohesion Tracking
  if ((window as any)._Cohesion) {
    const _c = (window as any)._Cohesion

    if (_c.anonymousId) {
      headers['X-Cohesion-AnonymousID'] = _c.anonymousId
    }

    if (_c.sessionId) {
      headers['X-Cohesion-SessionID'] = _c.sessionId
    }

    if (_c.instanceId) {
      headers['X-Cohesion-InstanceID'] = _c.instanceId
    }

    if (_c.tenantId) {
      headers['X-Cohesion-TenantID'] = _c.tenantId
    }
  }

  const fetchOpts: any = {
    ...opts,
    credentials: 'include',
    headers: new Headers({ ...headers })
  }

  return fetch(endpoint, fetchOpts)
    .then((res) => {
      const contentType = res.headers.get('Content-Type')

      const cType =
        contentType && contentType.includes('json')
          ? 'json'
          : contentType && contentType.includes('text')
          ? 'text'
          : 'unk'

      const statusCode: number = res.status

      if (!res.ok) {
        if (statusCode === 401) {
          throw new FetchError('Logged Out', statusCode)
        } else if (cType !== 'unk') {
          if (cType === 'json') {
            return res.json().then((data) => {
              const _err =
                data.error ||
                'There was an error retrieving information please check your search and try again'

              const _errText = _err.includes('workhorse')
                ? 'There was an error retrieving information please check your search and try again'
                : _err

              throw new FetchError(_errText, statusCode, data)
            })
          }

          if (cType === 'text') {
            return res.text().then((data) => {
              throw new FetchError(data, statusCode)
            })
          }
        }

        // If we haven't already thrown, throw status code
        throw new FetchError('Unknown Error', statusCode)
      }

      return new Promise((resolve) => {
        if (cType === 'json') {
          res
            .json()
            .then((result) => resolve({ response: result, status: res.status }))
        } else if (cType === 'text') {
          res
            .text()
            .then((result) => resolve({ response: result, status: res.status }))
        } else {
          resolve({ response: res, status: res.status })
        }
      })
    })
    .catch((err) => {
      if (err.message.toLowerCase() === 'failed to fetch') {
        throw new FetchError('Failed')
      } else if (err.message.includes('Logged Out')) {
        debugger
      } else {
        throw err
      }
    })
}

export {
  fetchWithErrors,
  fetchWrap,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete
}
