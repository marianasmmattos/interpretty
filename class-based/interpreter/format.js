class Format {
  execute(object) {
    return this[object.kind](object)
  }

  translateFile(file) {
    return this['Term'](file.expression)
  }

  'Str'= (str) => {
    return `"${str.value}"`
  }

  'Print' = (print, ...args) => {
    const value = print.value
    const valueTranslator = this[value.kind]
    const printVal = valueTranslator(value, ...args)

    return `console.log(${printVal})`
  }

  'Let' = (letin) => {
    const name = this['Param'](letin.name)
    const value = this['Term'](letin.value)
    const next = letin.next && this['Term'](letin.next)
  
    const letBase = `let ${name} = ${value}`;
  
    if(next) {
      return `${letBase}; ${next}`
    }
  
    return `${letBase}`
  }

  'Function' = (fn, ...args) => {
    const params = fn.parameters.map(param => this['Param'](param))

    if(args.length > params.length) {
      throw 'More arguments than you should'
    }
  
    const value = this['Term'](fn.value)
    const parsedValues = value.split(';')
    const lastValue = parsedValues.pop()
  
    return `(${params}) => {
      ${parsedValues.join(';')}
      return ${lastValue}
    }`
  }

  'Term' = (term, ...args) => {
    const formatter = this[term.kind]

    return formatter(term, ...args)
  }

  'If' = (customIf) => {
    const condition = this['Term'](customIf.condition)
    const executeIf = this['Term'](customIf.then)
    const orElse = this['Term'](customIf.otherwise)
  
    return `${condition} ? ${executeIf} : ${orElse}`
  }

  'Binary' = (binary) => {
    const lhs = this['Term'](binary.lhs)
    const rhs = this['Term'](binary.rhs)
    const op = this['BinaryOp'](binary.op)
    
    return `${lhs} ${op} ${rhs}`
  }

  'BinaryOp' = (op) => {
    return OPERATORS[op]
  }

  'Param' = (param) => {
    return param.text
  }

  'Var' = (param, ...args) => {
    if(args.length) {
      return `${param.text}(${args})`
    }
  
    return `${param.text}` 
  }
  
  'Call' = (fnCall) => {
    const term = this['Term']
    const params = fnCall.arguments?.map(arg => term(arg)) || []
  
    return this['Term'](fnCall.callee, ...params)
  }

  'Int' = (param) => {
    return Number(param.value)
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

module.exports = { Format }