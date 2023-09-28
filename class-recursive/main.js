const { getPath, parseJsonFile } = require('./helpers')
const { Interpreter } = require('./interpreter')

const main = (jsonPath = '../challenge/files/fib.json') => {
  const file = getPath(jsonPath)
  const ast = parseJsonFile(file)

  const interpreter = new Interpreter(ast.expression)

  interpreter.execute()
}

main()

module.exports = { main }