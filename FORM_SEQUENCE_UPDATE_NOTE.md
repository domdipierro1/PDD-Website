# PDD Cleaning Services — Quote Form Sequence Update

This package keeps the existing public website design and only updates the progressive quote form behaviour.

Changes made:
- Quote form now runs as a single sequence card instead of revealing/pushing content down the page.
- Steps are:
  1. Name & number
  2. Service
  3. Property size
  4. Preferred date
  5. Address / postcode
  6. Anything else we should know
- Back buttons added for each later step.
- Next buttons only activate once the current step is complete.
- Property size added: Studio, 1 Bed, 2 Bed, 3 Bed, 4 Bed, 5 Bed, Other.
- Other property size opens a text box.
- Postcode lookup still calls the existing backend endpoint:
  https://pdd-pink.vercel.app/api/address-autocomplete
- After a postcode is selected, Address line 1 and Address line 2 appear.
- Address line 1 must be filled before continuing.
- Address line 2 is optional.
- No API keys, Supabase keys, Telegram tokens, service role keys or private environment variables were added to the public website.

Upload this package to the public website Vercel project, not the pdd-pink Operator Portal project.
