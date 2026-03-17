import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

function TodoList({ todos, onDelete, onComplete, onUpdate }) {
  const itemsPerView = 3;
  
  const [extendedTodos, setExtendedTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(itemsPerView);
  const [isTransitioning, setIsTransitioning] = useState(true);


  useEffect(() => {
    if (todos.length > 0) {
      const startClones = todos.slice(0, itemsPerView);
      const endClones = todos.slice(-itemsPerView);
      setExtendedTodos([...endClones, ...todos, ...startClones]);
    }
  }, [todos]);


  const handleTransitionEnd = () => {
    if (currentIndex >= extendedTodos.length - itemsPerView) {
      setIsTransitioning(false); 
      setCurrentIndex(itemsPerView);
    } else if (currentIndex < itemsPerView) {
      setIsTransitioning(false); 
      setCurrentIndex(extendedTodos.length - (itemsPerView * 2)); 
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 10);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) setCurrentIndex((prev) => prev - 1);
  };

  if (todos.length === 0) return <div className="empty-state">Your list is empty</div>;

  return (
    <div className="carousel-container">
      <button className="nav-btn" onClick={prevSlide}>‹</button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: isTransitioning ? "transform 0.4s ease-in-out" : "none",
          }}
        >
          {extendedTodos.map((todo, index) => (
            <div className="carousel-slide" key={`${todo.id}-${index}`}>
              <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} onComplete={onComplete} />
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn" onClick={nextSlide}>›</button>
    </div>
  );
}

export default TodoList;