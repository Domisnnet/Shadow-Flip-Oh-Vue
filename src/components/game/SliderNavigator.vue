<template>
  <div class="slider-navigator"> 
    
    <div class="botoes-mobile"> 
      <button class="btn-seta btn-voltar" @click="previousCard">
        <img src="/images/seta.png" alt="seta voltar" />
      </button>

      <button class="btn-seta btn-avancar" @click="nextCard">
        <img src="/images/seta.png" alt="seta avançar" />
      </button>
    </div>

    <FlipCard 
      v-if="currentCard"
      :fundo="currentCard.fundo"
      :card-state="currentCard.cardState"
      :content-url="currentCard.contentUrl" 
      :alt="currentCard.alt"
      :nivel="currentCard.nivel"
      :descricao="currentCard.descricao"
      :atk="currentCard.atk"
      :def="currentCard.def"
      @click-event="handleFlip" 
    />

  </div>
</template>
  
<script setup>
  import { computed, onMounted } from 'vue'; 
  import FlipCard from '../game/FlipCard.vue'; // Certifique-se de que o caminho está correto
  import { useGameStore } from '../stores/game.js'; // Certifique-se de que o caminho está correto
  
  const gameStore = useGameStore();
  
  onMounted(() => {
    // Inicializa o jogo, geralmente carregando a lista completa de cartas
    gameStore.initializeGame();
  });
  
  // A computed property reage a mudanças no estado do store
  const currentCard = computed(() => gameStore.currentCard);
  
  function handleFlip() {
    gameStore.flipCard();
  }
  
  function nextCard() {
    gameStore.nextCard();
  }
  
  function previousCard() {
    gameStore.previousCard();
  }
</script>
  
<style scoped>
  /* Layout padrão para desktop e tablet */
  .slider-navigator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px; /* Grande espaçamento no desktop/tablet */
    padding: 40px 20px;
  }
  
  /* NOVO: Garante que o contêiner de botões não interfira no layout de desktop */
  .botoes-mobile {
    /* No layout padrão, os botões são tratados separadamente. 
       Isso garante que o contêiner não crie seu próprio bloco de layout. */
    display: contents; 
  }
  
  /* Botões de navegação (Estilos comuns) */
  .btn-seta {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-color: rgba(0, 240, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 0 3px rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 100;
  }
  
  .btn-seta:hover {
    background-color: rgba(0, 240, 255, 0.7);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.8), inset 0 0 0 3px rgba(255, 255, 255, 1);
  }
  
  .btn-seta img {
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease-in-out;
    filter: invert(1);
  }
  
  .btn-voltar img {
    transform: rotate(180deg);
  }
  
  /* Layout para mobile (max-width: 768px) */
  @media (max-width: 768px) {
  .slider-navigator {
    flex-direction: column; /* Continua empilhando o grupo de botões E a Carta */
    align-items: center;
    gap: 20px;
    padding: 20px 10px;
  }
  
  /* ESTA É A CORREÇÃO: Força os botões ficarem lado a lado */
  .botoes-mobile {
    display: flex; /* CRUCIAL: Ativa o Flexbox para os filhos */
    flex-direction: row; /* CRUCIAL: Alinha os itens em linha (lado a lado) */
    justify-content: center; /* Centraliza os dois botões no espaço */
    align-items: center;
    width: 100%;
    max-width: 300px; /* Limita a largura dos botões, alinhando com a carta */
    order: 2; /* Coloca o grupo de botões abaixo da carta */
    gap: 50px; /* Adiciona um espaço fixo entre os dois botões */
  }

  /* Ajusta o FlipCard para ser o primeiro item (o card) */
  .slider-navigator > .FlipCard { 
    order: 1; 
  }

  /* Redimensiona e ajusta os botões no mobile */
  .btn-seta {
    /* Reduz o tamanho e garante que não haja margens conflitantes */
    width: 60px;
    height: 60px;
    position: static;
    margin: 0; /* Remove qualquer margem externa desnecessária */
  }

  .btn-seta img {
    width: 30px;
    height: 30px;
  }
}
</style>