/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useEffect, useRef, useState } from 'react'

import { FetchError } from '../lib/errors/FetchError'
import { FetchMethods, fetchWrap } from '../lib/fetch'

export interface FetchState<T> {
  isFetching: boolean
  errors: FetchError[]
  response: T | null
  statusCode: number | null
}

const initialState = {
  isFetching: null,
  errors: null,
  response: null,
  statusCode: null
}

// TODO FIXME: .....ACTUALLY TYPE THIS

/**
 * @param method http method
 * @param url api url to fetch, will use `config.api` settings
 *
 * @returns {[FetchState<T>, (requestPayload: Object) => void, () => void]} api response, run api fetch, clear fetch state
 */
const useFetch = <T>(
  method: FetchMethods,
  url: string
): [FetchState<T>, (requestPayload?: Object) => void, () => void] => {
  const [state, setState] = useState<FetchState<T>>({
    ...(initialState as any)
  })

  const isFetching = useRef<boolean>(false)
  const controller = useRef(null)

  const callFetch = useCallback(
    async (requestPayload: Object = null as any) => {
      if (isFetching.current && controller.current) {
        // prettier-ignore
        (controller.current as any).abort()
      }

      isFetching.current = true
      setState({
        ...(initialState as any),
        isFetching: true
      })

      try {
        controller.current = new AbortController() as any

        const opts = {
          signal: (controller.current as any).signal
        }

        const { response, status } = await fetchWrap(
          method,
          `${process.env.API}:${process.env.API_PORT}`,
          requestPayload,
          opts
        )

        if (response || status) {
          isFetching.current = false

          setState({
            isFetching: false,
            errors: [],
            statusCode: status,

            response
          })
        }
      } catch (err: any) {
        isFetching.current = false
        const errors = Array.isArray(err) ? [...err] : [err]
        const _statusCode = err.name === 'Fetch Error' ? err.statusCode : null

        setState({
          isFetching: false,
          errors,
          statusCode: _statusCode,
          response: err.payload || null
        })
      }
    },
    [method, url]
  )

  const runClear = useCallback(() => setState({ ...(initialState as any) }), [])

  useEffect(
    () => () => {
      if (controller?.current) {
        // prettier-ignore
        (controller?.current as any).abort()
      }
    },
    []
  )

  return [state, callFetch, runClear]
}

export default useFetch
