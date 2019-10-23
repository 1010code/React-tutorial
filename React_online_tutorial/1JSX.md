## 暸解 JSX (JavaScript XML)

JSX 語法類似 HTML

```js
<div> story box </div>
```
轉變成
```js
React.createElement('div',null,'story box');
```

```js
<storyBox/>
```
轉變成
```js
React.createElement('storyBox',null);
```

## From JSX to HTML

把全部的 JSX 轉譯成 JavaScript 再渲染到網頁上最後變成 HTML

- JSX
```js
<div>
  <h3>stories App</h3>
  <p className="lead">sample paragraph</p>
</div>
```

- JavaScript
```js
  React.creatElement('div',null,
  React.creatElement('h3', null, 'stories App'),
  React.creatElement('p',{className:'lead'},'sample paragraph')
);
```
**Example 1.**
The markup we return from render() methods in React components is called
A: JSX


**Example 2.**
大括號包入變數
```js
class RobotTime extends React.Component {
  render() {
  	const pi = Math.PI;
    return (
      <div   >
        The value of PI is approximately {pi}
      </div>
    );
  }
}
```

**Example 3.**
使用 map 將陣列渲染出來

```js
class RobotItems extends React.Component {
  render() {
    const topics = ["React", "JSX", "JavaScript", "Programming"];
    return (
      <div>
        <h3>Topics I am interested in</h3>
        <ul>
          {topics.map(topic => <li>{topic}</li> )}
        </ul>
      </div>
    );
  }
}
// <li>React</li>
// <li>JSX</li>
// <li>JavaScript</li>
// <li>Programming</li>
```

