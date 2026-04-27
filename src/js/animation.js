class KeyframeFX {
  #element;
  #keyframes
  #options;

  get element() {
    return this.#element;
  }

  get keyframes() {
    return this.#keyframes;
  }

  get options() {
    return this.#options;
  }

  constructor(element, keyframes, options = null) {
    this.#element = element;
    this.#keyframes = keyframes;
    this.#options = options;
  }
}

class AnimationFX {
  #keyframeFXs;
  #currentAnimations = [];
  #duration = 0;

  get duration() {
    return this.#duration;
  }

  set duration( duration ) {
    if ( this.#duration == duration )
      return;

    const oldDuration = this.#duration;
    this.#duration = duration;

    this.#keyframeFXs.forEach( v => {
      if ( ! v?.options?.duration )
        return;

      v.options.duration = ( v.options.duration / oldDuration ) * this.#duration;
    });
  }

  constructor( keyframeFXs ) {
    this.#keyframeFXs = keyframeFXs;

    keyframeFXs.forEach( v => {
      if ( v.options.duration )
        this.#duration += v.options.duration;
    });
  }

  cancel() {
    this.#currentAnimations.forEach( v => { v.cancel(); } );
    this.#currentAnimations = [];
  }

  async play() {
    this.cancel();

    if ( this.#keyframeFXs.some( v => !v.element.isConnected ) )
      throw new Error( 'Element is not connected to DOM' );

    for ( let i = 0; i < this.#keyframeFXs.length; i++ ) {
      const animation = this.#keyframeFXs[i].element.animate(
        this.#keyframeFXs[i].keyframes,
        this.#keyframeFXs[i].options
      );
      this.#currentAnimations.push( animation );

      try {
        await animation.finished;
      }
      catch {
        return false;
      }
    }

    return true;
  }
}