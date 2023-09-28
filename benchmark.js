const chalk = require('chalk');
const Benchmark = require('benchmark');
const { main: classBased } = require('./class-based/main');
const { main: recursive } = require('./class-recursive/main')

const suiteHelper = (i) => {
  console.log(``)
  console.log('-------------------------------------')
  console.log(``)
  console.log(chalk.bgGreen('Suite Results:'));
  console.log(``)
  i.forEach(result => {
    console.log(chalk.bgYellow(`${result.name}:`))
    console.log(``)
    console.log(chalk.red(`${result.hz}`), 'ops/sec')
    console.log(chalk.red(`${result.count}`), 'times')
    console.log(chalk.red(`${result.stats.moe}`), 'or', chalk.red(`${result.stats.rme}`), 'margin of errors')
    console.log(chalk.red(`${result.stats.variance}`), 'variance')
    console.log(``)
  })
}

function display() {
  suiteHelper(this)
}

const suite = new Benchmark.Suite;

suite
  .add('Composable classes', () => {
    classBased()
  })
  .add('Recursive class', () => {
    recursive()
  })
  .on('complete', display)
  .run({ async: true });

module.exports = { suiteHelper }
