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
    {(item, [x, y], stop, index) => (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `${x * 300}px`,
          top: `${y * 200}px`,
          width: 300,
          height: 200,
          transition: stop ? "all 300ms" : "unset"
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
| children   | 渲染的函数 |  (item: T,pos: [number, number],stop: boolean,index: number) => React.ReactElement | -      |

**注意**

如果要实现动画效果，需要使用Render Props的参数index作为key

目前还没有想到好的方法来实现行数增加时也能进行动画效果。如果行数为1，这时候假如显示了4个元素，将行数变为2，元素从4个变为了8个，凭空新增的元素，没法做到动画。现在解决的想法是需要渲染一个固定长度的数组，这样需要传入一个最大行数，没想到好办法

## TODO

- [ ] 完整缓冲区，防止闪屏
- [ ] 行数增加时也添加动画
- [ ] 动态元素高度
