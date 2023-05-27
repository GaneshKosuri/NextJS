import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
    notification: null,
    showNotification: () => {
    },
    hideNotification: () => { }

})

export const NotificationContextProvider = (props) => {
    const [activeNotification, setActiveNotification] = useState()

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    useEffect(() => {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
            const timer = setTimeout(() => {
                hideNotificationHandler()
            }, 3000)
            return () => {
                clearTimeout(timer)
            }
        }

    }, [activeNotification])

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext