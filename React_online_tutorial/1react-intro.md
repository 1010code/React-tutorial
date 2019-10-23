## React 是什麼 ?
這就要從頭說起了，React 起初是 Facebook 內部自己使用的框架，直到 2013 年 5 月才開放原始代碼在 GitHub 上，也許是要對抗當時火紅的 (Angular 1) 也說不定!?其中這幾年來 React 在 license 受權爭議也很大，從原本的 BSD 到現在的 MIT 授權。

這邊我來名詞解釋一下：
- BSD Lisense 
  - 在這條款中他有授權給你修改與開發許可但還是有保留他們的專利許可，簡單來說你不能使用 React 來做出跟 Facebook 競爭的事情。
- MIT License
  - 他是全部條款中最簡單的授權，僅保有原作者版權，但你可以任意修改與開源來二次開發，你必須在你的發行版裡包含原許可協議的聲明。

## 與其他框架相比較
React 屬於 MVC(Model–view–controller） 框架中的 V 也是近幾年來最流行框架之一，這邊舉兩個近年來也很火紅的前端框架就 Angular 與 Vue.js，跟前兩者相比台灣對於 React 的活耀度就沒那麼高，但在國外的討論度就相當地高也有豐富的社群平台，想深入學習的朋友只能多看看國外的文章了，此外台灣高雄有成立一個 [REACTMAKER](https://reactmaker.github.io/Member_introduction/#/) 的社團有興趣可以加入看看，他們希望可以帶動台灣對 React 的風氣。
## 有哪些公司使用 React ?
使用 React 開發的公司非常多，簡單列出大家熟知的：
- FaceBook
- Instagram
- Dropbox
- airbnb
- PayPal
- NETFLIX


1. In React, what do we create in order to solve problems?
Ans: Components

2. Before React makes any changes to the page, it generates an in-memory representation of the DOM called the `virtual` DOM.

3. 
一個簡單的元件
```js
class RobotBox extends React.Component {
  render() {
    return <div>Hello From React</div>;
  }
}

let target = document.getElementById('robot-app');

ReactDOM.render( <RobotBox/>,target );

```
