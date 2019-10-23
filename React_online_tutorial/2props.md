## Props

製作一個評論元件，render()內是使用 JSX 跟 HTML 很像，HTML 的class 是 JSX 的 className
這一節將會學到：
- 將原生 HTML 標籤轉成 JSX 語法並渲染來
- 建立 CommentBox 和 Comment 元件
- 使用 Props 可以自定義變數傳入元件中並渲染出來 `{this.props.參數名稱}`


```js
// 寫一個 Comment 元件
class Comment extends React.Component { 
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
            <a href="#" className="comment-footer-delete">
            Delete comment
            </a>
         </div>
        </div>
      ); 
    }
  }

// 寫一個 CommentBox 元件 包含 Comment 元件
class CommentBox extends React.Component { 
  render() {
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">2 comments</h4>
        <div className="comment-list">
          <Comment
          author="Morgan McCircuit" body="Great picture!" />
          <Comment
          author="Bending Bender" body="Excellent stuff" />
        </div>
      </div>
      ); 
    }
  }
```

React 元件可以自定義參數，稱作 props 類似於 HTML 的 element attributes

**Example 1.**
The pattern we follow when declaring new components usually includes: declaring a new `class` and making it extend `React.Component` .

**Example 2.**
Every component must include a method called `render` and return some `JSX` markup code.

## Passing Dynamic Arguments

這一節將會學到：
- 如何動態的新增元件裡的 props
- 如何使用 map object 陣列轉成 JSX 陣列呈現purposes
- 使用 JavaScript 解決複(單)數標題

```js
class CommentBox extends React.Component { 
  render() {
    const comments = this._getComments(); 
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <div className="comment-list">
          {comments}
       </div>
      </div>
  ); 
}
  // 取得動態渲染 Comment元件
  _getComments() {
      const commentList = [
      { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' }, { id: 2, author: 'Bending Bender', body: 'Excellent stuff' }
      ];
    return commentList.map((comment) => { 
      return (
        <Comment
          author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }
  // 依照取得元件數呈現文字做修改
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

```
JSX 自己知道要渲染 {comments} 陣列 直接用大括號包起來即可

若要加img 圖片+標籤
```js
<img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
```

**Example 1.**

What is the correct syntax to pass the comment.author object property as a prop to the Comment component?

a. <Comment author="comment.author" />
b. <Comment author={{comment.author}} />
c. <Comment author={comment.author} />
d. <Comment author=[comment.author] />

>A: c


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
  
  render() {
    return(
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
          <a href="#">Report as Abuse</a>
        </div>
      </div>
    );
  }
}

```
