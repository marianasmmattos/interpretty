const { Parser } = require('./parser');

class Token {
  static current
  static translated

  constructor(current) {
    this.current = current;
    this.translated = null;
  }

  generate() {
    return this.parseToken()
  }

  parseToken() {
    const translator = new Parser(this.current)
    const translated = translator.parse()

    this.translated = translated

    return this.translated 
  }

  getRef() {
    return this.current
  }
}

module.exports = { Token }