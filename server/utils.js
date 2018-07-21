module.exports = {
  rgb(r, g, b, a) {
    if (g === undefined) g = r;
    if (b === undefined) b = r;
    if (a === undefined) a = 1;
    if (a > 1) { a = a / 255 };
    return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
  },
  hsl(h, s, l, a) {
    return 'hsla(' + h + ', ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + clamp(a, 0, 1) + ')';
  },
  randomRGB() {
    let r = randomInt(255);
    let g = randomInt(255);
    let b = randomInt(255);
    return rgb(r, g, b)
  },
  randomHSLA(a) {
    let h = random(360);
    let s = random(100);
    let l = random(100);
    a = (a === undefined) ? 1 : a;
    return hsla(h, s, l, a);
  },

  norm(value, min, max) {
    return (value - min) / (max - min);
  },
  lerp(norm, min, max) {
    return (max - min) * norm + min;
  },
  map(value, sMin, sMax, dMin, dMax) {
    return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
  },
  dist(px, py, qx, qy) {
    let dx = px - qx;
    let dy = py - qy;
    return Math.sqrt(dx * dx + dy * dy);
  },
  random(min, max) {
    if (max === undefined) {
      return Math.random() * min;
    } else {
      return min + Math.random() * (max - min);
    }
  },
  randomInt(min, max) {
    return Math.floor(min + Math.random() * (((max === undefined) ? 0 : max) - min + 1))
  },
  clamp(value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  },
  tween(pos, target, speed) {
    if (speed == undefined) speed = 20;
    pos += (target - pos) / speed;
    return pos;
  },

  checkType(value, type) {
    if (value === undefined) { return };
    if (typeof value === 'object') {
      let checkObjects = value.constructor.toString().toLowerCase().indexOf(type + '()');
      if (checkObjects === -1) {
        throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
      } else {
        return value;
      }
    } else {
      if (typeof value !== type) {
        throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
      } else {
        return value;
      }
    }
  },

  optional(value, optValue) {
    if (value === undefined) {
      value = optValue
    };
    return value;
  }

}