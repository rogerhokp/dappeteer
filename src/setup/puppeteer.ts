import { DappeteerBrowser } from "../browser";
import { DappeteerLaunchOptions } from "../types";

export async function launchPuppeteer(
  metamaskPath: string,
  userDataDir: string,
  options: DappeteerLaunchOptions
): Promise<DappeteerBrowser> {
  const useExtra = options.usePuppeteerExtra ?? true;
  const launchOpt = {
    ...(options.puppeteerOptions ?? {}),
    headless: options.headless,
    userDataDir,
    args: [
      "--accept-lang=en",
      "--window-size=1920,1080",
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      ...(options.puppeteerOptions?.args || []),
      ...(options.headless ? ["--headless=new"] : []),
    ],
  };

  const pBrowser = useExtra
    ? await (await import("puppeteer-extra")).default.launch(launchOpt)
    : await (await import("puppeteer")).default.launch(launchOpt);

  const { DPuppeteerBrowser } = await import("../puppeteer");
  return new DPuppeteerBrowser(pBrowser, userDataDir, options.metaMaskFlask);
}
