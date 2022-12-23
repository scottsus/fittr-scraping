import { until, By, Builder, WebDriver } from 'selenium-webdriver';
import fs from 'fs-extra';

export interface INameCategory {
  name: string;
  category: string;
}

const getItems = async (
  name: string,
  baseurl: string,
  categories: string[],
  modalHandler: (driver: WebDriver) => void,
  locator: string,
  mappingFunction: (
    raweText: string,
    category: string,
    jsonArray: INameCategory[]
  ) => void
) => {
  const driver = await new Builder().forBrowser('chrome').build();
  console.log(`Scraping ${baseurl}`);
  driver.get(baseurl);

  await modalHandler(driver);

  const jsonArray: INameCategory[] = [];
  for (const category of categories) {
    const url = baseurl + 'collections/' + category;
    await getItemsFromCategory(
      driver,
      url,
      locator,
      category,
      jsonArray,
      mappingFunction
    );
  }

  const json = JSON.stringify(jsonArray, null, 4);
  const filename = `data/${name}.json`;
  await fs
    .outputFile(filename, json)
    .then(() => console.log(`Successfully written to ${filename}!`));
  await driver.quit();
};

const getItemsFromCategory = async (
  driver: WebDriver,
  url: string,
  locator: string,
  category: string,
  jsonArray: INameCategory[],
  mappingFunction: (
    rawText: string,
    category: string,
    jsonArray: INameCategory[]
  ) => void
) => {
  await driver.get(url);

  const itemPromises = await driver
    .wait(until.elementsLocated(By.xpath(locator)), 10000)
    .then((itemsElement) => {
      const itemPromisesArray: Promise<string>[] = [];
      for (const itemElement of itemsElement)
        itemPromisesArray.push(itemElement.getText());
      return itemPromisesArray;
    });

  const rawTextArray: string[] = [];
  await Promise.all(itemPromises).then((items) => {
    for (const item of items) rawTextArray.push(item);
  });

  rawTextArray.map((rawText) => mappingFunction(rawText, category, jsonArray));
};

export default getItems;
