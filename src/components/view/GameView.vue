<template>
  <div class="slider-navigator"> 
    <button class="btn-seta btn-voltar" @click="previousCard">
      <img src="/images/seta.png" alt="seta voltar" />
    </button>

    <div class="card-wrapper">
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
.slider-navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  isolation: isolate;
}

/* Container do card */
.card-wrapper {
  flex: 1 1 320px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 320px;
}

/* Botões de navegação */
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

/* Layout para mobile */
@media (max-width: 768px) {
  .slider-navigator {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .card-wrapper {
    width: 100%;
    max-width: 320px;
  }

  .btn-seta {
    width: 60px;
    height: 60px;
    position: static;
  }

  .btn-seta img {
    width: 30px;
    height: 30px;
  }

  .btn-voltar,
  .btn-avancar {
    margin: 0 10px;
  }

  .btn-voltar {
    order: 1;
  }

  .btn-avancar {
    order: 2;
  }
}
</style>