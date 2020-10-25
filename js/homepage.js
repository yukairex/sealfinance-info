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
  ]);
  console.log(prices);

  _print_bold(`SEAL price: ${toDollar(prices['seal-finance'].usd)}`);
  _print(`SEAL TOTAL SUPPLY = ${sealTotalSupply}`);
  _print(`\n\n`);
  _print(
    `WBTC locked = ${toDollar(wbtcStaked * prices['wrapped-bitcoin'].usd)}\n`
  );
  _print(`WETH locked = ${toDollar(wethStaked * prices['ethereum'].usd)}\n`);
  _print(`MTA locked  = ${toDollar(mtaStaked * prices['meta'].usd)}\n`);
  _print(
    `HAKKA locked = ${toDollar(hakkaStaked * prices['hakka-finance'].usd)}\n`
  );
  _print(
    `YFI locked  = ${toDollar(yfiStaked * prices['yearn-finance'].usd)}\n`
  );
  _print(`LINK locked = ${toDollar(linkStaked * prices['chainlink'].usd)}\n`);
  _print(`SNX locked  = ${toDollar(snxStaked * prices['havven'].usd)}\n`);
  _print(
    `PICKLE locked = ${toDollar(pickleStaked * prices['pickle-finance'].usd)}\n`
  );
  _print(`UNI locked = ${toDollar(uniStaked * prices['uniswap'].usd)}\n`);
  _print(`USDT locked = ${toDollar(usdtStaked * prices['tether'].usd)}\n`);
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
        pickleStaked * prices['pickle-finance'].usd
    )}\n`
  );
}
