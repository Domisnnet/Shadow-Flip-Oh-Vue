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
    />

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
/* Layout padrão para desktop e tablet (Horizontal: Botão | Carta | Botão) */
.slider-navigator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 40px 20px;
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
    /* MUDANÇA ESSENCIAL: Permite que os itens envolvam (wrap) */
    flex-wrap: wrap; 
    
    /* MUDANÇA ESSENCIAL: Permite que os itens fiquem alinhados */
    justify-content: space-around; 
    
    /* Ajusta o alinhamento central */
    align-items: center;
    
    /* Força a largura para 100% para que os botões envolvam a carta */
    width: 100%; 
    padding: 20px 10px;
    gap: 0; /* Remove o gap de 100px do desktop */
  }
  
  /* Faz o contêiner da carta ocupar toda a largura e ficar no centro */
  .slider-navigator > .FlipCard { 
    width: 100%;
    max-width: 300px;
    order: 2; /* Coloca a carta na segunda linha */
    margin: 20px 0; /* Espaço acima e abaixo da carta */
  }

  /* Faz os botões ficarem lado a lado na primeira linha */
  .btn-seta {
    width: 60px;
    height: 60px;
    order: 1; /* Coloca os botões na primeira linha */
    margin: 0 10px; /* Adiciona espaço entre eles, centralizado */
  }

  /* Ajusta o posicionamento do botão de avançar para a direita */
  .btn-avancar {
    margin-left: auto; /* Empurra para a direita se precisar de espaço */
  }
}
</style>