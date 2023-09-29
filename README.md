## Summary | Sumário

- [About | Sobre](#about-sobre)
- [How to run | Como rodar](#how-to-run-como-rodar)
- [Technical explanation | Abordagem técnica](#technical-explanation-abordagem-tecnica)
- [Useful Links | Links Úteis](#useful-links-links-uteis)

## About | Sobre

This repository is an implementation for the challenge proposed [here](https://github.com/aripiprazole/rinha-de-compiler/).

The original challenge was to, given an AST json output from a custom programming language (`.rinha`), to make an interpreter or compiler and also being able to run in a docker image with max 2gb ram 2 cpu.

--------------------------------------------------------------------------------------------

O código desse repositório veio como realização do desafio proposto [aqui](https://github.com/aripiprazole/rinha-de-compiler/).

Para o desafio, foi dada a AST de uma linguagem custom (`.rinha`) e o objetivo era fazer um interpretador ou compilador rodando em docker com 2 núcleos e 2G de RAM.


## How to run | Como rodar

With docker installed and within the root of this source code repository, run:

```
docker build -t interpretty .
docker run -it --rm --cpus=2 --memory=2g interpretty
```

--------------------------------------------------------------------------------------------

Com o docker instalado e estando na raiz do repositório, execute:

```
docker build -t interpretty .
docker run -it --rm --cpus=2 --memory=2g interpretty
```

![Captura de tela de 2023-09-28 16-49-08](https://github.com/marianasmmattos/interpretty/assets/66320795/a8ef318c-6259-4ec7-969f-7f28b3b47685)


## Useful links | Links úteis

- [Crafting Interpreters](https://craftinginterpreters.com)
- [So you want to write an interpreter?](https://www.youtube.com/watch?v=LCslqgM48D4)
- [Let’s Build A Simple Interpreter. Part 1.](https://ruslanspivak.com/lsbasi-part1/)
- [Challenge](https://github.com/aripiprazole/rinha-de-compiler/)
