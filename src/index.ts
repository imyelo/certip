import dns from 'node:dns/promises'
import tls, { type DetailedPeerCertificate } from 'node:tls'
import * as cheerio from 'cheerio'
import { ofetch } from 'ofetch'
import pTimeout from 'p-timeout'

const uniq = (array: string[]) => Array.from(new Set(array))

export const getCertIPs = async (host, port = 443, timeout = 10000) => {
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

  const cert = BigInt(`0x${serialNumber}`).toString()

  const response = await ofetch('https://fofa.info/result', {
    query: {
      qbase64: Buffer.from(`cert="${cert}"`).toString('base64'),
    },
  })

  const $ = cheerio.load(response)

  const ips = uniq(
    $('.hsxa-meta-data-list-main-left a')
      .map((i, el) => $(el).text())
      .get()
      .filter(text => /^\d+\.\d+\.\d+\.\d+$/.test(text))
  )

  return ips
}
