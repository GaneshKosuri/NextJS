import EventItem from "./EventItem"

import classes from "./EventList.module.css"

const EventList = (props) => {
    const { items } = props

    return (
        <ul className={classes.list}>
            {
                items.map((eachItem) => (
                    <EventItem key={eachItem.id} event={eachItem} />
                ))
            }
        </ul>
    )

}

export default EventList