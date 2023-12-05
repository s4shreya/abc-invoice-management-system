# Invoice Management System
A React application for invoice management that uses Redux toolkit and stores the invoices on firebase real-time database. It allows user to create new Invoice and add it to the list of the invoices that is displayed on the homepage, view the complete details of the invoice, edit it with changes and remove it from the invoices list. All the invoices are stored in firebase. Redux toolkit is used for state management in React application and Redux thunk middleware is used to handle asynchronous actions. 

## Features of the application
* Sorts the invoices list according to the invoice number either in increasing or decreasing order.
* Invoices can be viewed in two representations:
  * Card view
  * Table view.
* User can add, view, edit and delete an invoice.
* Invoices are stored in Firebase real-time database.
* Redux-toolkit is used for state management.
* Invoice can be downloaded as PDF to the device.

### Live Demo
https://abc-invoice-management-system.netlify.app/

### Installation

```
git clone https://github.com/s4shreya/abc-invoice-management-system.git

npm install

npm start / npm run build
```
