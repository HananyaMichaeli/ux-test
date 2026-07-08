# VetCare Clinic — UI Mockup

A static HTML/CSS/JavaScript mockup for a veterinary clinic management app. No backend, no build step — open the HTML files directly in a browser.

## Pages

- `index.html` — Login screen (mock auth; any email + password ≥ 6 chars signs in)
- `dashboard.html` — Clinic dashboard: stat cards, upcoming appointments, quick actions, recent patients
- `clinic-details.html` — Clinic profile, operating hours, services offered, and staff, with an edit mode

## Structure

```
css/
  styles.css           shared design tokens, app shell (sidebar/topbar), components
  login.css            login page layout
  clinic-details.css   clinic details page layout
js/
  app.js               shared shell behavior (notifications, user menu, logout)
  login.js             login form validation + redirect
  dashboard.js          mock appointment/patient data + rendering
  clinic-details.js    clinic profile edit mode, hours, services, staff
```

## Running

Just open `index.html` in a browser, or serve the folder locally, e.g.:

```
npx serve .
```
