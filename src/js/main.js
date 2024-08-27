const createShadowGroup = ( elements, id = 'finefind-content' ) => {
  const host = document.createElement( 'div' );
  host.id = id;

  const shadow = host.attachShadow( { mode: 'open' } );
  elements.forEach( element => {
    shadow.appendChild( element );
  })

  return host;
}

const isPositionOutsideDoc = ( x, y ) => {
  return x < 0 || y < 0 || x > document.documentElement.scrollWidth || y > document.documentElement.scrollHeight;
}

let isCtrlFPressed = false;
let isUserSelect = false;
document.addEventListener( 'keydown', ( event ) => {
  if ( ( event.ctrlKey || event.metaKey ) && event.key === 'f' && !isCtrlFPressed ) {
    isCtrlFPressed = true;
    
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

    const highlighter = new Highlighter( browser.runtime.getURL( 'img/ring.svg' ) );
    const notifier = new Notifier( browser.runtime.getURL( 'img/logo.svg' ) );
    document.body.appendChild( 
      createShadowGroup( [highlighter.getElement(), notifier.getElement()] ) 
    );
    
    document.addEventListener( 'selectionchange', () => {
      if ( isUserSelect ) {
        return;
      }

      const range = window.getSelection().getRangeAt( 0 );
      const pos = range.getClientRects()[0];

      if ( isPositionOutsideDoc( pos.left, pos.top ) ) {
        notifier.show( browser.i18n.getMessage( 'error_rangeOutsideDoc' ) );
      }

      highlighter.moveTo( ( pos.left + ( pos.width / 2 ) ), ( pos.top + ( pos.height / 2 ) ) );
      highlighter.animate();
    })
  }
})