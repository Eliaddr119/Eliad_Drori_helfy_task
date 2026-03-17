import React, { useState, useEffect, useMemo } from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

function TodoList({ todos, onDelete, onComplete, onUpdate }) {
  const itemsPerView = 3;
  const isCarouselActive = todos.length > itemsPerView;

  const [currentIndex, setCurrentIndex] = useState(isCarouselActive ? itemsPerView : 0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const displayTodos = useMemo(() => {
    if (!isCarouselActive) return todos
    const startClones = todos.slice(0, itemsPerView)
    const endClones = todos.slice(-itemsPerView);
    return [...endClones, ...todos, ...startClones]
  }, [todos, isCarouselActive])

  useEffect(() => {
    if (!isCarouselActive) {
      setCurrentIndex(0);
    } else if (currentIndex === 0) {
      setCurrentIndex(itemsPerView);
    }
  }, [isCarouselActive, currentIndex]);

  const handleTransitionEnd = () => {
    if (!isCarouselActive) return;

    if (currentIndex >= displayTodos.length - itemsPerView) {
      setIsTransitioning(false);
      setCurrentIndex(itemsPerView);
    } else if (currentIndex < itemsPerView) {
      setIsTransitioning(false);
      setCurrentIndex(displayTodos.length - itemsPerView * 2)
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning && isCarouselActive) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning && isCarouselActive) setCurrentIndex((prev) => prev - 1);
  };

  if (todos.length === 0) return <div className="empty-state">Your list is empty</div>;

  return (
    <div className={`carousel-container ${!isCarouselActive ? "static-view" : ""}`}>
      {isCarouselActive && <button className="nav-btn" onClick={prevSlide}>‹</button>}

      <div className="carousel-window">
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: isCarouselActive 
              ? `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
              : "none",
            transition: isTransitioning && isCarouselActive ? "transform 0.4s ease-in-out" : "none",
            display: "flex",
          }}
        >
          {displayTodos.map((todo, index) => (
            <div 
              className="carousel-slide" 
              key={`${todo.id}-${index}`}
              style={{ flex: `0 0 ${100 / itemsPerView}%` }} 
            >
              <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} onComplete={onComplete} />
            </div>
          ))}
        </div>
      </div>

      {isCarouselActive && <button className="nav-btn" onClick={nextSlide}>›</button>}
    </div>
  );
}

export default TodoList;