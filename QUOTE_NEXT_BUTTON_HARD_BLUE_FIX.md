# Quote Next button hard blue fix

Added high-specificity CSS for the actual quote form action buttons:

- button[data-next]
- button[type="submit"]

This prevents the Next / Send buttons from inheriting white outline styling or becoming invisible after fields are completed.
