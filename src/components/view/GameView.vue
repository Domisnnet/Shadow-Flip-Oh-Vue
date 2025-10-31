<template>
    <div class="slider-navigator"> 
      
      <button class="btn-seta btn-voltar" @click="previousCard">
        <img src="/images/seta.png" alt="seta voltar" />
      </button>
  
      <FlipCard 
        v-if="currentCard"
        :card-id="currentCard.cardId"
        :fundo="currentCard.fundo"
        :is-matched="currentCard.isMatched"
        :card-state="currentCard.cardState"
        :content-url="currentCard.contentUrl" 
        :alt="currentCard.alt"
        :nivel="currentCard.nivel"
        :descricao="currentCard.descricao"
        :atk="currentCard.atk"
        :def="currentCard.def"
        @click-event="handleFlip"
      />
  
      <button class="btn-seta btn-avancar" @click="nextCard">
        <img src="/images/seta.png" alt="seta avançar" />
      </button>
      
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'; 
  import FlipCard from '../components/game/FlipCard.vue'; 
  import { useGameStore } from '../stores/game';
  
  const gameStore = useGameStore();
  
  onMounted(() => {
    gameStore.initializeGame();
  });
  
  const currentCard = computed(() => gameStore.currentCard);
  
  function handleFlip() {
    gameStore.flipCard(currentCard.value.cardId); 
  }
  
  function nextCard() {
    gameStore.nextCard();
  }
  
  function previousCard() {
    gameStore.previousCard();
  }
  </script>
  
  <style scoped>
  /* CONTAINER PRINCIPAL: O SLIDER NAVIGATOR */
  .slider-navigator {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
    gap: 100px; 
    /* Adicionado para ser o contexto de posicionamento no mobile */
    position: relative; 
  }
  
  .btn-seta {
    background-color: rgba(0, 240, 255, 0.2);
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
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
    filter: invert(1); /* Inverte a cor da imagem (preto -> branco) */
  }
  
  .btn-voltar img {
    transform: rotate(180deg);
  }
  
  /* --- ESTILOS RESPONSIVOS PARA AS SETAS --- */
  @media (max-width: 768px) {
    .slider-navigator {
      /* Remove o espaçamento lateral para que a carta possa ocupar mais espaço */
      gap: 0;
    }
  
    .btn-seta {
      /* Posicionamento absoluto para sobrepor a imagem de fundo/carta */
      position: absolute;
      /* Reduz o tamanho das setas em telas menores */
      width: 50px;
      height: 50px;
    }
  
    .btn-seta img {
        width: 25px;
        height: 25px;
    }
  
    .btn-voltar {
      /* Posiciona a seta de voltar à esquerda */
      left: 10px;
    }
  
    .btn-avancar {
      /* Posiciona a seta de avançar à direita */
      right: 10px;
    }
  }
  </style>