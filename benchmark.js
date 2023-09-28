const Benchmark = require('benchmark');
const { main: classBased } = require('./class-based/main');

const suite = new Benchmark.Suite;

suite
  .add('Classbased', () => {
    classBased()
  })
  .add('Recursive', () => {
    
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ 'async': true });