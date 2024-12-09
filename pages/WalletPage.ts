export class WalletPage {
  // Define elements using getter methods
  get recoveryPhraseInput() {
    return $$(".css-ndai2c"); // Input for entering recovery phrase
  }

  get passwordInput() {
    return $$(".css-6i5tlx"); // Input for entering the password
  }

  get twitterFollowButton() {
    return $(".css-wdl0qx > button:first-child"); // Button to follow on Twitter
  }

  get goToPortfolio() {
    return $(".css-wdl0qx > button:nth-child(2)"); // Element that signifies the portfolio has loaded
  }

  get portfolioValue() {
    return $(".css-eo255b");
  }

  // Generate password with 4 letter and 4 numbers random
  generateRandomPassword(): string {
    const letters = Math.random().toString(36).substring(2, 6);
    const numbers = Math.floor(1000 + Math.random() * 9000).toString();
    return letters + numbers; // Combine letters and numbers
  }

  // Define actions

  // Enter the recovery phrase
  async enterRecoveryPhrase(textArray: string[]): Promise<void> {
    for (let i = 0; i < textArray.length; i++) {
      await this.recoveryPhraseInput[i].setValue(textArray[i]);
    }
  }

  // Enter the password
  async enterPassword(password: string) {
    await this.passwordInput[0].setValue(password);
  }

  // Confirm the password
  async confirmPassword(password: string) {
    await this.passwordInput[1].setValue(password);
  }

  // Click on the "Follow us on Twitter" button
  async clickFollowUsOnTwitter() {
    await this.twitterFollowButton.click();
  }

  async verifyTwitterOpensInNewTab(expectedUrl: string) {
    // Get the current window handles before clicking the button
    const originalHandles = await browser.getWindowHandles();

    this.clickFollowUsOnTwitter();

    // Wait for the new tab to open
    await browser.waitUntil(
      async () =>
        (await browser.getWindowHandles()).length > originalHandles.length,
      {
        timeout: 10000,
        timeoutMsg: "No new tab opened after clicking the Twitter button",
      }
    );

    // Get the new tab handle
    const newHandles = await browser.getWindowHandles();
    const newTabHandle = newHandles.find(
      (handle) => !originalHandles.includes(handle)
    );
    if (!newTabHandle) throw new Error("New tab handle not found");

    // Switch to the new tab and verify the URL
    await browser.switchToWindow(newTabHandle);
    const newTabUrl = await browser.getUrl();
    if (!newTabUrl.includes(expectedUrl)) {
      throw new Error(
        `Expected URL to contain "${expectedUrl}", but got "${newTabUrl}"`
      );
    }

    console.log("Twitter profile successfully opened in new tab:", newTabUrl);

    // Close the new tab and switch back to the original tab
    await browser.closeWindow();
    await browser.switchToWindow(originalHandles[0]);
  }

  // Enter solana
  async clickEnterSolana() {
    await this.goToPortfolio.click();
  }
  // Get current value - this is how we check that we are on portfolio page
  async getPortfolioValue() {
    const valuePortfolio = await this.portfolioValue.getText();
    return valuePortfolio;
  }
}
