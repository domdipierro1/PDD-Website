# Final quote form size/button fix

This update addresses the visible enquiry form issues:

- Right quote tile is set to the same desktop height as the left hero tile.
- Step content no longer stretches or cuts the tile.
- Next / Back / Send actions sit inside the bottom of the tile using flex layout, not off-screen absolute positioning.
- Next and Send buttons are forced blue using CSS, inline styles and a small JS safety enforcement.
- CSS and JS links have cache-busting query strings so the browser loads the updated files.
