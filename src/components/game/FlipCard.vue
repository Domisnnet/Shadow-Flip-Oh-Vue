<template>
  <div 
    class="card-container" 
    @click="handleClick"
  >
    <div 
      class="card-inner" 
      :class="{ 'flipped': cardState === 'flipped' }"
    >
      <!-- Verso do Card (Padrão) -->
      <div class="card-face back-face"></div>
      
      <!-- Frente do Card (Conteúdo) -->
      <div class="card-face front-face" :class="fundo">
        <h2 class="card-title">{{ alt }}</h2>
        
        <div class="card-level">
          <span v-for="star in nivel" :key="star" class="estrela">⭐</span>
        </div>

        <img :src="contentUrl" :alt="alt" class="card-image"/>
        
        <div class="informacoes">
          <div class="descricao">{{ descricao }}</div>
          <div class="stats">
            <span>ATK/ {{ atk }}</span>
            <span>DEF/ {{ def }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fundo: String,         
  cardState: String,     
  contentUrl: String,   
  alt: String,
  nivel: Number,
  descricao: String,
  atk: Number,
  def: Number
});

const emit = defineEmits(['click-event']);

function handleClick() {
  emit('click-event');
}
</script>

<style scoped>
.card-container {
  width: 300px;
  height: 500px;
  perspective: 1000px; 
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; 
  border-radius: 10px;
  overflow: hidden;
}

.back-face {
  background-image: url("/images/fundo-carta.jpg");
  background-size: contain; 
  background-repeat: no-repeat; 
  background-position: center; 
  transform: rotateY(180deg) scale(1.4);
}

.front-face {
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.card-title {
  font-size: 13px;
  padding: 5px;
  text-transform: uppercase;
  background: radial-gradient(circle, #f3e2c8, #e4cfa5, #c4a57a);
  border: 1px solid #a67c52;
  border-radius: 8px;
  color: #000;
  margin: 0 0 5px 0;
  text-align: center;
}

.card-level {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  margin-right: 10px;
}

.estrela {
  font-size: 16px;
}

.card-image {
  width: 100%;
  max-width: 260px;
  align-self: center;
  border: 4px solid #a67c52;
  border-radius: 8px;
  display: block;
}

.informacoes {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 160px;
  overflow: hidden;
  margin-top: 5px;
  border-radius: 8px;
  color: #000;
  background: radial-gradient(circle, #f3e2c8, #e4cfa5, #c4a57a);
  border: 2px solid #a67c52;
  text-align: left;
  line-height: 1.5;
  padding: 5px;
}

.descricao {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  font-size: 13px;
  border-bottom: 1px solid #000;
}

.stats {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: bold;
}

.descricao::-webkit-scrollbar {
  width: 8px;
}

.descricao::-webkit-scrollbar-thumb {
  background: #c08057;
  border-radius: 10px;
}

.fundo-1 { background-image: url(/images/fundo-1.jpg); }
.fundo-2 { background-image: url(/images/fundo-2.jpg); }
.fundo-3 { background-image: url(/images/fundo-3.jpg); }
.fundo-4 { background-image: url(/images/fundo-4.jpg); }
.fundo-5 { background-image: url(/images/fundo-5.jpg); }
.fundo-6 { background-image: url(/images/fundo-6.jpg); }
.fundo-7 { background-image: url(/images/fundo-7.jpg); }
</style>