browser.runtime.onInstalled.addListener( async ( { reason, temporary } ) => {
  switch ( reason ) {
    case "install":
      browser.runtime.openOptionsPage();
      break;
  }
});