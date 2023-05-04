export const getAllEvents = async () => {
    let featuredEvents = []
    await fetch("https://nextjs-course-dabb2-default-rtdb.firebaseio.com/events.json")
        .then(response => response.json())
        .then(data => {
            featuredEvents = Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        })
    return featuredEvents
}


export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured)
}

export const getEventById = async (id) => {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
}


export const getFilteredEvents = async (dateFilter) => {
    const { year, month } = dateFilter
    const allEvents = await getAllEvents()

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}