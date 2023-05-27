import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';

import NotificationContext from "../../store/notification-context"


import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext)
  const [isLoadingComments, setIsLoadingComments] = useState(false)

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (showComments) {
      setIsLoadingComments(true)
      fetch('/api/comments/' + eventId).then(response => response.json()).then(data => {
        setComments(data.comments)
        setIsLoadingComments(false)
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({ title: "Comment", message: "Adding Comment", status: 'pending' })
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(data => {
        throw Error(data.message || 'Something went wrong.')
      })
    }).then(data => {
      setComments([data.comment, ...comments])
      notificationCtx.showNotification({ title: "Success!", message: "Successfully Added new comment", status: 'success' })
    }).catch(error => {
      notificationCtx.showNotification({ title: "Failure!!", message: error.message || 'Something went wrong', status: 'error' })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (isLoadingComments ? <p>Loading....</p> : <CommentList comments={comments} />)}
    </section>
  );
}

export default Comments;
