const { Translator } = require('./translator');

class Statement {
  static current
  static translated

  constructor(current) {
    this.current = current;
    this.translated = null;
  }

  generate(custom = null) {
    const currentTranslator = custom || Translator;
    const translator = new currentTranslator(this.current)
    const translated = translator.parse()

    this.translated = translated

    return this.translated 
  }

  getRef() {
    return this.current
  }
}

module.exports = { Statement }