import { until, Key, By, WebDriver } from 'selenium-webdriver';
import getItems, { INameCategory } from './shopifyScraper';

const baseurl = 'https://gymshark.com/';
const categories = [
  'shorts/mens',
  'joggers-sweatpants/mens',
  't-shirts-tops/mens',
  'hoodies-jackets/mens',
  'tanks/mens',
  'stringers/mens',
  'base-layers/mens',
  'underwear/mens',
  'tracksuits/mens',
  'leggings/womens',
  'joggers-sweatpants/womens',
  'shorts/womens',
  'sports-bras/womens',
  'hoodies-jackets/womens',
  't-shirts-tops/womens',
  'crop-tops/womens',
  'vests/womens',
  'underwear/womens',
];

const modalHandler = async (driver: WebDriver) => {
  await driver.wait(
    until.elementLocated(
      By.xpath(`//h3[contains(text(), 'Are you in the right place?')]`)
    ),
    10000
  );

  driver.actions().sendKeys(Key.ESCAPE).perform();
};

const locator = '//h3';

const mappingFunction = (
  rawText: string,
  category: string,
  jsonArray: INameCategory[]
) => {
  jsonArray.push({
    name: rawText,
    category: category,
  });
};

getItems(
  'gymshark',
  baseurl,
  categories,
  modalHandler,
  locator,
  mappingFunction
);
