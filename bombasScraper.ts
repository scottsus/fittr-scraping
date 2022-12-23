import { until, Key, By, WebDriver } from 'selenium-webdriver';
import getItems, { INameCategory } from './shopifyScraper';

const baseurl = 'https://bombas.com/';
const categories = [
  'mens-socks',
  'mens-underwear',
  'mens-short-sleeves',
  'mens-long-sleeve-t-shirt',
  'womens-socks',
  'womens-underwear',
  'womens-crew-neck-tanks',
  'womens-short-sleeves',
  'womens-long-sleeve-t-shirts',
];

const modalHandler = async (driver: WebDriver) => {
  await driver.wait(
    until.elementLocated(
      By.xpath(`//div/div/button[contains(text(), 'Continue Shopping')]`)
    ),
    10000
  );

  driver.actions().sendKeys(Key.ESCAPE).perform();
};

const locator = '//a/h4';

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

getItems('bombas', baseurl, categories, modalHandler, locator, mappingFunction);
