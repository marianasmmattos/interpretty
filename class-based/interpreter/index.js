const { Statement } = require('./statement')

class Interpreter {
  static current
  static statements

  constructor() {
    this.statements = []
    this.statement = null
  }

  execute(ast) {
    return this.generateStatement(ast)
  }

  generateStatement(obj) {
    const statement = new Statement(obj);

    statement.generate()

    this.statement = statement

    this.statements.push(statement)

    this.next();
  }

  next() {
    this.executeStatement(this.statement)

    const next = this.statement.current && this.statement.current['next'];
    
    if(!next) {
      return;
    }

    this.generateStatement(next)
  }

  executeStatement() {
    const jsStatement = this.statement.translated
    const statementsFn = new Function(jsStatement)

    return statementsFn()
  }
}

module.exports = { Interpreter }