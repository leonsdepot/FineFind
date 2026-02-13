const getRangePosition = ( range ) => {
  const position = range.getClientRects()[0];

  return {
    x: position.left + ( position.width / 2 ),
    y: position.top + ( position.height / 2 )
  }
}

const isEmpty = ( selection ) => {
  return selection.type != 'Range';
}

const isPositionOutsideDoc = ( x, y ) => {
  return x < 0 || y < 0 || x > document.documentElement.scrollWidth || y > document.documentElement.scrollHeight;
}

let settings;
let finefindUI;
let isUserSelect = false;
let isEnvironmentReady = true;

document.addEventListener( 'pointerdown', () => {
  isUserSelect = true;
})

document.addEventListener( 'pointerup', () => {
  isUserSelect = false;
})

document.addEventListener( 'selectionchange', async () => {
  // Workaround for delayed viewport updates that can
  // make FineFind misdetect results as off-page (likely race condition).
  await new Promise(t => setTimeout(t, 0));

  const selection = window.getSelection();

  if ( document.hasFocus() || isUserSelect || isEmpty( selection ) || ! isEnvironmentReady ) {
    return;
  }
  else if ( ! finefindUI ) {
    isEnvironmentReady = false;

    settings = await Utils.restoreOptions();
    finefindUI = new FineFindUI( settings );
    finefindUI.attachTo(document.body);
    finefindUI.showWelcome( Utils.getLocalizedString( 'isActiveReminder' ) );

    isEnvironmentReady = true;
  }
  else if ( ! finefindUI?.isAttached() ) {
    finefindUI.attachTo(document.body);
  }

  const position = getRangePosition( selection.getRangeAt( 0 ) );

  if ( isPositionOutsideDoc( position.x, position.y ) ) {
    finefindUI.showError( Utils.getLocalizedString( 'error_rangeOutsideDoc' ) );
    return;
  }

  finefindUI.highlightAt( position.x, position.y );
})