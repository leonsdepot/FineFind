const createShadowGroup = ( elements ) => {
  const host = document.createElement( 'div' );
  host.style.all = 'initial';

  const shadow = host.attachShadow( { mode: 'closed' } );
  elements.forEach( element => {
    shadow.appendChild( element );
  })

  return host;
}

const getRangePosition = ( range ) => {
  const position = range.getClientRects()[0];

  return {
    x: position.left + ( position.width / 2 ),
    y: position.top + ( position.height / 2 )
  }
}

const isInsideIframe = ( range ) => {
  return range.collapsed;
}

const isPositionOutsideDoc = ( x, y ) => {
  return x < 0 || y < 0 || x > document.documentElement.scrollWidth || y > document.documentElement.scrollHeight;
}

let isUserSelect = false;
document.addEventListener( 'focus', () => {
  isUserSelect = true;
})

document.addEventListener( 'mousedown', () => {
  isUserSelect = true;
})

document.addEventListener( 'keydown', () => {
  isUserSelect = true;
})

document.addEventListener( 'blur', () => {
  isUserSelect = false;
})

Utils.restoreOptions()
.then( settings => {
  const highlighter = new Highlighter( browser.runtime.getURL( 'img/ring.svg' ) );
  const notifier = new Notifier( browser.runtime.getURL( 'img/logo.svg' ) );

  let isInitiated = false;
  document.addEventListener( 'selectionchange', () => {
    if ( isUserSelect ) {
      return;
    }

    if ( ! isInitiated ) {
      isInitiated = true;

      document.body.appendChild(
        createShadowGroup( [highlighter.getElement(), notifier.getElement()] )
      );

      highlighter.updateColor(
        settings.highlighterHueDegree.value,
        settings.highlighterBrightness.value,
        settings.highlighterSaturation.value
      );

      if ( settings.showBannerOnActivation.value ) {
        notifier.show(
          browser.i18n.getMessage( 'isActiveReminder' )
        );
      }
    }

    const selectionRange = window.getSelection().getRangeAt( 0 );
    const position = getRangePosition( selectionRange );

    let failureResponse = null;
    if ( isInsideIframe( selectionRange ) ) {
      failureResponse = [
        browser.i18n.getMessage( 'error_isInsideIframe' ),
        browser.i18n.getMessage( 'error_isInsideIframe_subText' )
      ];
    }
    else if ( isPositionOutsideDoc( position.x, position.y ) ) {
      failureResponse = [ browser.i18n.getMessage( 'error_rangeOutsideDoc' ) ];
    }

    if ( failureResponse ) {
      if ( settings.showBannerOnFailure.value ) {
        notifier.show(
          failureResponse[0],
          failureResponse[1] || null
        );
      }

      return;
    }

    highlighter.moveTo( position.x, position.y );
    highlighter.animate( settings.highlighterDuration.value );
  })
})