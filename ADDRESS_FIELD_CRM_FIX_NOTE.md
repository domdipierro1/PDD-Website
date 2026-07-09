# CRM Address Field Fix

Updated the public website enquiry form so the submitted payload includes a real hidden field named `address`:

```html
<input type="hidden" name="address" id="selected-address" />
```

The JavaScript now populates this field before navigation/submission using:

- Address line 1
- Address line 2, when provided
- Postcode/postcode_area

Example submitted value:

`12 Example Road, Enfield, London, EN1 1AA`

The visible postcode field remains named `postcode_area`, and the form still posts by `POST` to:

`https://pdd-pink.vercel.app/api/website-enquiry`

Validation still prevents customers from moving past the address step unless postcode and address line 1 are completed.
