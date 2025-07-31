# Plan for New Features in EliteTutors Platform

## 1. Registration Page Modification (Student & Teacher Options)

### Objective:
To allow users to choose between registering as a student or a teacher on the main EliteTutors platform.

### Current State:
- Main platform (frontend) has a login/registration flow for students (implicitly).
- Teacher dashboard (frontend) has a separate login/registration flow for teachers.
- Backend has separate models and routes for students and teachers.

### Proposed Changes:
- **Frontend (Main Platform):**
    - Modify the existing registration page (`/register` or similar) to present two clear options: 


        - "Register as a Student"
        - "Register as a Teacher"
    - Each option will lead to a specific registration form:
        - **Student Registration Form**: Collects basic student information (name, email, password, etc.).
        - **Teacher Registration Form**: Redirects to the existing teacher registration form on the teacher dashboard or integrates it directly into the main platform.
    - Ensure clear UI/UX for selection and navigation.

- **Backend (Main Platform API):**
    - Create a new endpoint for student registration.
    - Ensure the existing teacher registration endpoint is accessible from the main platform if redirection is chosen.
    - Implement validation and database storage for student data.

## 2. Admin Management Page

### Objective:
To allow existing administrators to add, view, and manage other administrator accounts within the EliteTutors admin interface.

### Current State:
- Only one default admin account is created upon Flask backend initialization.
- No interface exists to manage other admin accounts.

### Proposed Changes:
- **Frontend (Admin Dashboard):**
    - Add a new navigation link in the admin dashboard (e.g., "Manage Admins" or "Users").
    - Create a new page/component for Admin Management.
    - This page will display a list of existing administrators.
    - Provide functionality to:
        - **Add New Admin**: Form to input username, email, password, first name, last name, role (e.g., 'admin', 'super_admin'), department.
        - **View/Edit Admin**: Display details of an admin and allow modification of non-sensitive fields (e.g., name, role, department).
        - **Deactivate/Activate Admin**: Toggle active status of an admin account.
        - **Search/Filter**: Ability to search for admins by name, email, or role.
    - Implement proper authentication and authorization to ensure only authorized admins can access this page.

- **Backend (Admin API):**
    - Create new API endpoints for:
        - `POST /api/admin/managers/register`: To register a new manager/admin.
        - `GET /api/admin/managers`: To retrieve a list of all managers.
        - `PUT /api/admin/managers/<id>`: To update an existing manager's details.
        - `POST /api/admin/managers/<id>/toggle-active`: To activate/deactivate a manager.
    - Implement robust validation for all inputs.
    - Ensure proper role-based access control (RBAC) so only 'super_admin' or specific roles can manage other admins.

## 3. Multilingual Support (Arabic as Second Language)

### Objective:
To provide a seamless user experience in both English and Arabic across the entire EliteTutors platform (main site and admin dashboard).

### Current State:
- All text content is currently in English.

### Proposed Changes:
- **Frontend (Main Platform & Admin Dashboard):**
    - Implement an internationalization (i18n) library (e.g., `react-i18next` for React).
    - Create language resource files (JSON) for English (`en.json`) and Arabic (`ar.json`).
    - Translate all static text content (labels, buttons, headings, messages, etc.) into Arabic.
    - Add a language switcher component (e.g., a dropdown or toggle button) in the header/footer of both platforms.
    - Ensure proper handling of Right-to-Left (RTL) text direction for Arabic content using CSS (e.g., `dir="rtl"` attribute on `<html>` or `<body>`).
    - Test responsiveness and layout for RTL languages.

- **Backend (Main Platform API & Admin API):**
    - While most localization will be frontend-driven, ensure that any dynamic content returned from the backend (e.g., error messages, success messages, tutor bios) can support multiple languages if needed in the future. For now, focus on static text on the frontend.
    - Consider adding a `language` field to user profiles if personalized language settings are desired.

## Implementation Steps (High-Level):

1.  **Backend Development:**
    - Student model and routes.
    - Admin management routes and logic.
    - Update existing API endpoints to handle language preferences if necessary.

2.  **Frontend Development (Main Platform):**
    - Modify registration flow.
    - Implement i18n and translate content.
    - Add language switcher.

3.  **Frontend Development (Admin Dashboard):**
    - Create Admin Management page.
    - Implement i18n and translate content.
    - Add language switcher.

4.  **Integration & Testing:**
    - Test all new features end-to-end.
    - Verify multilingual functionality.
    - Ensure security and data integrity.

5.  **Documentation Update:**
    - Update all relevant documentation with new features and changes.

This plan provides a clear roadmap for implementing the requested features, ensuring a robust and user-friendly platform.

