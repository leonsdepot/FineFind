const createShadowGroup = ( elements ) => {
  const host = document.createElement( 'div' );
  host.style.all = 'initial';

  const shadow = host.attachShadow( { mode: 'closed' } );
  elements.forEach( element => {
    shadow.appendChild( element );
  })

  return host;
}

const getSelectionPosition = () => {
  const position = window.getSelection().getRangeAt( 0 ).getClientRects()[0];

  return {
    x: position.left + ( position.width / 2 ),
    y: position.top + ( position.height / 2 )
  }
}

const isInsideIframe = () => {
  const selectionRange = window.getSelection().getRangeAt( 0 );

  return selectionRange.collapsed;
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

    notifier.show(
      browser.i18n.getMessage( 'isActiveReminder' ),
      browser.i18n.getMessage( 'isActiveReminder_subText' )
    );
    
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

      const position = getSelectionPosition();

      if ( isInsideIframe() ) {
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
        highlighter.animate();
      }
    })
  }
})