import { useRef, useContext } from 'react';
import NotificationContext from "../../store/notification-context"

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const notificationCtx = useContext(NotificationContext)

  const emailInputRef = useRef()
  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value
    notificationCtx.showNotification({ title: "Signing Up...", message: "Registering for a news letter ", status: 'pending' })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
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
      notificationCtx.showNotification({ title: "Success!", message: "Successfully registered news letter", status: 'success' })
    }).catch(error => {
      notificationCtx.showNotification({ title: "Failure!!", message: error.message || 'Something went wrong', status: 'error' })
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
