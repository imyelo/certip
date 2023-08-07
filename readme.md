# certip

> 🕵 Lookup IPs behind domain via SSL Cert

## Get Started

```bash
npx certip github.com
```

## Usage

### Shell Command

```bash
npx certip <domain> --port <port?=443> --timeout <timeout?=10000>

# e.g.
npx certip github.com --port 443 --timeout 10000
```

### Programmatic API

```typescript
import { getCertIPs } from 'certip'

const { serial, ips } = await getCertIPs('github.com')

console.log(serial, ips)
```

## References

- https://www.iculture.cc/cybersecurity/pig=3185
- https://mp.weixin.qq.com/s?__biz=MzkzNzI4NDQzMA==&mid=2247489114&idx=1&sn=3ffb7ecaeae7bb5026e60a28e9141c2f

## License

Apache-2.0 &copy; [yelo](https://github.com/imyelo), 2023 - present
