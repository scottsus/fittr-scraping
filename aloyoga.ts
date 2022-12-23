import { until, By, WebDriver } from 'selenium-webdriver';
import getItems, { INameCategory } from './shopifyScraper';

const baseurl = 'https://aloyoga.com/';
const categories = [
  'short-sleeves',
  'mens-long-sleeves',
  'mens-tanks',
  'mens-shorts',
  'mens-pants',
  'mens-sweatpants',
  'mens-sweatshirts-hoodies',
  'mens-jackets',
  'mens-hats',
  'mens-shoes',
  'mens-underwear',
  'bras',
  'womens-tanks',
  'womens-short-sleeves',
  'women-long-sleeves',
  'crop-tops',
  'full-length-tops',
  'womens-leggings',
  '7-8-leggings',
  'womens-shorts',
  'skirts',
  'capris',
  'sweatpants',
  'pants',
  'dresses',
  'onesies',
  'bodysuits',
  'womens-sweatshirts-hoodies',
  'womens-jackets',
  'sherpa-shop',
];

const modalHandler = async (driver: WebDriver) => {
  await driver
    .wait(
      until.elementLocated(
        By.xpath(`//*[@id="we-are-alo"]/a[contains(text(), 'We Are Alo')]`)
      ),
      10000
    )
    .then((webElem) => webElem.click());

  await driver.wait(
    until.elementLocated(
      By.xpath(`//*[@id="ModalBody"]/button[contains(text(), 'Sign me up')]`)
    ),
    10000
  );
};

const locator = '//*[@id="PLPContainer"]/div/div[4]/div[2]/div[1]/div';

const mappingFunction = (
  rawText: string,
  category: string,
  jsonArray: INameCategory[]
) => {
  const parts = rawText.split('\n');
  if (parts[0].includes('NEW'))
    jsonArray.push({
      name: parts[1],
      category: category,
    });
  else
    jsonArray.push({
      name: parts[0],
      category: category,
    });
};

getItems(
  'aloyoga',
  baseurl,
  categories,
  modalHandler,
  locator,
  mappingFunction
);
