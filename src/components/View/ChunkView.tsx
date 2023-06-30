import React, { useEffect, useState, useRef } from 'react';
import { InteractionManager } from 'react-native';

const BATCH_SIZE = 4;

export function ChunkView({ children }) {
  const [batchIndex, setBatchIndexRaw] = useState(1);
  const focusedRef = useRef(true);
  const batchIndexRef = useRef(1);
  const reachedEndRef = useRef(false);

  const childrenChunk = reachedEndRef.current
    ? children
    : children.slice(0, BATCH_SIZE * batchIndex);

  const setBatchIndex = (index) => {
    batchIndexRef.current = index;
    setBatchIndexRaw(index);
  };

  const loadNextBatch = (timeout = 800) => {
    InteractionManager?.runAfterInteractions(() => {
      setTimeout(() => {
        if (focusedRef.current) {
          const nextBatchIndex = batchIndexRef.current + 1;
          if (nextBatchIndex * BATCH_SIZE >= children.length) {
            reachedEndRef.current = true;
          } else {
            loadNextBatch();
          }
          setBatchIndex(nextBatchIndex);
        }
      }, timeout);
    });
    return () => (focusedRef.current = true);
  };

  useEffect(() => {
    loadNextBatch(1000);
  }, []);

  return <>{childrenChunk}</>;
}