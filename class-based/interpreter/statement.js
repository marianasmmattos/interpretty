const { Translator } = require('./translator');

class Statement {
  static current
  static translated

  constructor(current) {
    this.current = current;
    this.translated = null;
  }

  generate() {
    const translator = new Translator(this.current)
    const translated = translator.parse()

    this.translated = translated

    return this.translated 
  }

  getRef() {
    return this.current
  }
}

module.exports = { Statement }