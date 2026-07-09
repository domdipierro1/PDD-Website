# PDD Cleaning Services — Redesigned Website Notes

This package redesigns the public PDD Cleaning Services website while keeping the existing static structure:

- index.html
- services.html
- about.html
- contact.html
- thank-you.html
- privacy.html
- terms.html
- styles.css
- script.js
- logo.jpg

## Live backend rules preserved

- Quote form action: https://pdd-pink.vercel.app/api/website-enquiry
- Hidden return_url: https://pddcleaningservices.co.uk/thank-you.html
- Honeypot field name: company
- Address autocomplete endpoint: https://pdd-pink.vercel.app/api/address-autocomplete
- No private keys, API keys, tokens or environment variables are stored in the public website files.

## Form sequence

1. Name & number
2. Service
3. Property size
4. Preferred date
5. Postcode, Address line 1, optional Address line 2
6. Anything else we should know

The postcode autocomplete is still designed around postcode suggestions. Address line 1 remains required because the current backend does not provide full property-level address lookup.
