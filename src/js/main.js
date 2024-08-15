let keyHookEnabled = true;
let isUserSelect = false;

document.addEventListener( 'keydown', ( event ) => {
  if ( ( event.ctrlKey || event.metaKey ) && event.key === 'f' && keyHookEnabled ) {
    keyHookEnabled = false;
    
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
    const checker = new Checker();
    document.addEventListener( 'selectionchange', () => {
      if ( isUserSelect ) {
        return;
      }

      const range = window.getSelection().getRangeAt( 0 );
      const pos = range.getClientRects()[0];

      if ( checker.positionOutsideDoc( pos.left, pos.top ) ) {
        console.warn( browser.i18n.getMessage( 'error_rangeOutsideDoc' ) );
      }

      highlighter.moveTo( ( pos.left + ( pos.width / 2 ) ), ( pos.top + ( pos.height / 2 ) ) );
      highlighter.animate();
    })
  }
})