# certip

> 🕵 Lookup IPs behind domain via SSL Cert

## Get Started

```bash
$ npx certip github.com
```

## Usage

### Shell Command

```bash
$ npx certip <domain> --port <port?=443> --timeout <timeout?=10000>

# e.g.
$ npx certip github.com --port 443 --timeout 10000

⠇ IPs lookup...

Host:
github.com

Cert Serial:
17034156255497985825694118641198758684

IPs:
- 167.71.50.75
- 64.226.90.132
- 89.21.66.215
- 169.150.212.67
- 64.226.64.124
- 138.68.186.93
- 185.90.61.141
- 194.195.244.129
- 169.150.210.46
- 185.213.23.133

✔ IPs lookup success
```

### Programmatic API

```typescript
import { getCertIPs } from 'certip'

const { serial, ips } = await getCertIPs('github.com')

console.log(serial, ips)
// 17034156255497985825694118641198758684 [
//   '167.71.50.75',
//   '64.226.90.132',
//   '89.21.66.215',
//   '169.150.212.67',
//   '64.226.64.124',
//   '138.68.186.93',
//   '185.90.61.141',
//   '194.195.244.129',
//   '169.150.210.46',
//   '185.213.23.133'
// ]
```

## References

- https://www.iculture.cc/cybersecurity/pig=3185
- https://mp.weixin.qq.com/s?__biz=MzkzNzI4NDQzMA==&mid=2247489114&idx=1&sn=3ffb7ecaeae7bb5026e60a28e9141c2f

## License

Apache-2.0 &copy; [yelo](https://github.com/imyelo), 2023 - present
