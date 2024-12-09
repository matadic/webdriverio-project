import { SolflarePage } from "../../pages/SolflarePage";
import { WalletPage } from "../../pages/WalletPage";
import { PortfolioPage } from "../../pages/PortfolioPage";
import logger from "../../logger/logger";  // Import logger

describe("Solflare Wallet Test3", () => {
  const solflarePage = new SolflarePage();
  const walletPage = new WalletPage();
  const portfolioPage = new PortfolioPage();

  it("Add more wallets in profile", async () => {
    // Open the Solflare website
    logger.info('Opening Solflare website...');
    await solflarePage.open();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after navigation

    // Access wallet
    logger.info('Waiting for "Access Wallet" button to be displayed...');
    await solflarePage.accessWalletButton.waitForDisplayed({ timeout: 10000 });
    logger.info('Clicking "Access Wallet" button...');
    await solflarePage.clickAccessWalletButton();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after clicking the button

    // Create a new wallet
    logger.info('Waiting for "I need a new wallet" button to be displayed...');
    await solflarePage.newWalletButton.waitForDisplayed({ timeout: 10000 });
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

    // Enter Solana - 
    logger.info('Clicking "Enter Solana" button...');
    await walletPage.clickEnterSolana();

    // Go to wallet management
    logger.info('Navigating to wallet management...');
    await portfolioPage.clickWalletManagment();
    logger.info(`Navigated to: ${await browser.getUrl()}`); // Log the URL after navigating

    // Check that the main wallet is displayed
    logger.info('Verifying that main wallet is displayed...');
    await portfolioPage.mainWalletDisplayed();

    // Click on the plus button
    logger.info('Clicking on "Plus" button...');
    await portfolioPage.clickPlusButton();

    // Click on "Manage recovery phrase"
    logger.info('Clicking "Manage recovery phrase"...');
    await portfolioPage.clickManageRecoveryPhrase();

    // Check that the first button is disabled and checked
    logger.info('Verifying that the first button is disabled and checked...');
    await portfolioPage.firstButton();

    // Select 3rd and 4th button
    logger.info('Selecting 3rd and 4th buttons...');
    await portfolioPage.selectTwoButton();

    // Click Save button
    logger.info('Clicking "Save" button...');
    await portfolioPage.clickSaveButton();

    // Check the number of visible wallets
    logger.info('Counting the number of visible wallets...');
    await portfolioPage.seeSecndWallet();
    await portfolioPage.seeThridWallet();
   
    
  });
});
