# Synthetic Events
Capture user actions with React's event system, and learn how React uses synthetic events to consolidate the browser's native event API.

這一節將會學到：
- 使用 React 的 onSubmit 接收個瀏覽器的表單送出
- 使用 React event system 接收數入值
- ref 接收值


## 新增一個 comment

```js
class CommentForm extends React.Component { 
  render() {
    return (
    <form className="comment-form">
      <label>Join the discussion</label>
      <div className="comment-form-fields">
        <input placeholder="Name:"/>
        <textarea placeholder="Comment:"></textarea>
      </div>
      <div className="comment-form-actions">
        <button type="submit">
          Post comment
        </button>
      </div>
    </form>
   ); 
  }
}
```

##  Adding an Event Listener to Our Form 

- 在 Form 新增一個提交監聽事件
- Adds an event listener to the submit event
- Don't forget to bind event handlers, otherwise this will not work!
- Prevents page from reloading

```js
class CommentForm extends React.Component { 
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
      ...
        <input placeholder="Name:" ref={(input) => this._author = input}/>
        <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}>
        </textarea>
      ...
      </form>
); }.
  _handleSubmit(event) {
    event.preventDefault();
    let author = this._author; 
    let body = this._body;
    this.props.addComment(author.value, body.value);
} }
```

## What Setting the refs Is Actually Doing
相等於
```js
<input placeholder="Name:" ref={ 
                                  function(input) {
                                    this._author = input;
                                    }.bind(this)
                                  }/>
```
Note: React runs ref callbacks on render.


## 在最外層 CommentBox 加入 CommentForm 表單
-  Adding Functionality to Post Comments

```js
class CommentBox extends React.Component { ... 
  render() {
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
          ...
        </div>
      ); 
    }
    ...
  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }
}
```

## commentList 改放在 state 全域中
```js
class CommentBox extends React.Component { 
  constructor() {
    super();

    this.state = { 
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff' }
      ]
    }; 
  }
  ... 
}
```

##  Rendering Comments From the State
- 拿取 state的陣列並渲染出來

```js
class CommentBox extends React.Component { 
  ...
  _getComments() { 
    return this.state.comments.map((comment) => { 
       return (
         <Comment
            author={comment.author}
            body={comment.body}
            key={comment.id} />
        ); 
      });
  } 
}
```

**Example 1.**
React offers a cross-browser wrapper around the browser's native event system called:

a. Mechanic Events
b. Native Events
c. Synthetic Events
d. jQuery Events

>A: c

**Example 2.**
Which synthetic event do we use to capture form submissions in React?

a. submit
b. theSubmitEvent
c. eventSubmit
d. onSubmit
>A: d

**Example 3.**
In React, we can pass callback functions from parent to child components to allow two-way communication. We do that by assigning values to  `props` .


最終版可讓使用者新增評論並偵測是否填寫
```js
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

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
      ]
    };
  }

  render() {
    const comments = this._getComments();
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
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
    return this.state.comments.map((comment) => {
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
  
  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };
    
    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };
  }
  
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={c => this._author = c} />
          <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
        </div>
        <p>{this.state.characters} characters</p>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }
  
  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }
  
  _handleSubmit(event) {
    event.preventDefault();
    
    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);
    
    this._author.value = '';
    this._body.value = '';
    
    this.setState({ characters: 0  });
  }
}
```
