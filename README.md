# 无合约 abi 的情况下与合约交互的演示

## 运行

```shell
npx hardhat test
```

## 交互方法汇总

根据有无合约的 abi，与合约交互的方法有些不同。
<br> 1.合约的 abi 完全公开，那么可以使用 ethers 直接进行交互，无需赘述。
<br> 2.合约的 abi 不公开，但交互的方法是知道的。比如某个 nft 合约，符合 erc721 标准，有 safeTransfer 方法。那么只要从标准 721 合约中提取出相关的函数，重新组织一下 abi 传入 ethers 既可以同 1 一样进行交互。
<br>3.如果合约的 abi 完全不公开，那么需要调用相关的函数，首先要从区块链浏览器上查看相关的交易信息。提取其中的 data 字段。然后获知方法的签名和参数的组织（前 4 个字节，或者在"0x12121212....."中的 12121212 这 8 个数字即是函数签名，后面是参数）。

## 原理简述

与合约的交互一般最后都是以 rpc 的形式进行。查看 eth 的 json rpc 文档，发现对于不改变链上状态的是调用 eth_call 方法，改变链上状态的是 eth_sendTransaction 和 eth_sendRawTransaction 方法。这些方法里面都有一个参数 data，既包含合约里面指定的方法，也包含相关的调用参数。所以只要仔细分析 data 数据，理论上就可以直接调用任意想要的方法。所以并不局限于 ethers.js 这个库。

## 其他问题

1.区块链浏览器上尚无任何交易，如何进行调用？
这时就只能进行反汇编，反编译等逆向工程，做之前需要衡量投入产出是否值得，然后祝君好运。
<br>2.还有其他方法吗？
还真有，可以部署合约，然后调用 call。就是会多花费一些 gas
