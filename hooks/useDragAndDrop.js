import { useState, useCallback, useRef } from 'react';

export const useDragAndDrop = (items, onReorder) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const draggedIndexRef = useRef(null);

  const handleDragStart = useCallback((e, index) => {
    draggedIndexRef.current = index;
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image
    const dragElement = e.currentTarget;
    const rect = dragElement.getBoundingClientRect();
    
    // Set drag image
    e.dataTransfer.setDragImage(dragElement, rect.width / 2, rect.height / 2);
    
    // Add dragging class to the element
    setTimeout(() => {
      dragElement.classList.add('opacity-50');
    }, 0);
  }, [items]);

  const handleDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItem(null);
    setDragOverIndex(null);
    draggedIndexRef.current = null;
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndexRef.current !== null && draggedIndexRef.current !== index) {
      setDragOverIndex(index);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    // Only clear if we're actually leaving the element
    if (e.currentTarget === e.target) {
      setDragOverIndex(null);
    }
  }, []);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedIndex = draggedIndexRef.current;
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      
      onReorder(newItems);
    }
    
    setDragOverIndex(null);
    draggedIndexRef.current = null;
  }, [items, onReorder]);

  const getDragProps = useCallback((index) => ({
    draggable: true,
    onDragStart: (e) => handleDragStart(e, index),
    onDragEnd: handleDragEnd,
    onDragOver: (e) => handleDragOver(e, index),
    onDragLeave: handleDragLeave,
    onDrop: (e) => handleDrop(e, index),
    className: `
      cursor-move transition-all duration-200
      ${draggedItem && items[index]?.id === draggedItem.id ? 'opacity-50' : ''}
      ${dragOverIndex === index ? 'border-t-4 border-accent' : ''}
      ${draggedItem && dragOverIndex === index && items[index]?.id !== draggedItem?.id ? 'transform scale-95' : ''}
    `
  }), [draggedItem, dragOverIndex, items, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop]);

  return {
    draggedItem,
    dragOverIndex,
    getDragProps,
    isDragging: !!draggedItem
  };
};
