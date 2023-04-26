import Button from "../ui/Button"

import classes from "./EventItem.module.css"

import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'


const EventItem = (props) => {
    const { event: { id, title, image, date, location } } = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const formattedLocation = location.replace(",", "\n")
    const exploreLink = `/events/${id}`

    return (
        <li key={id} className={classes.item}>
            <img src={"/" + image} alt={image} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedLocation}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button exploreLink={exploreLink} text='Explore Event' rightIcon={() => <ArrowRightIcon />} />
                </div>
            </div>
        </li>
    )
}

export default EventItem