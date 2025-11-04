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

## Gerenciamento de Múltiplos Deploys

O projeto está configurado para ser publicado em dois ambientes de hospedagem distintos: **GitHub Pages** e **Firebase Hosting**. Cada ambiente exige uma configuração de build específica no arquivo `vite.config.ts`, controlada pela propriedade `base`.

-   **GitHub Pages**: Como o site é servido a partir de um subdiretório (ex: `usuario.github.io/repositorio/`), a configuração `base` deve ser definida como o nome do repositório: `base: '/Shadow-Flip-Oh-Vue/'`.
-   **Firebase Hosting**: Como o site é servido a partir da raiz do domínio (ex: `projeto.web.app`), a configuração `base` deve ser comentada ou removida para usar o valor padrão (`'/'`).

**Importante**: Antes de gerar o build da aplicação (`npm run build`), é essencial verificar e ajustar a propriedade `base` no arquivo `vite.config.ts` de acordo com a plataforma de destino.

## Deploy no GitHub Pages (Executado)

Para publicar a aplicação na web, foi implementado um fluxo de deploy contínuo para o GitHub Pages.

**Passos Executados:**

1.  **Criação do Script de Deploy (`deploy.sh`)**: Foi criado um script shell para automatizar o processo. O script executa as seguintes tarefas:
    - Limpa o diretório de build antigo (`dist`).
    - Executa o build da aplicação (`npm run build`).
    - Navega para o diretório `dist`, inicializa um repositório Git local, e envia (`push`) o conteúdo para a branch `gh-pages` do repositório remoto.
2.  **Configuração da Chave SSH**: Para permitir que o ambiente de desenvolvimento enviasse o código para o GitHub de forma segura e automatizada, uma chave SSH foi gerada e adicionada às configurações do repositório no GitHub.
3.  **Ajuste da Configuração do Vite**: O arquivo `vite.config.ts` foi modificado para incluir a propriedade `base: '/Shadow-Flip-Oh-Vue/'`. Este passo foi crucial para garantir que todos os caminhos para os assets (JavaScript, CSS, imagens) fossem gerados corretamente, considerando que o site seria servido a partir de um subdireitório.
4.  **Configuração do GitHub Pages**: Nas configurações do repositório, o GitHub Pages foi configurado para usar a branch `gh-pages` como fonte e a pasta `/(root)` como o diretório de publicação.

**Resultado Final:**

A aplicação foi publicada com sucesso e está disponível publicamente na web através do GitHub Pages.

- **URL do Site**: [https://domisnnet.github.io/Shadow-Flip-Oh-Vue/](https://domisnnet.github.io/Shadow-Flip-Oh-Vue/)

## Deploy no Firebase Hosting (Executado)

Como alternativa ao GitHub Pages, a aplicação também foi publicada no Firebase Hosting, uma plataforma de hospedagem de alta performance do Google.

**Passos Executados:**

1.  **Ajuste da Configuração do Vite**: A propriedade `base` no arquivo `vite.config.ts` foi comentada. Isso garante que os caminhos para os assets sejam relativos à raiz do domínio, que é o padrão do Firebase Hosting.
2.  **Build da Aplicação**: O comando `npm run build` foi executado para gerar uma nova versão da pasta `dist` com os caminhos corretos.
3.  **Deploy no Firebase**: Utilizando a ferramenta de deploy, o conteúdo da pasta `dist` foi enviado para o Firebase Hosting.

**Resultado Final:**

A aplicação foi publicada com sucesso e está disponível publicamente na web através do Firebase Hosting.

- **URL do Site**: [https://shadow-flip-oh-86570817-f8cc4.web.app/](https://shadow-flip-oh-86570817-f8cc4.web.app/)
