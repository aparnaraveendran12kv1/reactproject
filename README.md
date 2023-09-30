Task Assignment for Preview:
 
Documentation for Employee Task Form

The theme of this application revolves around efficiently collecting and managing employee data. 
It provides an intuitive interface for users to enter employee details and upload relevant files. The multi-step process ensures data accuracy and provides users with the opportunity to review and edit information before final submission. 
This theme is useful for HR departments or organizations that need a structured way to gather employee data and files.

Employee Data Entry and File Upload


This React application is designed to allow users to enter employee information, including first name, last name, email, phone number, and upload a CSV or Excel file containing additional data. 
The application guides users through a multi-step process, including data entry and previewing the entered information before submission.

Components and Libraries Used:
React : A JavaScript library for building user interfaces.
React Bootstrap : A library for building responsive and customizable UI components.
React Bootstrap Icons : Provides a set of Bootstrap-themed icons.
React Router Dom : A library for adding routing functionality to React applications.
React Icons (FiSave): Provides icons for the save action.
Form Validation: The application performs client-side validation for fields like first name, last name, email, and phone number.
File Upload : Allows users to upload CSV or Excel files.

Features:
Step 1: Data Entry
   - Users can enter the following information:
     - First Name 
     - Last Name
     - Email (validated for correct format)
     - Phone Number (validated for a 10-digit format)
   - Users can also upload a CSV or Excel file with additional data.
   - File validation ensures that only valid file types are accepted (CSV, Excel).

Step 2: Preview and Edit
   - After entering data, users can review the information before proceeding.
   - Users can choose to edit the entered information.
   - The file upload can also be edited, and the new file is validated.
   - Users can save their changes.

Modal for Previewing Data
   - A modal dialog displays a preview of the entered data.
   - Users can acknowledge the preview to proceed to submission.

Submission
   - After acknowledging the preview, users can submit the form.
   - The form is only submitted if all data is valid and the preview is acknowledged.
   - Successful form submission displays a success message.

Routing
   - React Router is used for routing, allowing the user to navigate to a success page after submission.

Usage:
1. Clone the repository and install dependencies.
2. Run the React application.
3. Access the application in your web browser.


Form Validation:
 Explanation of the form validation in this code:
First Name and Last Name:
Both fields (firstName and lastName) are required. If they are empty, corresponding error messages are set.
The first letter of the first name should be capitalized. A regular expression (/^[A-Z][a-z]*$/) is used to check this condition. If the condition is not met, an error message is set.
Email:
The email field is required.
Email format validation is performed using the isValidEmail function, which checks if the email matches a regular expression for a valid email format. If not, an error message is set.
Phone Number:
The phone number field is required.
The phone number should consist of exactly 10 digits. This is checked using the regular expression /^\d{10}$/. If it doesn't match, an error message is set.




File Upload:
File validation is performed when a file is selected for upload.
The accepted file types are CSV, Excel (.xlsx), and Excel (.xls), and their MIME types are checked. If an unsupported file type is selected, an error message is set.

