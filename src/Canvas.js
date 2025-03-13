import React, { useEffect, useRef } from 'react';
import Snake from './Snake';  // Assure-toi que la classe Snake est bien importée

const Canvas = () => {
    const size = 500

    const canvasRef = useRef(null);
    const snake = new Snake(Math.round(size/2), Math.round(size/2)); // Créer une instance du serpent à une position donnée

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
