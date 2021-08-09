# karas-animate-sprite(鸦)

---
karas帧动画组件。

[![NPM version](https://img.shields.io/npm/v/karas-animate-sprite.svg)](https://npmjs.org/package/karas-animate-sprite)

## Install
```
npm install karas
npm install karas-animate-sprite
```

## Usage

```jsx
import AnimateSprite from 'karas-animate-sprite';

karas.render(
  <canvas width="720" height="720">
    <AnimateSprite style={{
                     width: 100,
                     height: 100,
                     backgroundImage: 'url(xxx)', // 必须提供精灵图为背景图
                   }}
                   nw={6} // 精灵图水平帧数量
                   nh={9} // 精灵图垂直帧数量
                   delay={1000} // 延迟时间播放
                   duration={2000} // 时长
                   iterations={2} // 循环次数
                   fill={'forwarads'} // 停留模式，同css动画规范fill，forwards尾帧
    />
  </canvas>
);
```

# License
[MIT License]
