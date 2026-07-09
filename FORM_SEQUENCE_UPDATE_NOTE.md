# PDD Cleaning Services — Redesigned Website Notes

This package redesigns the public PDD Cleaning Services website while keeping the existing static structure.

## Live backend rules preserved

- Quote form action: https://pdd-pink.vercel.app/api/website-enquiry
- Hidden return_url: https://pddcleaningservices.co.uk/thank-you.html
- Honeypot field name: company
- Address autocomplete endpoint: https://pdd-pink.vercel.app/api/address-autocomplete
- No private keys, API keys, tokens or environment variables are stored in the public website files.

## Form sequence

1. Name & number
2. Main service dropdown
   - Main service options: End of tenancy cleaning, Deep cleaning, Exterior window cleaning, Jet washing, Waste clearance
   - Oven cleaning and interior window cleaning are not main-service options.
   - If End of tenancy cleaning or Deep cleaning is selected, Step 2 reveals optional add-ons: Oven cleaning and Interior window cleaning.
   - The customer can leave add-ons blank and press Next to skip.
3. Property size
4. Preferred date
5. Postcode, Address line 1, optional Address line 2
6. Anything else we should know

The postcode autocomplete is still designed around postcode suggestions. Address line 1 remains required because the current backend does not provide full property-level address lookup.

## Services page structure

- End of tenancy cleaning and Deep cleaning now include dropdown add-on panels.
- Oven cleaning and Interior window cleaning are separated as quote add-ons, not displayed as standalone core service cards.
