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
import FlipCard from '../game/FlipCard.vue';
import { useGameStore } from '../stores/game.js';

const gameStore = useGameStore();

onMounted(() => {
  gameStore.initializeGame();
});

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
/* ESTILOS DESKTOP */
.slider-navigator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 40px 20px;
}

.botoes-mobile {
  /* No desktop, o conteúdo é "espalhado" para que os botões pareçam filhos diretos */
  display: contents; 
}

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

/* ESTILOS MOBILE */
@media (max-width: 768px) {
  .slider-navigator {
    flex-direction: column;
    align-items: center;
    /* Espaçamento corrigido entre Carta e Botões */
    gap: 40px; 
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 10px;
  }
  
  .botoes-mobile {
    /* Força o alinhamento horizontal dos botões */
    display: flex !important; 
    flex-direction: row !important; 
    justify-content: space-around; 
    align-items: center;
    width: 100%;
    max-width: 300px; 
    /* Coloca o grupo de botões abaixo da carta */
    order: 2; 
  }

  .slider-navigator > .FlipCard { 
      order: 1; 
  }

  /* Neutralização do CSS Global (position: absolute) */
  .slider-navigator .btn-seta { 
    display: flex !important;
    position: static !important;
    
    width: 60px;
    height: 60px;
    margin: 0; 
    flex-shrink: 0;
  }

  .btn-seta img {
    width: 30px;
    height: 30px;
  }
}
</style>