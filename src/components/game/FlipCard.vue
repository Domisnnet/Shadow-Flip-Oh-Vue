<template>
  <div class="flipcard" @click="handleClick">
    <div class="flipcard__inner" :class="{ 'flipped': cardState === 'flipped' }">
      <div class="flipcard__face flipcard__back"></div>

      <div class="flipcard__face flipcard__front" :class="fundo">
        <h2 class="flipcard__title">{{ alt }}</h2>

        <div class="flipcard__level">
          <span v-for="star in nivel" :key="star">⭐</span>
        </div>

        <img :src="contentUrl" :alt="alt" class="flipcard__image" />

        <div class="flipcard__info">
          <div class="flipcard__description">{{ descricao }}</div>
          <div class="flipcard__stats">
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
.flipcard {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 3 / 5;
  perspective: 1000px;
  cursor: pointer;
}

.flipcard__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flipcard__inner.flipped {
  transform: rotateY(180deg);
}

.flipcard__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
}

.flipcard__back {
  background-image: url("/images/fundo-carta.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotateY(180deg) scale(1.4);
}

.flipcard__front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}

.flipcard__title {
  font-size: 13px;
  padding: 5px;
  text-transform: uppercase;
  background: radial-gradient(circle, #f3e2c8, #e4cfa5, #c4a57a);
  border: 1px solid #a67c52;
  border-radius: 8px;
  color: #000;
  margin-bottom: 5px;
  text-align: center;
}

.flipcard__level {
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  margin-right: 10px;
}

.flipcard__image {
  width: 100%;
  height: auto;
  max-height: 35%;
  object-fit: contain;
  border: 4px solid #a67c52;
  border-radius: 8px;
  display: block;
}

.flipcard__info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-radius: 8px;
  color: #000;
  background: radial-gradient(circle, #f3e2c8, #e4cfa5, #c4a57a);
  border: 2px solid #a67c52;
  text-align: left;
  line-height: 1.5;
  padding: 5px;
}

.flipcard__description {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  font-size: 13px;
  line-height: 1.4;
  border-bottom: 1px solid #000;
  white-space: normal;
  overflow-wrap: break-word;
}

.flipcard__stats {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: bold;
}

.flipcard__description::-webkit-scrollbar {
  width: 8px;
}

.flipcard__description::-webkit-scrollbar-thumb {
  background: #c08057;
  border-radius: 10px;
}

/* Fundos dinâmicos */
.fundo-1 { background-image: url(/images/fundo-1.jpg); }
.fundo-2 { background-image: url(/images/fundo-2.jpg); }
.fundo-3 { background-image: url(/images/fundo-3.jpg); }
.fundo-4 { background-image: url(/images/fundo-4.jpg); }
.fundo-5 { background-image: url(/images/fundo-5.jpg); }
.fundo-6 { background-image: url(/images/fundo-6.jpg); }
.fundo-7 { background-image: url(/images/fundo-7.jpg); }

/* Responsividade */
@media (max-width: 768px) {
  .flipcard {
    max-width: 100%;
  }

  .flipcard__image {
    max-height: 180px;
  }

  .flipcard__description {
    font-size: 12px;
  }

  .flipcard__stats {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .flipcard__title {
    font-size: 12px;
  }

  .flipcard__description {
    font-size: 11px;
  }

  .flipcard__stats {
    font-size: 11px;
  }
}
</style>