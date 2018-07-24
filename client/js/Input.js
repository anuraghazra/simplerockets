const Key = (function () {

  KEYS = {
    87: 'W',
    65: 'A',
    83: 'S',
    68: 'D',
    32: ' ',
  };

  let STATES = {
    'W': false,
    'A': false,
    'S': false,
    'D': false,
    ' ': false,
  }

  function onUp(callback) {
    window.addEventListener('keyup', function (e) {
      STATES[ KEYS[e.which] ] = true;
      callback(KEYS[e.which], STATES)
    });
  }

  function onDown(callback) {
    window.addEventListener('keydown', function (e) {
      STATES[ KEYS[e.which] ] = false;
      callback(KEYS[e.which], STATES);
    })
  }



  return {
    onDown,
    onUp,
    KEYS : STATES
  }

})();