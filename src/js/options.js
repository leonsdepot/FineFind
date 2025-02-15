document.querySelectorAll( 'form' ).forEach( form => {
  form.addEventListener( 'submit', e => {
    e.preventDefault();
  })
})

document.querySelectorAll( '[data-i18n]' ).forEach( element => {
  const key = element.getAttribute( 'data-i18n' );

  const text = Utils.getLocalizedString( 'setting_' + key );
  if ( text ) {
    element.appendChild( document.createTextNode( text ) );
  }
})

const urlParams = new URLSearchParams( document.location.search );
const isSecretSettingsEnabled = urlParams.get( 'secretSettings' );
if ( isSecretSettingsEnabled === "true" ) {
  document.querySelectorAll( 'button.secretSetting' ).forEach( element => {
    element.classList.toggle( '--hidden' );
  })
}

const unrestrict = document.querySelector( '#unrestrict' );
unrestrict.addEventListener( 'click', () => {
  document.querySelectorAll( 'input[type=range]' ).forEach( element => {
    element.type = 'number';
  })
})

const debug = document.querySelector( '#debug' );
debug.addEventListener( 'click', () => {
  Utils.getDebugInfo()
  .then( log => JSON.stringify( log, null, " " ) )
  .then( logJson => {
    navigator.clipboard.writeText( '```js\n' + logJson + '\n```' );
  })
})

Utils.restoreOptions()
.then( storageSettings => {
  document.querySelectorAll( 'input' ).forEach( input => {
    const key = input.getAttribute( 'name' );

    if ( ! storageSettings[key] ) {
      return
    }

    if ( input.getAttribute( 'type' ) == 'checkbox' ) {
      input.checked = storageSettings[key].value;
    }
    else {
      input.value = storageSettings[key].value;
    }

    const output = document.querySelector( 'output[for=' + key + ']' );
    if ( output ) {
      output.value = storageSettings[key].value;

      input.addEventListener( 'input', () => {
        while( output.firstChild ) {
          output.firstChild.remove();
        }

        output.appendChild( document.createTextNode( input.value ) );
      })
    }

    input.addEventListener( 'change', () => {
      if ( input.getAttribute( 'type' ) == 'checkbox' ) {
        storageSettings[key].value = input.checked;
      }
      else if ( input.valueAsNumber ) {
        storageSettings[key].value = input.valueAsNumber;
      }
      else {
        storageSettings[key].value = input.value;
      }

      Utils.saveOptions( storageSettings );
    })
  })
})
.then( () => {
  const higlighter = new Highlighter( '../img/ring.svg' );
  const previewBox = document.querySelector( '#finefind-indicatorBox' );
  previewBox.prepend( higlighter.getElement() );

  const previewControls = document.querySelectorAll(
    '#highlighterHueDegree, #highlighterBrightness, #highlighterSaturation'
  );
  previewControls.forEach( control => {
    control.addEventListener( 'input', () => {
      higlighter.updateColor(
        previewControls[0].value,
        previewControls[1].value,
        previewControls[2].value
      );
    })
  })
  previewControls[0].dispatchEvent( new Event( 'input' ) );
})
.then( () => {
  const reset = document.querySelector( '#reset' );
  reset.addEventListener( 'click', () => {
    if ( ! confirm( Utils.getLocalizedString( 'setting_resetConfirm' ) ) ) {
      return
    }

    document.querySelectorAll( 'input, button' ).forEach( element => {
      element.disabled = true;
    })

    Utils.resetOptions()
    .then( () => {
      window.location.reload();
    })
  })
})