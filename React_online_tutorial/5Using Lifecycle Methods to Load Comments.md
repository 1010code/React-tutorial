# Using Lifecycle Methods to Load Comments
使用ajax callback資料
```js
class CommentBox extends React.Component {
  ...
  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/comments',
      success: (comments) => { 
        this.setState({ comments })
      }
    }); 
  }
}
```
#  Reviewing the Steps for Loading Comments

1 - componentWillMount() is called.
2 - render() is called and CommentBox
is mounted.
3 - Component waits for API response and when it is received, setState() is called, causing render() to be called again.
4 - componentDidMount() is called, causing this._fetchComments() to be triggered every five seconds.
5 - componentWillUnmount() is called when the component is about to be removed from the DOM and clears the fetchComments timeout.

# Recap on Lifecycle Methods
- componentWillMount() is called before the component is rendered.
- componentDidMount() is called after the component is rendered.
- componentWillUnmount() is called immediately before the component is removed from the DOM.

More lifecycle methods at  http://go.codeschool.com/react-lifecycle-methods


**Example 1.**
If we want to integrate with other JavaScript frameworks, set timers using setTimeout() or setInterval(), we should use the `componentDidMount` lifecycle method.

**Example 2.**
Which lifecycle method is responsible for performing any necessary cleanup,such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount?

a. componentWillMount()
b. render()
c. constructor()
d. componentWillUnmount()

>A: d


```js
class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }
  
  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <CommentAvatarList avatars={this._getAvatars()}/>
        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }
  
  _getAvatars() {
    return this.state.comments.map((comment) => comment.avatarUrl);
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
               id={comment.id}
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
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };
    
    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
  
  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'comments.json',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }
        
  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
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

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleDelete(event) {
    event.preventDefault();

    if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.id);
    }
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

class CommentAvatarList extends React.Component {
  render() {
    const { avatars = [] } = this.props;
    return (
      <div className="comment-avatars">
        <h4>Authors</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}>
              <img src={avatarUrl} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

```





最終
```js
class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }
  
  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <CommentAvatarList avatars={this._getAvatars()} />
        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }
  
  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
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
               id={comment.id}
               author={comment.author}
               body={comment.body}
               avatarUrl={comment.avatarUrl}
               onDelete={this._deleteComment.bind(this)}
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
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };
    
    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
  
  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'comments.json',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }
  
  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );
    
    this.setState({ comments });
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

class CommentAvatarList extends React.Component {
  render() {
    const { avatars = [] } = this.props;
    return (
      <div className="comment-avatars">
        <h4>Authors</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}>
              <img src={avatarUrl} />
            </li>
          ))}
        </ul>
      </div>
    )
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
        <p className="comment-body">{commentBody}</p>

        <div className="comment-actions">
          <RemoveCommentConfirmation onDelete={this._handleDelete.bind(this)} />
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
  
  _handleDelete() {
    this.props.onDelete(this.props.id);
  }
}

class RemoveCommentConfirmation extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showConfirm: false
    };
  }
  
  render() {
    let confirmNode;
    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmDelete.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Delete comment?</a>;
    }
    return (
      <span>{confirmNode}</span>
    );
  }
  
  _toggleConfirmMessage(e) {
    e.preventDefault();
    
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }
  
  _confirmDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }
}
```
