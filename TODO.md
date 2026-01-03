E-COMMERCE PROJECT REQUIREMENTS & CORRECTIONS

1. AUTHENTICATION & AUTHORIZATION

* Ecommerce user routes must not be accessible by admin.
* Admin routes must not be accessible by users.
* If a user logs in and tries to access the admin panel, an error message should be shown at the top (toast), not an alert.
* Role-based route protection must be implemented.

2. LOGIN FLOW

* User login button should be available in the user header.
* Admin login must be accessible only via the route `/admin/login`.
* Admin should not see the user login button.
* If the user/admin is logged in, the logout button should be visible.
* If the user/admin is logged out, only the login button should be visible.
* Login and logout buttons must never appear at the same time.

3. HEADER MANAGEMENT

* User header and admin header must be completely different components.
* Header should render based on role (user or admin).
* A conditional toggle/logic must determine which header to display.
* Header values and menu items must differ for user and admin.

4. CART MANAGEMENT

* Cart provider must be implemented using React Context API.
* Cart item count in the header must persist after page reload.
* If the user is logged out, the cart should be empty.
* If the user is logged in, cart data should be fetched from the backend.
* On logout, cart state must be cleared.
* On login again, the previously added cart items for that user must reappear.
* If a logged-in user clicks the Add to Cart button, redirect to the Cart page.
* If a non-logged-in user clicks Add to Cart, redirect to the Login page.

5. FORM VALIDATIONS

* Phone number validation:

  * After the country code, the phone number must not exceed 10 digits.
* Registration validations:

  * Email must be a valid Gmail format.
  * Password must include:

    * At least one capital letter
    * At least one special character
    * At least one number
    * Minimum required length

6. UI FEEDBACK & USER EXPERIENCE

* Replace all alert messages with toast notifications.
* Toasts should be used for success, error, and warning messages.
* A loader must be displayed on every page until data is successfully fetched.
* Loader should be implemented using custom CSS to improve UI.
* Infinite scrolling must be implemented on product listing pages.
* Products should load continuously on scroll so the page never appears empty.

7. PRODUCT MANAGEMENT (ADMIN)

* Original price and discount price fields:

  * Must be number inputs
  * Increment/decrement arrows must be disabled
* Product image functionality:

  * Multiple images must be supported per product.
  * Image preview should be shown before submitting.
  * Users should be able to add multiple images.
  * Each image should have a remove (cross) button to delete a specific image.

8. COUPON MANAGEMENT (ADMIN)

* Coupon end date must always be greater than the start date.
* Admin should be able to:

  * Add coupons
  * Edit coupons
  * Delete coupons

9. ADMIN DASHBOARD

* Admin dashboard must display a list of all users.
* Users must be separated into two lists:

  * Admin users
  * Normal users
* Admin dashboard must display a list of all products.
* Product list must include filters for:

  * Alphabetical sorting (A–Z and Z–A)
  * Price sorting (Low to High, High to Low)


