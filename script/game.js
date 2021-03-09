let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id) [0];
        console.log(card);
        
        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    checkGameOver() {
       return this.cards.filter(card => !card.flipped).length === 0;
    },



    cards: null,

    createCardsFromTechs: function() {
        this.cards = [];

        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromTechs(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);        
        this.shuffleCards();
        return this.cards;
    },

    createPairFromTechs: function(tech) {
        return [{
            id: this.createIdWithTechs(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTechs(tech),
            icon: tech,
            flipped: false,
        }]
    },

    createIdWithTechs: function(tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
}
}