import EventList from '../components/events/event-list'
import { getFeaturedEvents } from "../helpers/api-utils"


function HomePage(props) {
  const { featuredEvents } = props

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      featuredEvents
    }
  }
}

export default HomePage;
