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
    document.addEventListener( 'selectionchange', () => {
      if ( isUserSelect ) {
        return;
      }
      
      const select = window.getSelection();
      const pos = select.getRangeAt( 0 ).getClientRects()[0];

      highlighter.moveTo( ( pos.left + ( pos.width / 2 ) ), ( pos.top + ( pos.height / 2 ) ) );
      highlighter.animate();
    })
  }
})