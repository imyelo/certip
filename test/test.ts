import test from 'ava'
import { getCertIPs } from '../src/index.js'

test('defaults', async t => {
  const ips = await getCertIPs('github.com')
  t.true(ips.length > 0)
})
