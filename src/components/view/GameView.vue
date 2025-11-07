<template>
  <div class="slider-navigator"> 
    
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

    <div class="botoes-mobile">
      <button class="btn-seta btn-voltar" @click="previousCard">
        <img src="/images/seta.png" alt="seta voltar" />
      </button>

      <button class="btn-seta btn-avancar" @click="nextCard">
        <img src="/images/seta.png" alt="seta avançar" />
      </button>
    </div>
    
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
/* ESTILOS DESKTOP/PADRÃO */
.slider-navigator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px; 
  padding: 40px 20px;
}

@media (min-width: 769px) {
  .botoes-mobile {
    display: contents; 
  }
}

/* Botões de navegação (Estilos gerais) */
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

/* MOBILE */
@media (max-width: 768px) {
  .slider-navigator {
    flex-direction: column;
    align-items: center;
    gap: 40px; 
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 10px;
  }
  
  .botoes-mobile {
    display: flex; 
    flex-direction: row; 
    justify-content: space-around; 
    align-items: center;
    width: 100%;
    max-width: 300px;
    order: 2; 
  }

  .slider-navigator > .FlipCard { 
      order: 1; 
  }

  .btn-seta {
    width: 60px;
    height: 60px;
    position: static !important; 
    margin: 0; 
  }

  .btn-seta img {
    width: 30px;
    height: 30px;
  }
}
</style>