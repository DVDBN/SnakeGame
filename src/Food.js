class Food {
    constructor(height = 500, width = 500, size = 10){
        this.body = [
            {
                x : Math.min(Math.floor(Math.random() * (height / size)) * size + size),
                y : Math.min(Math.floor(Math.random() * (width / size)) * size + size)
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