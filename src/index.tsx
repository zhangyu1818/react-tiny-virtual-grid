import React, { useMemo, useLayoutEffect, useRef, useState } from "react";

import "./style.less";

interface GridProps<T> {
  dataSource: T[];
  itemHeight: number;
  bufferSize?: number;
  columns: number;
  children: (
    item: T,
    pos: [number, number],
    isScroll: boolean,
    index: number
  ) => React.ReactElement;
}

function Grid<T>({
  dataSource,
  itemHeight,
  bufferSize = 0,
  columns,
  children
}: GridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevColumns = useRef(columns);
  const isScroll = useRef(false);
  const [state, setState] = useState({
    start: 0,
    end: 0,
    offset: 0
  });
  const prevState = useRef(state);

  const totalHeight = useMemo(
    () => (dataSource.length * itemHeight) / columns,
    [columns, dataSource, itemHeight]
  );

  const bufferSizeLine = useMemo(() => bufferSize * columns, [
    bufferSize,
    columns
  ]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    let timer: number;
    const containerDom = containerRef.current;
    const { height: containerHeight } = containerDom.getBoundingClientRect();
    const visibleCount = Math.ceil((containerHeight / itemHeight) * columns);
    const { scrollTop } = containerDom;

    const initialIndex = Math.floor(scrollTop / itemHeight);
    const initialStart = initialIndex * columns;

    const changeOffset = initialIndex * (prevColumns.current - columns);
    prevColumns.current = columns;
    containerDom.scrollTop += (changeOffset / columns) * itemHeight;
    setState(prev => {
      const initialState = {
        ...prev,
        start: initialStart,
        end: prev.start + visibleCount + bufferSizeLine
      };
      prevState.current = initialState;
      return initialState;
    });

    const onScroll = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => (isScroll.current = false));
      isScroll.current = true;

      const { scrollTop } = containerDom;

      const curStart = Math.floor(scrollTop / itemHeight) * columns;
      const curEnd = curStart + visibleCount;
      const curOffset = scrollTop - (scrollTop % itemHeight);

      const newState = {
        start: curStart,
        end: curEnd + bufferSizeLine,
        offset: curOffset
      };

      if (
        newState.start !== prevState.current.start ||
        newState.end !== prevState.current.end
      ) {
        setState(prev => ({
          ...prev,
          ...newState
        }));
        prevState.current = newState;
      }
    };
    containerDom.addEventListener("scroll", onScroll);
    return () => containerDom.removeEventListener("scroll", onScroll);
  }, [bufferSizeLine, columns, dataSource, itemHeight]);

  const { start, end, offset } = state;

  return (
    <div className="tiny-virtual-container" ref={containerRef}>
      <div style={{ height: totalHeight }}>
        <div
          style={{
            transform: `translate3d(0,${offset}px,0)`,
            willChange: "transform"
          }}
        >
          <div
            className="tiny-virtual-grid"
            style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}
          >
            {dataSource.slice(start, end).map((item, index) => {
              const x = index % columns;
              const y = Math.floor(index / columns);
              return children(item, [x, y], isScroll.current, index);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Grid);
