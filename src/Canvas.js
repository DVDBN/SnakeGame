import React, { useEffect, useRef, useState } from 'react';
import Snake from './Snake';  // Assure-toi que la classe Snake est bien importée

const Canvas = () => {
    const size = 500

    const canvasRef = useRef(null);
    const [snake,setSnake] = useState(new Snake(Math.round(size/2), Math.round(size/2))) // Créer une instance du serpent à une position donnée
    const [direction, setDirection] = useState('right'); // Initialiser la direction du serpent


    useEffect(() => {
        const interval = setInterval(() => {
          const newSnake = new Snake();
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
        context.clearRect(0, 0, canvas.width, canvas.height);  // Effacer le canevas à chaque redessin
        context.fillStyle = 'green';  // Définir la couleur du serpent

        // Dessiner chaque segment du serpent
        snake.body.forEach(segment => {
        context.fillRect(segment.x, segment.y, 10, 10);  // Dessiner chaque segment comme un carré de 10x10 pixels
        });
    };

    drawSnake();  // Dessiner le serpent au chargement

    }, [snake]);


  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default Canvas;
