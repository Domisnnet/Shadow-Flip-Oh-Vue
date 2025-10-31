import { defineStore } from 'pinia';
import { RAW_CARD_DATA } from '../data/rawCardData';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const useGameStore = defineStore('game', {
    state: () => ({
        cards: [], 
        flipCardIds: [], 
        score: 0,
        isGameActive: false,
        moves: 0,
        currentCardIndex: 0,
    }),

    getters: {
        canFlipCard: (state) => state.flipCardIds.length < 2 && state.isGameActive,
        isGameOver: (state) => state.cards.length > 0 && state.cards.every(c => c.isMatched),
        
        currentCard(state) {
            const card = state.cards[state.currentCardIndex];
            if (!card) {
                return null;
            }
            
            const contentUrl = `${import.meta.env.BASE_URL}images/${card.imagem}`;
            
            return {
                ...card,
                cardId: card.id,
                cardState: card.isFlipped ? 'flipped' : (card.isMatched ? 'matched' : 'default'), 
                fundo: card.fundo,
                contentUrl: contentUrl,
                alt: card.alt 
            };
        }
    },

    actions: {
        initializeGame() {
            this.isGameActive = false;
            this.flipCardIds = [];
            this.score = 0;
            this.moves = 0;
            this.currentCardIndex = 0;
            
            let baseCards = [];
            let uniqueIdCounter = 0;

            RAW_CARD_DATA.forEach(data => {
                for (let i = 0; i < 2; i++) {
                    baseCards.push({ 
                        id: uniqueIdCounter++, 
                        ...data,
                        isFlipped: false, 
                        isMatched: false 
                    });
                }
            });

            this.cards = shuffleArray(baseCards);
            this.isGameActive = true;
        },

        flipCard(cardId) {
             if (!this.isGameActive || !this.canFlipCard) return;

             const card = this.cards.find(c => c.id === cardId);
             if (!card || card.isFlipped || card.isMatched) return;

             card.isFlipped = true; 
             this.flipCardIds.push(cardId);

             if (this.flipCardIds.length === 2) {
                 this.moves++;
                 setTimeout(() => this.checkForMatch(), 1000); 
             }
        },

        checkForMatch() {
             const [id1, id2] = this.flipCardIds;
             const card1 = this.cards.find(c => c.id === id1);
             const card2 = this.cards.find(c => c.id === id2);

             if (card1 && card2 && card1.pairValue === card2.pairValue) {
                 card1.isMatched = true;
                 card2.isMatched = true;
                 this.score += 10; 
             } else {
                 if (card1) card1.isFlipped = false;
                 if (card2) card2.isFlipped = false;
             }
             
             this.flipCardIds = [];

             if (this.isGameOver) {
                 this.isGameActive = false;
                 alert(`Fim de Jogo! Pontuação: ${this.score}. Movimentos: ${this.moves}.`);
             }
        },

        nextCard() {
            if (this.currentCardIndex < this.cards.length - 1) {
                this.currentCardIndex++;
            } else {
                this.currentCardIndex = 0;
            }
        },
        previousCard() {
            if (this.currentCardIndex > 0) {
                this.currentCardIndex--;
            } else {
                this.currentCardIndex = this.cards.length - 1;
            }
        }
    }
});