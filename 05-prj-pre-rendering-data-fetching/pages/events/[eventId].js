import { Fragment } from 'react';

import { getFeaturedEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {

  const { event } = props;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents()
  const paths = events.map(event => ({ params: { eventId: event.id } }))
  return {
    paths,
    // fallback: true
    fallback: 'blocking'
  }
}


export const getStaticProps = async (context) => {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      event
    }
  }
}

export default EventDetailPage;
