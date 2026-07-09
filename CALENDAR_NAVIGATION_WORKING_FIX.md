# Calendar navigation working fix

The calendar month arrows were not working because a later document-level click listener stopped the click before the calendar component received it.

Fix applied:
- Removed the blocking stopPropagation listener.
- Left the calendar popover's own previous/next month handler active.
- Added a safe non-blocking nav hardening listener.
- Added CSS/JS cache-busting so the browser loads the updated script.
