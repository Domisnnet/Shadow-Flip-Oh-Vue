<template>
    <div class="game-board-container">
        <FlipCard
            v-for="card in gameStore.cards"
            :key="card.id"
            :card-id="card.id"
            :nome="card.nome"
            :fundo="card.fundo"
            :nivel="card.nivel"
            :content-url="card.imagem"
            :alt="card.alt"
            :descricao="card.descricao"
            :atk="card.atk"
            :def="card.def"
            :is-matched="card.isMatched"
            :card-state="card.cardState"
            @click-event="gameStore.handleCardClick"
        />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGameStore } from '../../stores/game';
import FlipCard from './FlipCard.vue'; 

const gameStore = useGameStore();

onMounted(() => {
    if (gameStore.cards.length === 0) {
        gameStore.initializeGame();
    }
});
</script>

<style scoped>
/* Os estilos (CSS) permanecem inalterados. */

.game-board-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 15px; 
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.4); 
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    margin: 20px auto; 
    max-width: 900px;
}

@media (max-width: 768px) {
    .game-board-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 500px) {
    .game-board-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>