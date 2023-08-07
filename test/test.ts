import test from 'ava'
import { getCertIPs } from '../src/index.js'

test('defaults', async t => {
  const { serial, ips } = await getCertIPs('github.com')
  t.true(serial.length === 38)
  t.true(ips.length > 0)
})
