# Mobile Enquiry Form Usability Fix

Changes made:

- Mobile header reduced significantly so more of the quote form is visible on phone screens.
- The bottom mobile Call / Get Quote sticky CTA is hidden on the contact page and when the customer is interacting with a quote form.
- The form's own Back / Next / Send buttons now act as the main sticky mobile action area.
- On mobile, the active quote step uses natural page height instead of a large absolute-positioned panel.
- When moving between quote steps on mobile, the form scrolls back to the top of the quote card so the customer can see the new step clearly.
- The CRM address hidden field remains inside the same form and continues to submit as name="address".

Purpose:

The customer should not need to keep scrolling down to find Next on each step, and the bottom screen action should be the quote form button rather than the general Call / Get Quote bar.
