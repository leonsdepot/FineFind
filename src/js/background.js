browser.runtime.onInstalled.addListener( details => {
  if ( details.reason == 'install' ) {
    browser.runtime.openOptionsPage()
  }
})