# react-tiny-virtual-grid

虚拟列表 + 类似Grid布局

根据传入不同列数，调整元素位置

在此基础上可以做到当列数动态改变后，给元素的布局添加动画

![](https://tva1.sinaimg.cn/large/00831rSTgy1gdb0z24fdyg30dc073qi9.gif)

## Installation

```
    npm install react-tiny-virtual-grid
```

## Usage

```jsx
  <VirtualGrid
    dataSource={list}
    itemHeight={200}
    bufferSize={2}
    columns={columns}
  >
    {(item, [x, y], isScroll, index) => (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `${x * 300}px`,
          top: `${y * 200}px`,
          width: 300,
          height: 200,
          transition: isScroll ? "unset" : "all 300ms"
        }}
      >
        {item}
      </div>
    )}
  </VirtualGrid>
```
## Props

| 属性     | 说明         | 类型                                                                                                                 | 默认值 |
| ---------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| dataSource | 渲染的数据 | any[]                                                                                                                  | -      |
| itemHeight | 每行元素的高度 | number                                                                                                                 | -      |
| bufferSize | 下方缓冲行数 | number                                                                                                                 | 0      |
| columns    | 列数         | number                                                                                                                 | -      |
| children   | 渲染的函数 |  (item: T,pos: [number, number],isScroll: boolean,index: number) => React.ReactElement | -      |

## TODO

- [ ] 完整缓冲区，防止闪屏
- [ ] 自适应父级宽度
- [ ] 动态元素高度
