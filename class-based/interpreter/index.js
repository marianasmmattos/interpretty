const { Statement } = require('./statement')

class Interpreter {
  static current
  static statements

  constructor() {
    this.statements = []
    this.current = null
  }

  execute(ast) {
    this.generateStatement(ast)

    return this.getStatements()
  }

  generateStatement(obj) {
    const statement = new Statement(obj);

    statement.generate()

    this.current = statement.current

    this.statements.push(statement)

    this.next();
  }

  next() {
    const next = this.current && this.current['next'];
    
    if(!next) {
      return;
    }

    this.executeNext(next)
  }

  executeNext(statement) {   
    this.generateStatement(statement)
  }

  getStatements() {
    const jsStatements = this.statements.map(statement => statement.translated)
    const jsString = jsStatements.join(';')
    const statementsFn = new Function(jsString)

    return statementsFn()
  }
}

module.exports = { Interpreter }