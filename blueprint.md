# Blueprint do Projeto: Carrossel de Cartas Colecionáveis

## Visão Geral

Este projeto é uma aplicação web interativa que funciona como um carrossel (ou slider) para exibir uma coleção de cartas de jogo. Desenvolvido com Vue.js 3, utiliza Pinia para um gerenciamento de estado simplificado e Vue Router. A interface permite que o usuário navegue por um baralho de cartas, uma por vez, e as vire para ver o verso. O estado de virada de cada carta é persistente, ou seja, uma carta permanece virada mesmo após o usuário navegar para outras cartas e voltar.

## Funcionalidades e Design

### Estrutura do Projeto

- **`main.ts`**: Ponto de entrada que inicializa o Vue, Pinia e o Vue Router.
- **`App.vue`**: Componente raiz que usa `<router-view />` para renderizar a rota ativa.
- **`components/`**: Diretório principal dos componentes.
  - **`router/index.js`**: Define a rota principal (`/`) que aponta para o `GameView`.
  - **`view/GameView.vue`**: O coração da interface. Exibe a carta atual e os botões de navegação do carrossel.
  - **`game/FlipCard.vue`**: Componente reutilizável que representa uma única carta. Contém a lógica para a animação de virada horizontal.
  - **`stores/game.js`**: Store do Pinia que gerencia o estado do carrossel, incluindo a lista de cartas, o índice da carta atual e o estado de "virada" (flipped) de cada uma.
  - **`data/rawCardData.js`**: Arquivo de dados que contém as informações de cada carta (nome, imagem, atributos, etc.).

### Design e Estilo

- **Layout**: Um layout de carrossel centralizado com a carta em destaque no meio e setas de navegação nas laterais.
- **Componente de Carta (`FlipCard.vue`)**:
  - **Animação de Virar**: Ao ser clicada, a carta executa uma animação de rotação horizontal (eixo Y) de 180 graus.
  - **Estado Persistente**: O estado de "virado" da carta é mantido. Ela só desvira se o usuário clicar nela novamente.
  - **Verso da Carta**: Mostra uma imagem de fundo padrão (`fundo-carta.jpg`).
  - **Frente da Carta**: Exibe dinamicamente todos os detalhes da carta (nome, nível, imagem, descrição, etc.).
- **Navegação**: Botões de seta estilizados com efeitos de `hover` para uma experiência de usuário rica.
- **Responsividade**: O layout se ajusta a telas mobile, com botões de navegação reposicionados para fácil acesso.

## Plano de Refatoração (Executado)

O objetivo era alinhar a lógica da aplicação com a interface de usuário, transformando-a em um carrossel de cartas funcional e, por fim, garantir que o estado de virada das cartas fosse persistente.

**Passos Executados:**

1.  **Simplificação do `stores/game.js`**: A lógica inicial de "jogo da memória" foi completamente removida e substituída por uma lógica de carrossel simples.
2.  **Ajuste da Interação em `GameView.vue`**: O evento de clique na carta foi simplificado para chamar a ação `flipCard()` sem argumentos.
3.  **Correção da Animação em `FlipCard.vue`**: A animação de virar foi ajustada para ser uma rotação puramente horizontal (`rotateY(180deg)`).
4.  **Implementação do Estado de Giro Persistente**:
    - **Problema**: Ao navegar com as setas, a carta que estava virada era automaticamente desvirada.
    - **Correção**: Removida a lógica das ações `nextCard` e `previousCard` que resetava o estado `isFlipped` da carta. Agora, o estado de virada de cada carta é independente e só é alterado por um clique direto do usuário.

**Resultado:**

A aplicação agora funciona como um carrossel de cartas coeso, onde o estado de virada de cada carta é salvo durante a navegação, proporcionando uma experiência de usuário mais intuitiva e alinhada com o comportamento esperado de uma galeria de cartas.
