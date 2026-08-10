# StudySync

StudySync uses a Flask backend with a local SQLite database (`studysync/database.db`). The React frontend calls the Flask JSON API at `/api`; it no longer connects to Supabase.

For local development, start Flask from `studysync` (`python database.py` once, then `python app.py`) and run the React dev server from the repository root. Vite proxies `/api` to Flask on port 5000.

==================================================

CURRENT PROJECT

==================================================

The project is "StudySync", a personal study-management web application.

Existing pages/features include:

- Home

- Login

- Sign Up

- Dashboard

- Profile

- Notes

- Assignments

- Pomodoro

- Progress/analytics

- Navigation bar

- Flash messages

- Dark mode

- Cards

- Forms

- Buttons

- Dashboard widgets

- Charts/progress elements

The current design uses:

- Purple/blue gradients

- Glassmorphism-style navbar

- Rounded cards

- Soft shadows

- Inter font

- Light and dark modes

- Font Awesome icons

- Responsive layouts

The existing design is already good. DO NOT redesign it into something completely different.

==================================================

MAIN GOAL

==================================================

Make the entire website feel like ONE professionally designed application.

Every page should follow the same design system.

There must NOT be situations where:

- One page looks modern while another looks plain.

- One page has different card styling.

- Buttons look different between pages.

- Forms use different spacing.

- Headings have inconsistent sizes.

- Some content is centered while similar content is left-aligned.

- Dark mode works differently between pages.

- Navbar active states behave visually differently.

- Cards have inconsistent border-radius/shadows.

- Mobile layouts behave differently.

- Some pages have excessive empty space.

- Some pages look like they belong to a different website.

==================================================

DESIGN SYSTEM

==================================================

Use the existing StudySync visual identity.

Primary colors:

- Purple: #8B5CF6

- Dark purple: #7C3AED

- Blue: #3B82F6

Light theme:

- Background: #F8FAFC

- Cards: #FFFFFF

- Surface: #F1F5F9

- Main text: #0F172A

- Secondary text: #64748B

- Border: #E2E8F0

Dark theme:

- Background: #0F172A / #111827

- Cards: #1E293B / #1F2937

- Surface: #334155

- Main text: #F8FAFC

- Secondary text: #CBD5E1 / #9CA3AF

Use:

- rounded corners

- subtle borders

- soft shadows

- purple/blue gradients

- subtle hover animations

- consistent spacing

- clean typography

- restrained glassmorphism

Do NOT introduce random colors or a completely different visual identity.

==================================================

NAVBAR

==================================================

Make the navbar consistent on every page.

Keep the existing navigation items and their functionality.

The navbar should:

- remain responsive

- clearly show the active page

- use the existing purple gradient active state

- have consistent spacing

- have consistent icon/text alignment

- work correctly in dark mode

- maintain the existing theme toggle

- maintain logout/login/signup behavior

IMPORTANT:

Do not change the Jinja logic that determines active_page.

Only improve the visual presentation.

==================================================

PAGE LAYOUT

==================================================

Create a consistent page layout system.

Use a reusable centered content container.

Recommended:

- max-width around 1100–1450px depending on page

- margin-left/right: auto

- responsive horizontal padding

- consistent vertical spacing

Pages that contain forms such as Login and Sign Up should have their primary content properly centered.

Dashboard-style pages can use wider containers.

Do not randomly apply text-align:center to entire pages.

Instead, center elements intentionally based on their role.

==================================================

HOME PAGE

==================================================

Keep the existing Home page content and wording.

Improve:

- hero spacing

- hero typography

- badge

- CTA buttons

- feature section

- feature cards

- responsive behavior

- visual hierarchy

The hero should feel intentional and centered where appropriate.

Feature cards should have the same visual language as dashboard cards.

==================================================

LOGIN / SIGNUP

==================================================

Make Login and Sign Up look like part of the same application.

Keep:

- existing form fields

- existing names

- existing POST behavior

- existing Jinja

- existing backend

Improve only:

- form card

- spacing

- input styling

- button styling

- heading hierarchy

- alignment

- responsive layout

- dark mode

- focus states

The form should be visually centered on the page.

Do not modify form field names or form submission behavior.

==================================================

DASHBOARD

==================================================

Preserve the existing dashboard structure.

Improve consistency between:

- dashboard hero

- overview cards

- quick-action cards

- widgets

- charts

- progress elements

The "Welcome Back" / dashboard hero area should have intentional alignment and spacing.

Keep the existing cards and functionality.

==================================================

NOTES

==================================================

