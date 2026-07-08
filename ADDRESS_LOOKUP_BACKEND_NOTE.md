# Address lookup backend note

The public website now contains the live address dropdown UI, but a real UK property-level address dropdown needs a secure backend address lookup endpoint.

The website JavaScript calls:

```text
https://pdd-pink.vercel.app/api/address-autocomplete?query=USER_TYPED_TEXT
```

That endpoint should live inside the private PDD Operator Portal / CRM app, not inside the public HTML. Do not put address provider API keys in the website code.

Expected JSON response can be any of these shapes:

```json
{ "addresses": ["12 Example Road, Enfield, EN1 1AA", "14 Example Road, Enfield, EN1 1AA"] }
```

or:

```json
{ "suggestions": [{ "label": "12 Example Road, Enfield, EN1 1AA", "value": "12 Example Road, Enfield, EN1 1AA" }] }
```

or a plain array:

```json
["12 Example Road, Enfield, EN1 1AA", "14 Example Road, Enfield, EN1 1AA"]
```

For a full postcode, the endpoint should return the matching address list for that postcode. For partial typing, it should return autocomplete suggestions.

Make sure the endpoint allows requests from:

```text
https://pddcleaningservices.co.uk
```

Suggested provider options include getAddress.io, Ideal Postcodes or Loqate. Store the provider key as a Vercel environment variable in the portal app, not in the website files.
