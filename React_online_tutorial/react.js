class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">Anne Droid</p>
        <p className="comment-body">
          I wanna know what love is...
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Can now be used as JSX, like this:
<Comment />
            Delete comment
</a> </div>
      </div>
    );
  }
class becomes className in JSX
}
