<template>
    <div class="slider-navigator"> 
      
      <button class="btn-seta btn-voltar" @click="previousCard">
        <img src="/images/seta.png" alt="seta voltar" />
      </button>
  
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
      </FlipCard>/>
  
      <button class="btn-seta btn-avancar" @click="nextCard">
        <img src="/images/seta.png" alt="seta avançar" />
      </button>
      
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'; 
  import FlipCard from '../game/FlipCard.vue'; 
  import { useGameStore } from '../stores/game.js';
  
  const gameStore = useGameStore();
  
  // Inicializa o jogo quando o componente é montado
  onMounted(() => {
    gameStore.initializeGame();
  });
  
  // Obtém a carta atual da store
  const currentCard = computed(() => gameStore.currentCard);
  
  // Manipulador para o evento de virar a carta
  function handleFlip() {
    gameStore.flipCard(); // Não precisa mais de argumento
  }
  
  // Funções para navegar entre as cartas
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
    filter: invert(1);
  }
  
  .btn-voltar img {
    transform: rotate(180deg);
  }
  
  @media (max-width: 768px) {
    .slider-navigator {
      gap: 0;
    }
  
    .btn-seta {
      position: absolute;
      width: 50px;
      height: 50px;
    }
  
    .btn-seta img {
        width: 25px;
        height: 25px;
    }
  
    .btn-voltar {
      left: 10px;
    }
  
    .btn-avancar {
      right: 10px;
    }
  }
  </style>