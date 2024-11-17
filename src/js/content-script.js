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

let isUserSelect = false;
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

Utils.restoreOptions()
.then( settings => {
  const isInIFrame = window.self !== window.top;

  const notifier = new Notifier( Utils.getInternalURL( 'img/logo.svg' ) );
  const highlighter = new Highlighter( Utils.getInternalURL( 'img/ring.svg' ) );
  highlighter.updateColor(
    settings.highlighterHueDegree.value,
    settings.highlighterBrightness.value,
    settings.highlighterSaturation.value
  );
  const shadowHost = createShadowGroup( [highlighter.getElement(), notifier.getElement()] );

  let isWelcomeMsgShown = ! settings.showBannerOnActivation.value;
  document.addEventListener( 'selectionchange', () => {
    const selection = window.getSelection();

    if ( isUserSelect ) {
      return;
    }
    else if ( isEmpty( selection ) ) {
      highlighter.cancelAnimation();
      return;
    }

    if ( ! document.body.contains( shadowHost ) ) {
      document.body.appendChild( shadowHost );
    }

    if ( ! isWelcomeMsgShown && ! isInIFrame ) {
      notifier.show( Utils.getLocalizedString( 'isActiveReminder' ) );

      isWelcomeMsgShown = true;
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

    highlighter.moveTo( position.x, position.y );
    highlighter.animate( settings.highlighterDuration.value );
  })
})