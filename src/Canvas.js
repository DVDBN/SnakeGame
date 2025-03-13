import React from 'react';

const Canvas = () => {
  return (
    <div className="canvas-container">
      <canvas
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default Canvas;
