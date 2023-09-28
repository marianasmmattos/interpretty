const { getPath, parseJsonFile } = require('./helpers')
const { Interpreter } = require('./interpreter')

const main = (jsonPath = '../challenge/files/print.json') => {
  const file = getPath(jsonPath)
  const ast = parseJsonFile(file)

  const interpreter = new Interpreter()

  interpreter.execute(ast)
}

main()

module.exports = { main }