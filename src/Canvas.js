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
    const [gameOver, setGameOver] = useState(false); // État pour suivre la défaite
    const [score, setScore] = useState(0); // Ajout du score

    // Liste des directions enregistrées (queue)
    const inputQueueRef = useRef([]);
    const currentDirectionRef = useRef('right'); // Direction actuelle

    useEffect(() => {
        const interval = setInterval(() => {
            if (!snake.body || snake.body.length === 0 || gameOver) return;

            // Appliquer l'input enregistré, si disponible, sinon continuer la direction actuelle
            const directionToMove = inputQueueRef.current.length > 0 ? inputQueueRef.current.shift() : currentDirectionRef.current;

            const newSnake = new Snake(snake.body[0].x, snake.body[0].y, entitySize);
            newSnake.body = [...snake.getBody()];
            newSnake.move(directionToMove);

            // Vérification de la collision avec soi-même
            if (isCollidingWithSelf(newSnake)) {
                setGameOver(true); // Arrêter le jeu en cas de collision avec soi-même
                return;
            }

            // Vérification si le serpent sort du canvas
            if (isOutOfBounds(newSnake)) {
                setGameOver(true); // Arrêter le jeu si le serpent sort du canvas
                return;
            }

            // Vérifier si le serpent mange la nourriture
            if (newSnake.getBody()[0].x === food.body[0].x && newSnake.getBody()[0].y === food.body[0].y) {
                newSnake.grow();
                setFood(new Food(canvasSize, canvasSize, entitySize)); // Régénérer la nourriture
                setScore(prevScore => prevScore + 100); // Incrémenter le score de 100
            }

            // Mettre à jour le serpent
            setSnake(newSnake);

            // Mettre à jour la direction actuelle
            currentDirectionRef.current = directionToMove;
        }, 100);

        return () => clearInterval(interval); // Nettoyage du setInterval au démontage du composant
    }, [snake, food, gameOver]);

    // Vérification de la collision avec soi-même
    const isCollidingWithSelf = (snake) => {
        const head = snake.getBody()[0];
        for (let i = 1; i < snake.getBody().length; i++) {
            if (snake.getBody()[i].x === head.x && snake.getBody()[i].y === head.y) {
                return true; // Collision avec soi-même
            }
        }
        return false; // Pas de collision
    };

    // Vérification si le serpent sort du canvas
    const isOutOfBounds = (snake) => {
        const head = snake.getBody()[0];
        return head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize;
    };

    const handleKeyPress = (e) => {
        const lastDirection = currentDirectionRef.current; // Direction actuelle

        const newDirection = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
        }[e.key];

        if (!newDirection) return; // Ignorer les touches non valides

        // Empêcher les changements de direction vers l'opposée immédiate
        const oppositeDirection = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
        }[lastDirection];

        // Si la direction n'est pas opposée à la précédente, l'ajouter à la queue d'entrées
        if (newDirection !== oppositeDirection) {
            inputQueueRef.current.push(newDirection);
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
            drawFood();  // Dessiner la nourriture
            drawSnake();  // Dessiner le serpent
        };

        draw(); // Dessiner les éléments après chaque mise à jour
    }, [snake, food]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={canvasSize}
                    height={canvasSize}
                    className="border border-black"
                />
                {gameOver && (
                    <div
                        className="absolute bottom-0 left-0 w-full text-center text-xl text-red-600 bg-black bg-opacity-50 py-2"
                    >
                        Game Over: You collided with yourself or went out of bounds!
                    </div>
                )}
            </div>

            {/* Affichage du score en dehors du canvas */}
            <div className="mt-4 text-xl font-bold text-white bg-black bg-opacity-50 py-2 px-4 rounded-lg">
                Score: {score}
            </div>
        </div>
    );
};

export default Canvas;
