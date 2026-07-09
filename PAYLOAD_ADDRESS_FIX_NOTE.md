# CRM Address Payload Fix

This update makes the website submit a real non-empty CRM field named `address`.

The contact form contains this hidden input inside the same form that posts to the CRM:

```html
<input type="hidden" name="address" id="selected-address" value="" data-selected-address />
```

The JavaScript now runs `syncCrmAddressField(form)` before submit and combines:

- `address_line_1`
- `address_line_2`
- `city` if a city field exists
- `postcode_area` or `postcode`

Example submitted payload field:

```text
address: 12 Example Road, Enfield, London, EN1 1AA
```

The form still submits by normal POST to:

```text
https://pdd-pink.vercel.app/api/website-enquiry
```

There is no JavaScript fetch submission for the quote form, so hidden inputs are included in the browser's standard form payload.
