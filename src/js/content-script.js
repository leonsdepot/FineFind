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

const isEmpty = ( selection ) => {
  return selection.type != 'Range';
}

const isPositionOutsideDoc = ( x, y ) => {
  return x < 0 || y < 0 || x > document.documentElement.scrollWidth || y > document.documentElement.scrollHeight;
}

let notifier;
let highlighter;
let shadowHost;
let settings;
const setupInPage = () => {
  notifier = new Notifier( Utils.getInternalURL( 'img/logo.svg' ) );
  highlighter = new Highlighter( Utils.getInternalURL( 'img/ring.svg' ) );
  shadowHost = createShadowGroup( [highlighter.getElement(), notifier.getElement()] );

  document.body.appendChild( shadowHost );

  return Utils.restoreOptions()
  .then( loadedSettings => {
    settings = loadedSettings;

    highlighter.updateColor(
      settings.highlighterHueDegree.value,
      settings.highlighterBrightness.value,
      settings.highlighterSaturation.value
    );

    if ( settings.showBannerOnActivation.value && window.self === window.top ) {
      notifier.show( Utils.getLocalizedString( 'isActiveReminder' ) );
    }
  })
}

let isUserSelect = false;
let isEnvironmentReady = true;
let inputDebouncer;

document.addEventListener( 'pointerdown', () => {
  isUserSelect = true;
})

document.addEventListener( 'pointerup', () => {
  isUserSelect = false;
})

document.addEventListener( 'selectionchange', async () => {
  const selection = window.getSelection();

  if ( document.hasFocus() || isUserSelect || isEmpty( selection ) || ! isEnvironmentReady ) {
    return;
  }
  else if ( ! document.body.contains( shadowHost ) ) {
    isEnvironmentReady = false;

    await setupInPage();

    inputDebouncer = new DynamicDebouncer( settings.debounceTime.value );

    isEnvironmentReady = true;
  }

  const position = getRangePosition( selection.getRangeAt( 0 ) );

  if ( isPositionOutsideDoc( position.x, position.y ) ) {
    notifier.show(
      Utils.getLocalizedString( 'error_rangeOutsideDoc' ),
      null,
      settings.showBannerOnFailure.value
    );
    return;
  }

  inputDebouncer.schedule( () => {
    highlighter.animateAt(
      position.x,
      position.y,
      settings.highlighterDuration.value,
      settings.highlighterRepeatCount.value
    );
  });
})