const { Token } = require('./token')

class Interpreter {
  static current
  static tokens

  constructor() {
    this.tokens = []
    this.current = null
  }

  execute(ast) {
    this.generateToken(ast)

    return this.getTokensFn()
  }

  generateToken(obj) {
    const token = new Token(obj);

    token.generate()

    this.current = token.current

    this.tokens.push(token)

    this.next();
  }

  next() {
    const next = this.current && this.current['next'];
    
    if(!next) {
      return;
    }

    this.executeNext(next)
  }

  executeNext(token) {   
    this.generateToken(token)
  }

  getTokensFn() {
    const jsTokens = this.tokens.map(token => token.translated)
    const jsString = jsTokens.join(';')
    const tokensFn = new Function(jsString)

    return tokensFn()
  }
}

module.exports = { Interpreter }