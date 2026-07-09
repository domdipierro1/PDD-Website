# Address Lookup Backend Note

The public website calls:

https://pdd-pink.vercel.app/api/address-autocomplete?query=USER_TYPED_TEXT

The current backend uses Postcodes.io, so the frontend treats returned results as postcode suggestions only.

Important:

- Do not add address provider API keys to the public website.
- Keep provider keys as Vercel environment variables inside the private backend if a property-level lookup provider is added later.
- Address line 1 is required on the public form because postcode suggestions alone are not enough for a cleaning job address.
