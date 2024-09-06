const debug = false;
if ( debug ) {
  setInterval( () => {
    browser.storage.sync.get()
    .then( value => {
      console.log( value );
    })
  }, 10000 )
}

browser.storage.sync.get()
.then( settings => {
  document.querySelectorAll( 'form.settingsBox > input' ).forEach( input => {
    const key = input.getAttribute( 'name' );

    if ( settings[key] ) {
      if ( input.getAttribute( 'type' ) == 'checkbox' ) {
        input.checked = settings[key];
      }
      else {
        input.value = settings[key];
      }
    }

    input.addEventListener( 'change', () => {
      const values = {};

      if ( input.getAttribute( 'type' ) == 'checkbox' ) {
        values[key] = input.checked;
      }
      else {
        values[key] = input.value;
      }

      browser.storage.sync.set( values );
    })
  })
})