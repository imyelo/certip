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

## License

Apache-2.0 &copy; [yelo](https://github.com/imyelo), 2023 - present
