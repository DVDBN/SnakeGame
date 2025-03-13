class Food {
    constructor(width = 500, height = 500, size = 10) {
        this.size = size;
        this.body = [
            {
                x: this.#randomPosition(width),  // Position x
                y: this.#randomPosition(height),  // Position y
            }
        ];
    }

    // Méthode privée pour générer une position valide pour la nourriture (en fonction de width ou height)
    #randomPosition(dimension) {
        // Calculer une position aléatoire multiple de `size`
        return Math.floor(Math.random() * (Math.floor(dimension / this.size))) * this.size;
    }

    // Retourner les coordonnées de la nourriture
    getBody() {
        return this.body;
    }

    // Méthode pour régénérer la nourriture avec des coordonnées valides et multiples de 'size'
    regenerate(width, height) {
        this.body[0].x = this.#randomPosition(width);  // Générer une nouvelle position x
        this.body[0].y = this.#randomPosition(height);  // Générer une nouvelle position y
    }
}

export default Food;
