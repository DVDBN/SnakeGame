class Food {
    constructor(height = 500, width = 500, size = 10){
        this.body = [
            {
                x: Math.floor(Math.random() * (Math.floor(width / size))) * size,  // Position x
                y: Math.floor(Math.random() * (Math.floor(height / size))) * size,  // Position y
            },
        ]
        this.size = size
    }

    // Retourner les coordonnées du serpent
    getBody() {
        return this.body;
    }
}


export default Food;