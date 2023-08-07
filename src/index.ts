import dns from 'node:dns/promises'
import tls, { type DetailedPeerCertificate } from 'node:tls'
import * as cheerio from 'cheerio'
import { ofetch } from 'ofetch'
import pTimeout from 'p-timeout'

const uniq = (array: string[]) => Array.from(new Set(array))

interface Options {
  port?: number
  timeout?: number
}
interface Result {
  serial: string
  ips: string[]
}
const DEFAULT_OPTIONS: Options = {
  port: 443,
  timeout: 10000,
}

export const getCertIPs = async (host: string, options?: Options): Promise<Result> => {
  const { port, timeout } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }
  const [ip] = await dns.resolve(host)
  const { serialNumber } = await pTimeout(
    new Promise<DetailedPeerCertificate>((resolve, reject) => {
      const socket = tls.connect(
        {
          host: ip,
          port,
          servername: host || undefined,
          rejectUnauthorized: false,
          requestCert: true,
        },
        () => {
          socket.end()
          resolve(socket.getPeerCertificate(true))
        }
      )
      socket.on('error', reject)
    }),
    { milliseconds: timeout }
  )

  const serial = BigInt(`0x${serialNumber}`).toString()

  const response = await ofetch('https://fofa.info/result', {
    query: {
      qbase64: Buffer.from(`cert="${serial}"`).toString('base64'),
    },
  })

  const $ = cheerio.load(response)

  const ips = uniq(
    $('.hsxa-meta-data-list-main-left a')
      .map((i, el) => $(el).text())
      .get()
      .filter(text => /^\d+\.\d+\.\d+\.\d+$/.test(text))
  )

  return { serial, ips }
}
