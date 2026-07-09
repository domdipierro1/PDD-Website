# Calendar real navigation fix

The previous stay-open fix used capture-phase stopPropagation, which stopped the calendar's own month-change handler from seeing arrow clicks.

Fix applied:
- Removed the blocking capture listener.
- Corrected the calendar handler to look for the actual next-month button attribute: data-cal-next.
- Kept a non-blocking keep-open listener so the overlay stays open after month changes.
- Added cache-busting to reload the fixed script.
