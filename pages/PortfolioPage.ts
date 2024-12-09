export class PortfolioPage {
// Define elements
get walletManagment(){
    return $('.css-18uhltd > .edp3oa0');
}
get mainWallet(){
    return $('.s99g393 > ._1m5r00c0')
}

get plusButton(){
    return $('.css-69i1ev > ._1dnyra90')
}
 get manageRecoveryPhrase(){
    return $('//span[text()="Manage recovery phrase"]');
 }
 
 get toogleButtons(){
    return $$('._1qwtpic0')
 }

 get saveButton(){
    return $('.css-whhnig')
 }

 get walletscnd(){
    return $('//span[text()="Wallet 2"]')
 }
 get walletThird(){
    return $('//span[text()="Wallet 3"]')
 }

// Define actions
async clickWalletManagment() {
    await this.walletManagment.click();
  }
async mainWalletDisplayed(){
    await this.mainWallet.waitForDisplayed();
}

async clickPlusButton(){
    await this.plusButton.waitForClickable();
    await this.plusButton.click();
}

async clickManageRecoveryPhrase(){
    await this.manageRecoveryPhrase.waitForClickable();
    await this.manageRecoveryPhrase.click();
}

async firstButton(){
    const isButtonDisabled = await this.toogleButtons[0].isEnabled();
    expect(isButtonDisabled).toBe(false)
    const dataState = await this.toogleButtons[0].getAttribute('data-state');
    expect(dataState).toBe('checked');
}

async selectTwoButton(){
    await this.toogleButtons[2].click();
    await  this.toogleButtons[3].click();
}

async clickSaveButton(){
    await this.saveButton.waitForClickable();
    await this.saveButton.click();
}

async seeSecndWallet(){
   await this.walletscnd.waitForDisplayed();
  await this.walletscnd.getText();
   
}
async seeThridWallet(){
    await this.walletThird.waitForDisplayed();
   await this.walletThird.getText();
    
 }
}