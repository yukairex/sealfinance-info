$(function () {
  consoleInit();
  start(main);
});

async function main() {
  const App = await init_ethers();
  const SEAL = new ethers.Contract(SEAL_ADDR, ERC20_ABI, App.provider);
  const sealTotalSupply = (await SEAL.totalSupply()) / 1e18;
  const WBTC = new ethers.Contract(WBTC_ADDR.token, ERC20_ABI, App.provider);
  const WETH = new ethers.Contract(WETH_ADDR.token, ERC20_ABI, App.provider);
  const MTA = new ethers.Contract(MTA_ADDR.token, ERC20_ABI, App.provider);
  const HAKKA = new ethers.Contract(HAKKA_ADDR.token, ERC20_ABI, App.provider);
  const LINK = new ethers.Contract(LINK_ADDR.token, ERC20_ABI, App.provider);
  const PICKLE = new ethers.Contract(
    PICKLE_ADDR.token,
    ERC20_ABI,
    App.provider
  );
  const SNX = new ethers.Contract(SNX_ADDR.token, ERC20_ABI, App.provider);
  const UNI = new ethers.Contract(UNI_ADDR.token, ERC20_ABI, App.provider);
  const USDT = new ethers.Contract(USDT_ADDR.token, ERC20_ABI, App.provider);
  const YFI = new ethers.Contract(YFI_ADDR.token, ERC20_ABI, App.provider);
  const KPR = new ethers.Contract(KPR_ADDR.token, ERC20_ABI, App.provider);

  const wbtcStaked = (await WBTC.balanceOf(WBTC_ADDR.pair)) / 1e8;
  const wethStaked = (await WETH.balanceOf(WETH_ADDR.pair)) / 1e18;
  const mtaStaked = (await MTA.balanceOf(MTA_ADDR.pair)) / 1e18;
  const hakkaStaked = (await HAKKA.balanceOf(HAKKA_ADDR.pair)) / 1e18;
  const linkStaked = (await LINK.balanceOf(LINK_ADDR.pair)) / 1e18;
  const pickleStaked = (await PICKLE.balanceOf(PICKLE_ADDR.pair)) / 1e18;
  const snxStaked = (await SNX.balanceOf(SNX_ADDR.pair)) / 1e18;
  const uniStaked = (await UNI.balanceOf(UNI_ADDR.pair)) / 1e18;
  const usdtStaked = (await USDT.balanceOf(USDT_ADDR.pair)) / 1e6;
  const yfiStaked = (await YFI.balanceOf(YFI_ADDR.pair)) / 1e18;
  const kprStaked = (await KPR.balanceOf(KPR_ADDR.pair)) / 1e18;

  const sealInWBTCPool = (await SEAL.balanceOf(WBTC_ADDR.pair)) / 1e18;
  const sealInETHPool = (await SEAL.balanceOf(WETH_ADDR.pair)) / 1e18;
  const sealInMTAPool = (await SEAL.balanceOf(MTA_ADDR.pair)) / 1e18;
  const sealInHAKKAPool = (await SEAL.balanceOf(HAKKA_ADDR.pair)) / 1e18;
  const sealInLINKPool = (await SEAL.balanceOf(LINK_ADDR.pair)) / 1e18;
  const sealInPICKLEPool = (await SEAL.balanceOf(PICKLE_ADDR.pair)) / 1e18;
  const sealInSNXPool = (await SEAL.balanceOf(SNX_ADDR.pair)) / 1e18;
  const sealInUSDTPool = (await SEAL.balanceOf(USDT_ADDR.pair)) / 1e18;
  const sealInYFIPool = (await SEAL.balanceOf(YFI_ADDR.pair)) / 1e18;
  const sealInUNIPool = (await SEAL.balanceOf(UNI_ADDR.pair)) / 1e18;
  const sealInKPRPool = (await SEAL.balanceOf(KPR_ADDR.pair)) / 1e18;
  const totalInStake =
    sealInWBTCPool +
    sealInMTAPool +
    sealInHAKKAPool +
    sealInLINKPool +
    sealInPICKLEPool +
    sealInSNXPool +
    sealInUSDTPool +
    sealInYFIPool +
    sealInUNIPool +
    sealInKPRPool;

  const stakePercent = (totalInStake / sealTotalSupply) * 100;
  const sealInEthPercent = (sealInETHPool / sealTotalSupply) * 100;
  const floatSealPercent = 100 - stakePercent - sealInEthPercent;

  const prices = await lookUpPrices([
    'ethereum',
    'meta',
    'wrapped-bitcoin',
    'hakka-finance',
    'chainlink',
    'yearn-finance',
    'havven',
    'uniswap',
    'tether',
    'pickle-finance',
    'seal-finance',
    'keep3rv1',
  ]);
  console.log(prices);

  _print_bold(`SEAL price: ${toDollar(prices['seal-finance'].usd)}`);
  _print_bold(`SEAL TOTAL SUPPLY = ${sealTotalSupply}`);
  _print(`SEAL staked [%]= ${stakePercent}[%]`);
  _print(`SEAL in ETH-SEAL pool [%] = ${sealInEthPercent}[%]`);
  _print(`SEAL in the wild [%] = ${floatSealPercent}[%]`);
  _print(`\n\n`);
  _print(
    `WBTC pool locked = ${toDollar(
      wbtcStaked * prices['wrapped-bitcoin'].usd * 2
    )}\n`
  );
  _print(
    `WETH pool locked = ${toDollar(wethStaked * prices['ethereum'].usd * 2)}\n`
  );
  _print(`MTA locked  = ${toDollar(mtaStaked * prices['meta'].usd * 2)}\n`);
  _print(
    `HAKKA locked = ${toDollar(
      hakkaStaked * prices['hakka-finance'].usd * 2
    )}\n`
  );
  _print(
    `YFI locked  = ${toDollar(yfiStaked * prices['yearn-finance'].usd * 2)}\n`
  );
  _print(
    `LINK locked = ${toDollar(linkStaked * prices['chainlink'].usd * 2)}\n`
  );
  _print(`SNX locked  = ${toDollar(snxStaked * prices['havven'].usd * 2)}\n`);
  _print(
    `PICKLE locked = ${toDollar(
      pickleStaked * prices['pickle-finance'].usd * 2
    )}\n`
  );
  _print(`UNI locked = ${toDollar(uniStaked * prices['uniswap'].usd * 2)}\n`);
  _print(`USDT locked = ${toDollar(usdtStaked * prices['tether'].usd * 2)}\n`);
  _print(`KPR locked = ${toDollar(kprStaked * prices['keep3rv1'].usd * 2)}\n`);
  _print(
    `TOTAL       = ${toDollar(
      wbtcStaked * prices['wrapped-bitcoin'].usd +
        snxStaked * prices['havven'].usd +
        linkStaked * prices['chainlink'].usd +
        yfiStaked * prices['yearn-finance'].usd +
        hakkaStaked * prices['hakka-finance'].usd +
        mtaStaked * prices['meta'].usd +
        wethStaked * prices['ethereum'].usd +
        usdtStaked * prices['tether'].usd +
        pickleStaked * prices['pickle-finance'].usd +
        kprStaked * prices['keep3rv1'].usd
    )}\n`
  );
}
