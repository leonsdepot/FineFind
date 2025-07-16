class FineFindUI {
  #settings;
  #shadowHost;
  #highlighter;
  #notifier;
  #inputDebouncer;
  
  constructor( settings ) {
    this.#settings = settings;

    this.#highlighter = new Highlighter( Utils.getInternalURL( 'img/ring.svg' ) );
    this.#highlighter.updateColor(
      this.#settings.highlighterHueDegree.value,
      this.#settings.highlighterBrightness.value,
      this.#settings.highlighterSaturation.value
    );

    this.#notifier = new Notifier( Utils.getInternalURL( 'img/logo.svg' ) );

    this.#inputDebouncer = new DynamicDebouncer( this.#settings.debounceTime.value );
  }

  #createShadowHost( elements ) {
    const host = document.createElement( 'div' );
    host.style.all = 'initial';

    const shadow = host.attachShadow( { mode: 'closed' } );
    elements.forEach( element => {
      shadow.appendChild( element );
    })

    return host;
  }

  attachTo( container ) {
    const shadowHost = this.#createShadowHost(
      [
        this.#highlighter.getElement(),
        this.#notifier.getElement()
      ]
    );

    container.appendChild( shadowHost );

    this.#shadowHost = shadowHost;
  }

  isAttached() {
    return this.#shadowHost?.isConnected ?? false;
  }

  showSuccess( text, subText = false ) {
    this.#notifier.show( text, subText );
  }

  showInfo( text, subText = false ) {
    this.#notifier.show( text, subText );
  }

  showWarning( text, subText = false ) {
    this.#notifier.show( text, subText );
  }

  showError( text, subText = false ) {
    this.#notifier.show(
      text,
      subText,
      this.#settings.showBannerOnFailure.value
    );
  }

  highlightAt( x, y ) {
    this.#inputDebouncer.schedule( () => {
      this.#highlighter.animateAt(
        x,
        y,
        this.#settings.highlighterDuration.value,
        this.#settings.highlighterRepeatCount.value
      );
    });
  }
}