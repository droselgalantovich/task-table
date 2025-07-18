import {useState, useRef, useEffect} from 'react';
import styles from './ColumnResizer.module.css';

interface Props {
  onResize: (width: number) => void;
  minWidth?: number;
}

export const ColumnResizer: React.FC<Props> = ({onResize, minWidth = 50}) => {
  const [isResizing, setIsResizing] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const th = resizerRef.current?.parentElement;
      if (!th) return;

      const rect = th.getBoundingClientRect();
      const newWidth = Math.max(minWidth, e.clientX - rect.left);
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onResize, minWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <div
      ref={resizerRef}
      onMouseDown={handleMouseDown}
      className={styles.resizer}
    />
  );
};
