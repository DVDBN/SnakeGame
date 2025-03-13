class Snake {
    constructor(startX = 0, startY = 0, size = 10){
        this.body = [
            {x : startX, y : startY},
        ]
        this.size = size
    }

    // Déplacer le serpent
    move(direction) {
        const head = this.body[0];
        let newHead;

        // Calculer la nouvelle tête du serpent en fonction de la direction
        if (direction === 'up') {
            newHead = { x: head.x, y: head.y - this.size }; // Déplacement vers le haut
            console.log(this.size)
        } else if (direction === 'down') {
            newHead = { x: head.x, y: head.y + this.size }; // Déplacement vers le bas
        } else if (direction === 'left') {
            newHead = { x: head.x - this.size, y: head.y }; // Déplacement vers la gauche
        } else if (direction === 'right') {
            newHead = { x: head.x + this.size, y: head.y }; // Déplacement vers la droite
        }

        // Déplacer le serpent : ajouter une nouvelle tête et retirer la dernière partie
        this.body.unshift(newHead); // Ajoute la nouvelle tête au début du tableau
        this.body.pop(); // Supprime la dernière partie du serpent
    }

    // Retourner les coordonnées du serpent
    getBody() {
        return this.body;
    }
}


export default Snake;