import fs from 'fs';
import path from 'path';

/**
 * This function will save a screenshot after each failed test.
 */
export const takeScreenshot = async (testName: string) => {
  const screenshotDir = './screenshots'; // Folder to save screenshots

  // Check if the screenshots directory exists, create it if it doesn't
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // Generate a unique file name with the test name and timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format timestamp to avoid invalid file names
  const fileName = `${testName}-${timestamp}.png`;
  const filePath = path.join(screenshotDir, fileName);

  // Take the screenshot and save it to the specified path
  await browser.saveScreenshot(filePath);

  console.log(`Screenshot saved to: ${filePath}`);
};
