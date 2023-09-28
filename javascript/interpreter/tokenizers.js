const translateFile = (file) => {
  return translateTerm(file.expression)
}

const translateTerm = (term, ...args) => {
  const translator = TOKEN_MAP[term.kind];

  return translator(term, ...args)
}

const translateStr = (str) => {
  return `"${str.value}"`
}

const translatePrint = (print, ...args) => {
  const value = print.value
  const valueTranslator = TOKEN_MAP[value.kind]
  const printVal = valueTranslator(value, ...args)

  return `console.log(${printVal})`
}

const translateFn = (fn, ...args) => {
  const params = fn.parameters.map(param => translateParam(param))

  if(args.length > params.length) {
    throw 'More arguments than you should'
  }

  const value = translateTerm(fn.value)

  return `(${params}) => (${value})`
}

const translateCall = (fnCall) => {
  const params = fnCall.arguments?.map(arg => translateTerm(arg)) || []
  const callee = translateTerm(fnCall.callee, ...params)

  return callee
}

const translateParam = (param) => {
  return param.text
}

const translateVar = (param, ...args) => {
  if(args.length) {
    return `${param.text}(${args})`
  }

  return `${param.text}` 
}

const translateInt = (param) => {
  return Number(param.value)
}

const translateLet = (letin, ...args) => {
  const name = translateParam(letin.name)
  const value = translateTerm(letin.value)
  const next = letin.next && translateTerm(letin.next)

  const letBase = `let ${name} = ${value}`;

  if(next) {
    return `${letBase}; ${next}`
  }

  return `${letBase}`
}

const translateIf = (customIf) => {
  const condition = translateTerm(customIf.condition)
  const executeIf = translateTerm(customIf.then)
  const orElse = translateTerm(customIf.otherwise)

  return `${condition} ? ${executeIf} : ${orElse}`
}

const translateBinary = (binary) => {
  const lhs = translateTerm(binary.lhs)
  const rhs = translateTerm(binary.rhs)
  const op = translateBinaryOp(binary.op)
  
  return `${lhs} ${op} ${rhs}`
}

const translateBinaryOp = (op) => {
  return OPERATORS[op]
}

const TOKEN_MAP = {
  'Print': translatePrint,
  'Str': translateStr,
  'Function': translateFn,
  'Let': translateLet,
  'If': translateIf,
  'Binary': translateBinary,
  'BinaryOp': translateBinaryOp,
  'Var': translateVar,
  'Int': translateInt,
  'Call': translateCall
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

module.exports = { translateFile, TOKEN_MAP }