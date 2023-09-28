## Sumário | Summary

- [About | Sobre](#about-sobre)
- [How to run | Como rodar](#how-to-run-como-rodar)
- [Technical explanation | Abordagem técnica](#technical-explanation-abordagem-tecnica)
- [Useful Links | Links Úteis](#useful-links-links-uteis)

## About | Sobre

The current code is an implementation for the challenge proposed [here](https://github.com/aripiprazole/rinha-de-compiler/).

The original code gave an AST from a custom programming language (`.rinha`), and we're challenged to make an interpreter or compiler, being able to run in a docker image with max 2gb ram 2 cpu.

I decided to make using javascript. Sadly, the challenge was over when I discovered it. But loved anyway, so here it it

--------------------------------------------------------------------------------------------

O código desse repositório veio como realização do desafio proposto [aqui](https://github.com/aripiprazole/rinha-de-compiler/).

Para o desafio, foi dada a AST de uma linguagem custom (`.rinha`) e o objetivo era fazer um interpretador ou compilador rodando em docker com 2 núcleos e 2G de RAM.

Optei por fazer uma versão de interpretador em javascript. O desafio já tinha encerrado quando descori o repositório, mas gostei muito da ideia. Então cá está

## Technical explanation | Abordagem técnica

I choosed to implement the most "robust" form first, considering a readable representation of what's the data flow and focused on modular and composable software. It worked, after all. So then, I started trying to change my approach step by step, giving hand of some of those concerns. The main proposal of the challange was to have a great performance, but I wanted to benchmark it to see how bad the code has to look for relevant performance improvements. Thats why we have a benchmark for each approach I applied. I recognize, by the way, that when we talk about transpilers, compilers and interpreters, things that happen behind the scenes with a user-friendly api, performance is way more relevant, pays off.

--------------------------------------------------------------------------------------------

Optei por escrever primeiro o software mais "robusto", considerando detalhes como legibilidade, fluxo de dados e implementação modular/composable. Apesar de não ter me preocupado com performance de primeira, rodou. Então, comecei a tentar mudar minha abordagem pouco a pouco, abrindo mão de alguns desses conceitos e preocupações. O objetivo do desafio é se preocupar com uma boa performance, mas preferi optar por fazer o benchmark entre as implementações para ganhar visibilidade do quão "feio" o código precisa ficar pra que essas diferenças sejam relevantes. Por isso, temos o benchmark para cada uma das implementações que eu fiz. Apesar disso, entendo que quando o assunto são interpretadores, transpiladores, compiladores e qualquer coisa que aconteça por debaixo de uma api user-friendly, a performance se torna bem mais relevante e vale o tradeoff.

## How to run | Como rodar

With docker installed and within the root of this source code repository, run:

```
docker build -t interpretty .
docker run -it --rm --cpus=2 --memory=2g interpretty
```

It'll show you a benchmark for current implemented versions, be free to suggest new ones

--------------------------------------------------------------------------------------------

Com o docker instalado e estando na raiz do repositório, execute:

```
docker build -t interpretty .
docker run -it --rm --cpus=2 --memory=2g interpretty
```

O container irá mostrar o resultado do benchmark de todas as implementações feitas no repositório, sinta-se a vontade para sugerir mais


## Useful links | Links úteis

- [Crafting Interpreters](https://craftinginterpreters.com)
- [So you want to write an interpreter?](https://www.youtube.com/watch?v=LCslqgM48D4)
- [Let’s Build A Simple Interpreter. Part 1.](https://ruslanspivak.com/lsbasi-part1/)
- [Challenge](https://github.com/aripiprazole/rinha-de-compiler/)
