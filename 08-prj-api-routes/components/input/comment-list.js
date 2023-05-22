import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props
  return (
    <ul className={classes.comments}>
      {
        comments.map((eachComment) => (
          <li id={eachComment._id}>
            <p>{eachComment.text}</p>
            <div>
              By <address>{eachComment.name}</address>
            </div>
          </li>
        ))
      }

    </ul>
  );
}

export default CommentList;
