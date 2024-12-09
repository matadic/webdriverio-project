import { SolflarePage } from "../../pages/SolflarePage";
import logger from "../../logger/logger"; // Import logger

describe("Solflare Wallet Test", () => {
  const solflarePage = new SolflarePage();

  it("should copy the recovery phrase correctly", async () => {
    // Open the Solflare website
    logger.info("Opening Solflare website...");
    await solflarePage.open();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after navigation

    // Access wallet
    logger.info('Waiting for "Access Wallet" button to be displayed...');
    await solflarePage.accessWalletButton.waitForDisplayed({ timeout: 10000 });
    logger.info('Clicking "Access Wallet" button...');
    await solflarePage.clickAccessWalletButton();

    // Create a new wallet
    logger.info('Waiting for "I need a new wallet" button to be displayed...');
    await solflarePage.newWalletButton.waitForDisplayed({ timeout: 10000 });
    logger.info('Clicking "I need a new wallet" button...');
    await solflarePage.clickNewWalletButton();

    // Copy the recovery phrase
    logger.info('Waiting for "Copy" button to be displayed...');
    await solflarePage.copyButton.waitForDisplayed({ timeout: 10000 });
    logger.info('Clicking "Copy" button...');
    const copiedText = await solflarePage.clickCopyButton(); // This line should return the copied text
    logger.info(`Copied text: ${copiedText}`); // Log the copied text

    // Get text that is shown on the web
    logger.info("Extracting recovery phrase text from paragraphs...");
    const shownRecoveryPhrase = await solflarePage.getTextFromParagraphs();
    logger.info(`Extracted text from page: ${shownRecoveryPhrase.join(" ")}`); // Log the extracted text (joined as a string)

    // Get array into string with space separator
    const stringRecoveryPhrase = shownRecoveryPhrase.join(" ");
    logger.info(`Formatted recovery phrase: ${stringRecoveryPhrase}`); // Log the string version of the recovery phrase

    // Assert that copied text and shown text on the web are matching
    logger.info("Asserting that copied text matches the extracted text...");
    expect(copiedText).toBe(stringRecoveryPhrase);
    logger.info("Test passed: Copied text matches the extracted text.");
  });
});
