class Interpreter {
  constructor(object) {
    this.object = object
    this.statements = []   
  }

  execute() {
    this.statements = this.iterate(this.object)
    this.getStatements()
  }

  iterate(object, _ctx = null, ...args) {
    const value = this[object.kind]?.(object, _ctx, ...args)
    return value
  }

  getStatements() {
    const statementsFn = new Function(this.statements)

    return statementsFn()
  }

  'Str'(current, _ctx = null) {
    return `"${current.value}"`
  }

  'Print'(current, _ctx = null){
    const value = this.iterate(current.value)

    return `console.log(${value})`
  }

  'Let'(current, _ctx = null) {
    const name = current.name.text
    const value = this.iterate(current.value)
    const next = this.iterate(current.next)

    return next ? `let ${name} = ${value}; ${next}` : `let ${name} = ${value}`
  }

  'Function'(current, _ctx = null) {
    const params = current.parameters.map(param => param.text)
    const value = this.iterate(current.value);

    const parsedValues = value.split(';')
    const lastValue = parsedValues.pop()

    return `(${params}) => {
      ${parsedValues.join(';')}
      return ${lastValue}
    }`
  }

  'Term'(current, _ctx) {
    return this[current.kind](current.value)
  }

  'If'(current, _ctx = null){
    const condition = this.iterate(current.condition)
    const executeIf = this.iterate(current.then)
    const orElse = this.iterate(current.otherwise)
  
    return `${condition} ? ${executeIf} : ${orElse}`
  }

  'Binary'(current, _ctx = null) {
    const lhs = this.iterate(current.lhs)
    const rhs = this.iterate(current.rhs)
    const op = this['BinaryOp'](current.op)
    
    return `${lhs} ${op} ${rhs}`
  }

  'BinaryOp'(current, _ctx = null) {
    return OPERATORS[current]
  }

  'Param'(current, _ctx = null) {
    return current.text
  }

  'Var'(current, _ctx = null, ...args) {
    if(args.length) {
      return `${current.text}(${args})`
    }
  
    return `${current.text}` 
  }
  
  'Call'(current, _ctx = null) {
    const params = current.arguments?.map(arg => this.iterate(arg)) || []
    const callee = this.iterate(current.callee, _ctx, ...params)
  
    return callee
  }

  'Int'(current, _ctx = null){
    return Number(current.value)
  }
}

const OPERATORS = {
  Add: '+',
  Sub: '-',
  Mul: '*',
  Div: '/',
  Rem: '%',
  Eq: '===',
  Neq: '!==',
  Lt: '<',
  Gt: '>',
  Lte: '<=',
  Gte: '>=',
  And: '&&',
  Or: '||',
}

module.exports = { Interpreter }