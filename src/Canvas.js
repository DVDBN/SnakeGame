import React, { useEffect, useRef, useState } from 'react';
import Snake from './Snake';  // Assure-toi que la classe Snake est bien importée
import Food from './Food';

const Canvas = () => {
    const canvasSize = 500
    const entitySize = 25

    const canvasRef = useRef(null);
    const [snake,setSnake] = useState(new Snake(Math.round(canvasSize/2), Math.round(canvasSize/2),entitySize)) // Créer une instance du serpent à une position donnée
    const [direction, setDirection] = useState('right'); // Initialiser la direction du serpent
    const [food,setFood] = useState(new Food(canvasSize, canvasSize,entitySize))


    useEffect(() => {
        const interval = setInterval(() => {
            const newSnake = new Snake(snake.body[0].x, snake.body[0].y, entitySize);  // Créer une nouvelle instance du serpent avec la taille correcte
          newSnake.body = [...snake.getBody()]; // Copier l'état actuel du serpent
          newSnake.move(direction); // Déplacer le serpent
          setSnake(newSnake); // Mettre à jour le serpent
        }, 100);
    
        return () => clearInterval(interval);
    }, [snake, direction]);

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowUp') setDirection('up');
        if (e.key === 'ArrowDown') setDirection('down');
        if (e.key === 'ArrowLeft') setDirection('left');
        if (e.key === 'ArrowRight') setDirection('right');
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawSnake = () => {

        context.fillStyle = 'green';  // Définir la couleur du serpent

        // Dessiner chaque segment du serpent
        snake.body.forEach(segment => {
        context.fillRect(segment.x, segment.y, entitySize, entitySize);  // Dessiner chaque segment comme un carré de 10x10 pixels
        });
    };

    const drawFood = () => {
        context.fillStyle = 'red';  // Définir la couleur du serpent
        // Dessiner chaque segment du serpent
        food.body.forEach(segment => {
            context.fillRect(segment.x, segment.y, entitySize, entitySize);  // Dessiner chaque segment comme un carré de 10x10 pixels
    });

    }

    const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);  // Effacer le canevas à chaque redessin
        drawFood();  // Dessiner food
        drawSnake();  // Dessiner le serpent au chargement
    }

    draw();

    }, [snake]);


  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default Canvas;
