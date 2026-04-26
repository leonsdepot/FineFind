class Notifier {
  #msgBox = document.createElement( 'div' );
  #textBox = document.createElement( 'div' );
  #animation = new Map();

  get element() {
    return this.#msgBox;
  }

  constructor( path = false ) {
    this.#setIdAndPart( this.#textBox, 'finefind-notifier-textbox' );

    const circleLeftFill = document.createElement( 'div' );
    this.#setIdAndPart( circleLeftFill, 'finefind-circle-left-fill' );

    const circleLeft = document.createElement( 'div' );
    this.#setIdAndPart( circleLeft, 'finefind-circle-left' );
    circleLeft.appendChild( circleLeftFill );

    const circleRightFill = document.createElement( 'div' );
    this.#setIdAndPart( circleRightFill, 'finefind-circle-right-fill' );

    const circleRight = document.createElement( 'div' );
    this.#setIdAndPart( circleRight, 'finefind-circle-right' );
    circleRight.appendChild( circleRightFill );

    const circleLoading = document.createElement( 'div' );
    this.#setIdAndPart( circleLoading, 'finefind-circle-loading' );
    circleLoading.appendChild( circleLeft );
    circleLoading.appendChild( circleRight );

    this.#setIdAndPart( this.#msgBox, 'finefind-notifier' );
    if ( path ) {
      const icon = document.createElement( 'div' );
      icon.style.backgroundImage = 'url(' + path + ')';
      this.#setIdAndPart( icon, 'finefind-notifier-icon' );
      
      this.#msgBox.appendChild( icon );
    }
    this.#msgBox.appendChild( this.#textBox );
    this.#msgBox.appendChild( circleLoading );

    this.#msgBox.addEventListener( 'mouseenter', event => {
      event.stopPropagation();

      this.#msgBox.getAnimations( { subtree: true } ).forEach( animation => {
        if ( animation.playState == 'running' ) {
          animation.pause();
        }
      });
    })

    this.#msgBox.addEventListener( 'mouseleave', event => {
      event.stopPropagation();

      this.#msgBox.getAnimations( { subtree: true } ).forEach( animation => {
        if ( animation.playState == 'paused' ) {
          animation.play();
        }
      });
    })

    this.#animation.set( 'msgBoxIn', new AnimationFX( [
      new KeyframeFX(
        this.#msgBox,
        [
          {
            transform: 'translateX(-120%)',
          },
          {
            visibility: 'visible',
            transform: 'translateX(2.2em)'
          },
        ],
        { duration: 450, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'both' }
      )
    ]));

    this.#animation.set( 'circle', new AnimationFX( [
      new KeyframeFX(
        circleLeftFill,
        [ { transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' } ],
        { duration: 10000, fill: 'both' }
      ),
      new KeyframeFX(
        circleRightFill,
        [ { transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' } ],
        { duration: 10000, fill: 'both' }
      )
    ]));

    this.#animation.set( 'msgBoxOut', new AnimationFX( [
      new KeyframeFX(
        this.#msgBox,
        [ { transform: 'translateX(-120%)' } ],
        { duration: 450, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'both' }
      )
    ]));
  }

  #setIdAndPart( element, id ) {
    element.setAttribute( 'id', id );
    element.setAttribute( 'part', id );
  }

  #clearText() {
    while ( this.#textBox.firstChild ) {
      this.#textBox.firstChild.remove();
    }
  }

  #createTextElement( text, id = false ) {
    const p = document.createElement( 'p' );
    if ( id ) {
      this.#setIdAndPart( p, id );
    }
    p.appendChild( document.createTextNode( text ) );

    return p;
  }

  async animate( milliseconds = 4000 ) {
    this.#animation.get( 'circle' ).duration = milliseconds;

    this.#animation.forEach( ( v, k ) => { v.cancel(); } );
    for ( const [key, animation] of this.#animation ) {
      if ( ! await animation.play() )
        return false;
    }

    return true;
  }

  async show( text, subText = false, isConditionMet = true ) {
    if ( ! isConditionMet ) {
      return;
    }

    this.#clearText();

    this.#textBox.appendChild( this.#createTextElement( text, 'finefind-notifier-text' ) );
    if ( subText ) {
      this.#textBox.appendChild( this.#createTextElement( subText, 'finefind-notifier-subtext' ) );
    }

    if( ! await this.animate() )
      return;

    this.#clearText();
  }
}