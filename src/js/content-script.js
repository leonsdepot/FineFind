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
let eventId = 0;

document.addEventListener( 'pointerdown', () => {
  isUserSelect = true;
})

document.addEventListener( 'pointerup', () => {
  isUserSelect = false;
})

document.addEventListener( 'selectionchange', async () => {
  const currentId = eventId + 1;
  eventId = currentId;

  if ( ! settings )
    settings = await Utils.restoreOptions();

  // Workaround for delayed viewport updates that can
  // make FineFind misdetect results as off-page (likely race condition).
  await new Promise( t => setTimeout( t, settings.startDelay.value ) );

  const selection = window.getSelection();

  if ( document.hasFocus() || isUserSelect || isEmpty( selection ) || eventId != currentId ) {
    return;
  }
  else if ( ! finefindUI ) {
    finefindUI = new FineFindUI( settings );
    finefindUI.attachTo(document.body);
    finefindUI.showWelcome( Utils.getLocalizedString( 'isActiveReminder' ) );
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