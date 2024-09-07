const debug = false;
if ( debug ) {
  setInterval( () => {
    browser.storage.sync.get()
    .then( value => {
      console.log( value );
    })
  }, 10000 )
}

Utils.restoreOptions()
.then( storageSettings => {
  document.querySelectorAll( 'form.settingsBox > input' ).forEach( input => {
    const key = input.getAttribute( 'name' );

    if ( storageSettings[key] ) {
      if ( input.getAttribute( 'type' ) == 'checkbox' ) {
        input.checked = storageSettings[key].value;
      }
      else {
        input.value = storageSettings[key].value;
      }
    }

    input.addEventListener( 'change', () => {
      if ( input.getAttribute( 'type' ) == 'checkbox' ) {
        storageSettings[key].value = input.checked;
      }
      else if ( input.getAttribute( 'type' ) == 'number' ) {
        storageSettings[key].value = Number( input.value );
      }
      else {
        storageSettings[key].value = input.value;
      }

      Utils.saveOptions( storageSettings );
    })
  })
})