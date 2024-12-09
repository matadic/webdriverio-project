export class SolflarePage {
  // Define elements
  get accessWalletButton() {
    return $(".btn.btn--dark.btn--mobile-full");
  }
  get newWalletButton() {
    return $('[data-id="i_need_a_wallet_button"]');
  }
  get copyButton() {
    return $(".css-1dqn28w > button:first-child");
  }
  get recoveryPhraseText() {
    return $$(".css-1362g6f");
  }
  get continueButton(){
    return $(".css-j38ge0")
  }

  // Open Solflare homepage
  async open() {
    await browser.url("https://solflare.com/");
  }

  // Click the "Access Wallet" button
  async clickAccessWalletButton() {
    await this.accessWalletButton.waitForClickable({ timeout: 5000 });
    await this.accessWalletButton.click();
  }

  // Click the "I Need a Wallet" button
  async clickNewWalletButton() {
    await this.newWalletButton.waitForClickable({ timeout: 5000 });
    await this.newWalletButton.click();
  }

  // Click the "Copy" button
  async clickCopyButton(): Promise<string> {
    await this.copyButton.waitForDisplayed({ timeout: 5000 });
    await this.copyButton.click();
    // This is for text
    const clipboardContent = await browser.execute(async () => {
      if (navigator.clipboard) {
        return await navigator.clipboard.readText();
      } else {
        throw new Error("Clipboard is empty");
      }
    });

    // Return the clipboard content
    return clipboardContent;
  }

  // Read text from Paragraphs
  async getTextFromParagraphs(): Promise<string[]> {
    // Select all elements with the class "css-1362g6f"
    const elements = await this.recoveryPhraseText;

    let textArray: string[] = [];

    // Loop through each element and extract text
    for (let i = 0; i < (await elements.length); i++) {
      const text = await elements[i].getText();
      textArray.push(text);
    }
    // Return the array of extracted text
    return textArray;
  }
  
  // Continue Button
  async clickContinueButton(){
    await this.continueButton.waitForExist({ timeout: 5000 });
    await this.continueButton.click();
  }
}
