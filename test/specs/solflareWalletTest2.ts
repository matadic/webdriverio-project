import { SolflarePage } from "../../pages/SolflarePage";
import { WalletPage } from "../../pages/WalletPage";
import logger from "../../logger/logger";  // Import logger

describe("Solflare Wallet Test2", () => {
  const solflarePage = new SolflarePage();
  const walletPage = new WalletPage();

  it("should create wallet and visit twitter page in new tab", async () => {
    // Open the Solflare website
    logger.info('Opening Solflare website...');
    await solflarePage.open();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after navigation

    // Access wallet
    logger.info('Waiting for "Access Wallet" button to be displayed...');
    await solflarePage.accessWalletButton.waitForDisplayed({ timeout: 10000 }); // Wait for button to load
    logger.info('Clicking "Access Wallet" button...');
    await solflarePage.clickAccessWalletButton();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after clicking the button

    // Create a new wallet
    logger.info('Waiting for "I need a new wallet" button to be displayed...');
    await solflarePage.newWalletButton.waitForDisplayed({ timeout: 10000 }); // Wait for the "I need a new wallet" button
    logger.info('Clicking "I need a new wallet" button...');
    await solflarePage.clickNewWalletButton();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after clicking the button

    // Get text that is shown on web
    logger.info('Extracting recovery phrase text from paragraphs...');
    const shownRecoveryPhrase = await solflarePage.getTextFromParagraphs();
    logger.info(`Extracted text from page: ${shownRecoveryPhrase.join(' ')}`); // Log the extracted text (joined as a string)

    // Get array into string with space separator
    const stringRecoveryPhrase = shownRecoveryPhrase.join(" ");
    logger.info(`Formatted recovery phrase: ${stringRecoveryPhrase}`); // Log the formatted recovery phrase

    // Continue - I saved my recovery phrase
    logger.info('Clicking "Continue" after saving the recovery phrase...');
    await solflarePage.clickContinueButton();


    // Enter recovery phrase
    logger.info('Entering recovery phrase...');
    await walletPage.enterRecoveryPhrase(shownRecoveryPhrase);

    // Continue - I entered recovery phrase
    logger.info('Clicking "Continue" after entering recovery phrase...');
    await solflarePage.clickContinueButton();
    

    // Enter Password and repeat
    const randomPassword = walletPage.generateRandomPassword();
    logger.info('Generating random password...');
    await walletPage.enterPassword(randomPassword);
    await walletPage.confirmPassword(randomPassword);

    // Check that password is correct
    logger.info('Verifying that the entered password matches the expected password...');
    const enteredPassword = await walletPage.passwordInput[0].getValue();
    const confirmedPassword = await walletPage.passwordInput[1].getValue();
    expect(enteredPassword).toBe(randomPassword);
    expect(confirmedPassword).toBe(randomPassword);

    // Continue - I entered password
    logger.info('Clicking "Continue" after entering the password...');
    await solflarePage.clickContinueButton();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after continuing

    // Call the verification function for Twitter
    const expectedTwitterUrl = 'x.com/solflare_wallet';
    logger.info('Verifying that Twitter profile opens in a new tab...');
    await walletPage.verifyTwitterOpensInNewTab(expectedTwitterUrl);

    // Enter Solana - since we want the test to fail, we commented out this click
    // logger.info('Clicking "Enter Solana" button...');
    // await walletPage.clickEnterSolana();

    // Get Portfolio Value
    logger.info('Waiting for portfolio value to be displayed...');
    await walletPage.portfolioValue.waitForDisplayed();
    logger.info('Getting portfolio value...');
    const valuePortfolio = await walletPage.getPortfolioValue();
    logger.info(`Portfolio value: ${valuePortfolio}`);

    // It should always be $0.00 since it's a new wallet
    expect(valuePortfolio).toBe("$0.00");
  });
});
