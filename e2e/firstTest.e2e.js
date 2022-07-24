/**
 * ! Detox Documentation
 *
 * ? "device" object methods
 * https://wix.github.io/Detox/docs/api/device-object-api#methods
 *
 * ? Matchers
 * https://wix.github.io/Detox/docs/api/matchers
 *
 * ? Actions
 * https://wix.github.io/Detox/docs/api/actions-on-element
 *
 * ? Assertions
 * https://wix.github.io/Detox/docs/api/expect
 */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Step One'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('toucheMeButton')).tap();
    await expect(element(by.text('IM HERE'))).toBeVisible();
  });
});
