# Vette Tracker

A tool to track Corvette prices over time. Built using Next.js, Tanstack Query, Clerk, and Tailwindcss.

## Performance Considerations

Right now the app is entirely client-side rendered, and all data fetching happens using Tanstack Query hooks. Most page to page navigations should be instantaneous. Initial page load still needs work.

## Performance Improvements

- The data from initial /vettes request on the main page is used to populate individual Vette pages (/vettes/[id]). This means that the data is only fetched once, and then cached for subsequent requests. Done using the `initialData` option of the `useQuery` hook.
- If the first page loaded is a detail page, the /vettes request is prefetched so navigation to the full list is instant.

### Limitations

- A large data set of Vettes would cause eventually cause slowness on the /vettes route. Server side pagination is needed.
- Data fetching is only kicked off once the JS bundle is loaded and parsed. Optimally I would kick off the data fetching request on the server, then stream in the results.
- The error handling around optimistic updates needs work
- Creations _may_ be able to be done optimistically, however that has not been implemented yet.
