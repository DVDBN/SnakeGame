class Food {
    constructor(width = 500, height = 500, size = 10) {
        this.size = size;
        this.regenerate(width, height);
    }

    // Méthode privée pour générer une position valide
    #randomPosition(dimension) {
        return Math.floor(Math.random() * (dimension / this.size)) * this.size;
    }

    // Génère une nouvelle position pour la nourriture
    regenerate(width, height) {
        this.body = [{ 
            x: this.#randomPosition(width), 
            y: this.#randomPosition(height) 
        }];
    }

    // Retourner la position de la nourriture
    getBody() {
        return this.body;
    }
}

export default Food;