Make Notes visually consistent with Dashboard.

Use the same:

- card radius

- shadows

- borders

- typography

- buttons

- input styling

- spacing

- dark mode behavior

Do not modify CRUD functionality.

==================================================

ASSIGNMENTS

==================================================

Make Assignments visually consistent with Notes and Dashboard.

The active Assignments navbar item must retain its existing active state.

Improve:

- assignment cards

- forms

- progress bars

- action buttons

- spacing

- responsive layout

- dark mode

Do not modify assignment functionality.

==================================================

POMODORO

==================================================

Keep the existing Pomodoro functionality exactly as it is.

The current Pomodoro layout is centered and functional, but visually too plain.

Improve only its visual appearance:

- timer container

- progress ring

- controls

- buttons

- typography

- surrounding card/container

- subtle background effects

- session information

- responsive design

- dark mode

Make it feel as polished as the Dashboard.

Do NOT modify JavaScript timer logic.

==================================================

PROFILE

==================================================

Make Profile follow the same design system.

Improve:

- profile card

- avatar

- typography

- spacing

- buttons

- dark mode

- responsive layout

Do not modify profile backend functionality.

==================================================

DARK MODE

==================================================

Dark mode must work consistently across every page.

Do not create page-specific dark-mode color systems.

Use the existing CSS variables wherever possible.

Make sure:

- backgrounds transition correctly

- cards remain readable

- borders remain subtle

- text has sufficient contrast

- inputs are readable

- buttons remain visible

- icons remain visible

- navbar remains consistent

- charts/components remain readable

==================================================

RESPONSIVE DESIGN

==================================================

The website must work properly on:

- desktop

- laptop

- tablet

- mobile

Do not simply shrink everything.

Use appropriate:

- grid changes

- flex changes

- padding adjustments

- typography scaling

- button wrapping

- navbar responsiveness

Prevent:

- horizontal scrolling

- overflowing cards

- overflowing forms

- text touching screen edges

- broken navbar layouts

==================================================

CSS ARCHITECTURE

==================================================

Before making changes, inspect the existing CSS.

Do NOT create unnecessary duplicate styles.

Prefer reusable classes and CSS variables.

Create a consistent design system for:

- containers

- cards

- buttons

- forms

- inputs

- headings

- sections

- spacing

- badges

- icons

If an existing class already performs the required job, improve it instead of creating another nearly identical class.

Avoid conflicting selectors.

Avoid !important unless absolutely necessary.

Do not accidentally break existing templates.

==================================================

JINJA / FLASK SAFETY

==================================================

This is extremely important.

The existing HTML contains Jinja2.

Preserve ALL existing Jinja syntax exactly.

For example, do not remove or modify:

{{ url_for(...) }}

{{ variable }}

{% if ... %}

{% endif %}

{% for ... %}

{% endfor %}

{% block ... %}

{% extends ... %}

Do not convert the project into React, Next.js, Node.js, or another framework.

Keep the existing Flask + Jinja architecture.

==================================================

FUNCTIONALITY SAFETY

==================================================

After making frontend changes, verify that:

- Login still works

- Signup still works

- Logout still works

- Dashboard still works

- Notes CRUD still works

- Assignments still work

- Pomodoro still works

- Profile still works

- Flash messages still work

- Theme toggle still works

- Navbar links still work

- Forms still submit correctly

If a visual change requires modifying backend code, DO NOT make that change.

Find a frontend-only solution instead.

==================================================

IMPORTANT FINAL RULE

==================================================

DO NOT rebuild StudySync from scratch.

DO NOT change the backend.

DO NOT change application logic.

DO NOT change database logic.

DO NOT change routes.

DO NOT change functionality.

DO NOT replace Flask/Jinja.

DO NOT replace SQLite.

DO NOT remove existing features.

ONLY improve and standardize the frontend.

The final result should feel like the same StudySync application I already built, but with a much more consistent, polished, professional, responsive UI.

Before modifying anything, inspect the existing project structure and existing CSS/templates so that your changes integrate with the current design instead of replacing it.

IMPORTANT CSS RULE:

Before adding CSS, identify existing rules that already control the same element.

Do not blindly append duplicate selectors to the end of the stylesheet.

If duplicate/conflicting CSS exists, consolidate it carefully while preserving the current appearance and functionality.

The final CSS should have one clear source of truth for each major component.

Do not create multiple competing definitions for the same selector unless there is a clear responsive or dark-mode reason.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://study-sync-polish.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/433748c3-14d2-445a-b7ba-39825ae50617).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
