document.addEventListener( 'keydown', ( event ) => {
  if ( ( event.ctrlKey || event.metaKey ) && event.key === 'f' ) {
    const highlighter = new Highlighter( browser.runtime.getURL( 'img/ring.svg' ) );
    console.log( 'FineFind Test' );
  }
})