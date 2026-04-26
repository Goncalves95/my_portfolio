import { useState, useCallback, useEffect } from 'react';

export const useSimpleDragAndDrop = (items, onReorder) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [itemsKey, setItemsKey] = useState(0);

  // Reset state when items change
  useEffect(() => {
    setItemsKey(prev => prev + 1);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [items]);

  const handleDragStart = useCallback((e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  }, [draggedIndex]);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      
      onReorder(newItems);
    }
    
    setDragOverIndex(null);
    setDraggedIndex(null);
  }, [items, draggedIndex, onReorder]);

  const getDragProps = useCallback((index) => ({
    draggable: true,
    onDragStart: (e) => handleDragStart(e, index),
    onDragEnd: handleDragEnd,
    onDragOver: (e) => handleDragOver(e, index),
    onDrop: (e) => handleDrop(e, index),
    style: {
      cursor: 'move',
      opacity: draggedIndex === index ? 0.5 : 1,
      borderTop: dragOverIndex === index ? '4px solid #00ff99' : 'none',
      transform: draggedIndex === index || dragOverIndex === index ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.2s ease'
    }
  }), [draggedIndex, dragOverIndex, handleDragStart, handleDragEnd, handleDragOver, handleDrop]);

  return {
    draggedIndex,
    dragOverIndex,
    getDragProps,
    isDragging: draggedIndex !== null
  };
};
