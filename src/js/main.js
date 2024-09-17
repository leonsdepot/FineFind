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

let isCtrlFPressed = false;
let isUserSelect = false;
document.addEventListener( 'keydown', ( event ) => {
  if ( ( event.ctrlKey || event.metaKey ) && event.key === 'f' && !isCtrlFPressed ) {
    isCtrlFPressed = true;
    
    const highlighter = new Highlighter( browser.runtime.getURL( 'img/ring.svg' ) );
    const notifier = new Notifier( browser.runtime.getURL( 'img/logo.svg' ) );
    document.body.appendChild(
      createShadowGroup( [highlighter.getElement(), notifier.getElement()] )
    );

    let settings = Utils.defaultSettings.settings;
    Utils.restoreOptions()
    .then( storageSettings => {
      settings = storageSettings;

      if ( settings.showBanner.value ) {
        notifier.show(
          browser.i18n.getMessage( 'isActiveReminder' ),
          browser.i18n.getMessage( 'isActiveReminder_subText' )
        );
      }

      highlighter.updateColor(
        settings.highlighterHueDegree.value,
        settings.highlighterBrightness.value,
        settings.highlighterSaturation.value
      );
    })
    
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
    
    document.addEventListener( 'selectionchange', () => {
      if ( isUserSelect ) {
        return;
      }

      const selectionRange = window.getSelection().getRangeAt( 0 );
      const position = getRangePosition( selectionRange );

      if ( isInsideIframe( selectionRange ) ) {
        notifier.show(
          browser.i18n.getMessage( 'error_isInsideIframe' ),
          browser.i18n.getMessage( 'error_isInsideIframe_subText' )
        );
      }
      else if ( isPositionOutsideDoc( position.x, position.y ) ) {
        notifier.show( browser.i18n.getMessage( 'error_rangeOutsideDoc' ) );
      }
      else {
        highlighter.moveTo( position.x, position.y );
        highlighter.animate( settings.highlighterDuration.value );
      }
    })
  }
})