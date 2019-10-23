# Componment State
Explore handling data that changes over time with state and how it can help us manipulate DOM elements.

- Indirect DOM Manipulation(間接)

State 是 JavaScript 物件，存在於哪個元件，我們可以經由 state 來存取，並由建構子來初始化狀態
```js
class CommentBox extends React.Component {
  constructor() { 
    super();
    this.state = { 
      showComments: false
    }; 
  }
  render() {
    ...
  }
... 
}
```

## 如何更新元件狀態

更新 showComments 的 property 並重新渲染元件

```js
this.state.showComments = true // 錯誤

this.setState({showComments: true }) // 正確


```

下列幾件事會變動狀態的發生

- 按鈕 (Button clicks)
- 連結按鈕 (Link clicks)
- Form subbmission
- AJAX requests

## 製作一個狀態按鈕

- 該狀態是 React 應用程序的重要組成部分，能夠讓使用戶界面交互作用
- 我們可以利用建構子初始化狀態
- 使用 `this.setSate()` 來更新狀態並重新渲染元件

```js
class CommentBox extends React.Component { ... 
  render() {
   ... 
    
  let buttonText = 'Show comments';
  if (this.state.showComments) { 
    buttonText = 'Hide comments'; 
    ...
  }
   return(
    ...
      <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
    ...
  );
 }
 _handleClick() { 
   this.setState({
    showComments: !this.state.showComments 
  });
 }
}
```

**Example 1.**
In React, this is how we modify the DOM:

a. Directly, by accessing DOM elements and changing properties on them
b. Indirectly, by updating each component's state and letting React handle updates to the DOM
c. We must use other libraries, like jQuery, in order to modify the DOM
> A: b

**Example 2.**
When writing a component in React that contains data that changes over time, it is considered a best practice to store this data in the component’s state.

Check the option that shows how to properly access a component's state:

a. Running the function React.getState()
b. Accessing the window.state object
c. Running the function this.getState()
d. Accessing the this.state object
> A: d

**Example 3.**
In order to create the initial state for a component, we must declare the property this.state as an object in the class `constructor` function.


```js
class CommentBox extends React.Component {

  render() {
    const comments = this._getComments() || [];
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
       return (
         <div>This post is getting really popular, don't miss out!</div>
       );
    }
  }
  
  _getComments() {
    const commentList = [
      { id: 1, author: 'Clu', body: 'Just say no to love!', avatarUrl: 'images/default-avatar.png' },
      { id: 2, author: 'Anne Droid', body: 'I wanna know what love is...', avatarUrl: 'images/default-avatar.png' }
    ];

    return commentList.map((comment) => {
      return (<Comment
               author={comment.author}
               body={comment.body}
               avatarUrl={comment.avatarUrl}
               key={comment.id} />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isAbusive: false
    };
  }

  render() {
    let commentBody;
    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }
    return(
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {commentBody}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
      </div>
    );
  }
  _toggleAbuse(event){
    event.preventDefault() 
    this.setState({
      isAbusive: !this.state.isAbusive 
    });
  }
}

```
