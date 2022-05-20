/**
 * Custom Error for handling problems with Fetch API Calls
 */
export class FetchError extends Error {
  statusCode: number
  payload: object

  constructor(message?: string, statusCode?: number, payload?: object) {
    super(message)
    this.name = 'Fetch Error'
    this.statusCode = Number(statusCode) as number
    this.payload = payload as object
  }
}
