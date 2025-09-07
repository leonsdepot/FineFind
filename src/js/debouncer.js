class DynamicDebouncer {
  constructor( milliseconds, isPreCooldownInstant = true ) {
    this.cooldown = milliseconds;
    this.isPreCooldownInstant = isPreCooldownInstant;
    this.lastTriggerTime = 0;
    this.timeoutID = null;
  }

  schedule( callback ) {
    const time = Date.now();

    if ( this.timeoutID ) {
      clearTimeout( this.timeoutID );
      this.timeoutID = null;
    }

    if ( this.isPreCooldownInstant && time > this.lastTriggerTime + this.cooldown ) {
      callback();
    }
    else {
      this.timeoutID = setTimeout( () => {
        this.timeoutID = null;
        callback();
      }, this.cooldown );
    }

    this.lastTriggerTime = time;
  }
}