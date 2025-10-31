import { defineStore } from 'pinia';
import { RAW_CARD_DATA } from '../data/rawCardData.js';

export const useGameStore = defineStore('game', {
    state: () => ({
        cards: [],
        currentCardIndex: 0,
    }),

    getters: {
        currentCard(state) {
            const card = state.cards[state.currentCardIndex];
            if (!card) {
                return null;
            }
            
            const contentUrl = `${import.meta.env.BASE_URL}images/${card.imagem}`;
            
            return {
                ...card,
                cardId: card.id,
                cardState: card.isFlipped ? 'flipped' : 'default', 
                contentUrl: contentUrl,
            };
        }
    },

    actions: {
        initializeGame() {
            this.currentCardIndex = 0;
            this.cards = RAW_CARD_DATA.map((cardData, index) => ({
                id: index, 
                ...cardData,
                isFlipped: false, 
            }));
        },

        flipCard() {
            const card = this.cards[this.currentCardIndex];
            if (card) {
                card.isFlipped = !card.isFlipped;
            }
        },

        // Ações para navegar no carrossel (sem resetar o giro)
        nextCard() {
            if (this.currentCardIndex < this.cards.length - 1) {
                this.currentCardIndex++;
            } else {
                this.currentCardIndex = 0; // Volta para o início
            }
        },
        previousCard() {
            if (this.currentCardIndex > 0) {
                this.currentCardIndex--;
            } else {
                this.currentCardIndex = this.cards.length - 1; // Vai para o final
            }
        }
    }
});