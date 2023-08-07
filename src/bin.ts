#!/usr/bin/env node

import meow from 'meow'
import ora from 'ora'
import { getCertIPs } from './index.js'

const main = async () => {
  const cli = meow(
    `
    Usage
      $ certip <host>

    Options
      --port, -p     Port Number          (Default: 443)
      --timeout, -t  Timeout Milliseconds (Default: 10000)

    Examples
      $ certip m.sodalife.xyz --port 443 --timeout 10000
      🌈 unicorns 🌈
  `,
    {
      importMeta: import.meta,
      flags: {
        port: {
          type: 'number',
          shortFlag: 'p',
          default: 443,
        },
        timeout: {
          type: 'number',
          shortFlag: 't',
          default: 10000,
        },
      },
    }
  )

  const spinner = ora('IPs lookup...').start()
  try {
    const host = cli.input.at(0)
    const { serial, ips } = await getCertIPs(host, cli.flags)

    process.stdout.write('\n')
    process.stdout.write(`\nHost:\n${host}\n`)
    process.stdout.write(`\nCert Serial:\n${serial}\n`)

    process.stdout.write(`\nIPs:\n`)
    process.stdout.write(ips.map(ip => `- ${ip}\n`).join(''))
    process.stdout.write('\n')

    spinner.succeed('IPs lookup success')
  } catch (error) {
    spinner.fail(error.message)
  }
}

main()
