import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from "swr"

import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

// Server Side Rendering
// function FilteredEventsPage(props) {
//   if (
//     props.hasError
//   ) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/events'>Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const { filteredEvents, date: { month, year } } = props

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/events'>Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const date = new Date(year, month - 1);

//   return (
//     <Fragment>
//       <ResultsTitle date={date} />
//       <EventList items={filteredEvents} />
//     </Fragment>
//   );
// }

// Client Side Data fetching
function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  const [loadedEvents, setLoadedEventsEvents] = useState([])


  const fetcher = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
      })
  }

  const { data, error, isLoading } = useSWR('https://nextjs-course-dabb2-default-rtdb.firebaseio.com/events.json', fetcher)


  useEffect(() => {
    if (data) {
      setLoadedEventsEvents(data)
    }
  }, [data])


  if (isLoading) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });


  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}



// export const getServerSideProps = async (context) => {
//   const { params } = context
//   const filterData = params.slug
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true
//       }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;
