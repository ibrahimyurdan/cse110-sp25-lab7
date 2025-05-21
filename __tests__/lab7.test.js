describe('Basic user flow for Website', () => {
  // Custom delay function
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
    await page.waitForSelector('product-item');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  }, 15000);

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    let allArePopulated = true;
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        return data = item.data;
      });
    });

    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);
      const value = prodItemsData[i];
      if (value.title.length == 0) { allArePopulated = false; }
      if (value.price.length == 0) { allArePopulated = false; }
      if (value.image.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 15000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.asElement().$('button');
    await button.click();
    await delay(500);
    const buttonText = await button.getProperty('innerText');
    const text = await buttonText.jsonValue();
    expect(text).toBe('Remove from Cart');
  }, 15000);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    const productItems = await page.$$('product-item');
    for (const item of productItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.asElement().$('button');
      const buttonText = await button.getProperty('innerText');
      const text = await buttonText.jsonValue();
      if (text === 'Add to Cart') {
        await button.click();
        await delay(100);
      }
    }
    await delay(1000);
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 30000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();
    await page.waitForSelector('product-item');
    await delay(1000);
    const productItems = await page.$$('product-item');
    for (const item of productItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.asElement().$('button');
      const buttonText = await button.getProperty('innerText');
      const text = await buttonText.jsonValue();
      expect(text).toBe('Remove from Cart');
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 30000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    await delay(1000);
    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  }, 15000);

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    const productItems = await page.$$('product-item');
    for (const item of productItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.asElement().$('button');
      await button.click();
      await delay(100);
    }
    await delay(1000);
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();
    await page.waitForSelector('product-item');
    await delay(1000);
    const productItems = await page.$$('product-item');
    for (const item of productItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.asElement().$('button');
      const buttonText = await button.getProperty('innerText');
      const text = await buttonText.jsonValue();
      expect(text).toBe('Add to Cart');
    }
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 30000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    await delay(1000);
    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[]');
  }, 15000);
});
