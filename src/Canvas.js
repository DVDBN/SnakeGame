import React, { useEffect, useRef, useState } from 'react';
import Snake from './Snake';
import Food from './Food';

const Canvas = () => {
    const canvasSize = 300;
    const entitySize = 10;

    const canvasRef = useRef(null);
    const [snake, setSnake] = useState(
        new Snake(
            Math.round(canvasSize / 2 / entitySize) * entitySize, 
            Math.round(canvasSize / 2 / entitySize) * entitySize, 
            entitySize
        )
    );
    const [food, setFood] = useState(new Food(canvasSize, canvasSize, entitySize));

    // Utilisation de useRef pour éviter les re-renders inutiles
    const directionsRef = useRef(['right']); // Stocke l'historique des directions

    useEffect(() => {
        const interval = setInterval(() => {
            if (!snake.body || snake.body.length === 0) return;

            // Lire et vider la liste des directions
            if (directionsRef.current.length > 1) {
                directionsRef.current = [directionsRef.current[directionsRef.current.length - 1]];
            }

            const currentDirection = directionsRef.current[0]; // Dernière direction valide

            const newSnake = new Snake(snake.body[0].x, snake.body[0].y, entitySize);
            newSnake.body = [...snake.getBody()];
            newSnake.move(currentDirection);

            // Vérifier si le serpent mange la nourriture
            if (newSnake.getBody()[0].x === food.body[0].x && newSnake.getBody()[0].y === food.body[0].y) {
                newSnake.grow();
                setFood(new Food(canvasSize, canvasSize, entitySize));
            }

            setSnake(newSnake);
        }, 100);

        return () => clearInterval(interval);
    }, [snake, food]);

    const handleKeyPress = (e) => {
        const lastDirection = directionsRef.current[directionsRef.current.length - 1];

        const newDirection = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
        }[e.key];

        if (!newDirection) return; // Ignorer les touches non valides

        const oppositeDirection = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
        }[lastDirection];

        if (newDirection !== oppositeDirection) {
            directionsRef.current.push(newDirection);
            if (directionsRef.current.length > 2) {
                directionsRef.current.shift(); // Garder uniquement les 2 dernières directions
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const drawSnake = () => {
            context.fillStyle = 'green';
            snake.body.forEach(segment => {
                context.fillRect(segment.x, segment.y, entitySize, entitySize);
            });
        };

        const drawFood = () => {
            context.fillStyle = 'red';
            food.body.forEach(segment => {
                context.fillRect(segment.x, segment.y, entitySize, entitySize);
            });
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawFood();
            drawSnake();
        };

        draw();
    }, [snake, food]);

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
