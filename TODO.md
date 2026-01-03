# TODO: Consolidate Admin CSS

## Steps to Complete

- [ ] Update admin.css to include all admin styles from App.css, merging where necessary
- [ ] Remove admin-related CSS from App.css
- [ ] Add import for admin.css in AddCoupon.jsx
- [ ] Test admin pages to ensure styles are applied correctly

## Information Gathered

- App.css contains admin-related styles like .admin-login h2, .admin-page, .admin-form (with input, button, focus, hover, active states), and .admin-page p.
- admin.css already has some admin styles, including .admin-page, .admin-form, etc., but some styles differ or are missing.
- AddCoupon.jsx uses .admin-page and .admin-form classes.
- AdminHome.jsx imports admin.css, but AddCoupon.jsx does not explicitly import it.

## Plan

- Move all admin-related CSS from App.css to admin.css, merging and updating where necessary to avoid duplicates and ensure consistency.
- Remove the admin-related CSS from App.css.
- Add import for admin.css in AddCoupon.jsx to ensure styles are applied.
- Verify that admin.css has complete styles for all admin components.

## Dependent Files to be edited

- frontend/src/App.css (remove admin styles)
- frontend/src/admin/admin.css (add/update admin styles)
- frontend/src/admin/pages/AddCoupon.jsx (add import for admin.css)

## Followup steps

- Test admin pages (AdminHome, AddCoupon, etc.) to ensure styles are applied correctly.
