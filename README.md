### Demo

https://www.school-admin.xyz \
Username- <mark>`admin@school-admin.com`</mark> \
Password- <mark>`3OU4zn3q6Zh9`</mark>

### Todos

- [x] Live deployment
- [ ] System stabilization
- [ ] Unit Testing
- [ ] Dockerize the project
- [x] Role based granular authorisation of CRUD action were possible
- [ ] New feature add and enhancement

## Table of Contents:

- [Table of Contents:](#table-of-contents)
- [Application Overview](#application-overview)
- [Project Standards](#project-standards)
- [Project Structure](#project-structure)
- [State management](#state-management)
- [Other Dependent Repos](#other-dependent-repos)

## Application Overview

This application is bootstrapped with `vite` and `react`. The system is multi-role based school management system.

There are three non-editable predefined roles (Admin, Student, Teacher). Admin can createas many as new editable roles from the system. For the system to be fully functional, first we need to run the sql script from [seed-db.sql](https://github.com/buddhagrg/school-admin-db/blob/master/seed-db.sql).

**Features** \
Below are the features that are available in the system upto now. Other features will be added as per the need and time availability.

- dashboard (user numbers couting by role, notices, celebrations for birthday/anniversary, upcoming one month leave, request new leave, etc )
- Leave define (add/edit/enable/disable/add people to leave policies)
- leave request (add/edit/delete leave requests)
- pending leave histories (approve/cancel leave requests)
- class (add/edit/delete/list classes)
- class teachers (add/edit/list class and teacher details)
- sections (add/edit/delete/list sections)
- students (add/edit/list students)
- notice (add/edit/delete/list/approve/reject notices)
- staff (add/edit/list staffs)
- departments (add/edit/list/delete)
- roles and permissions (add/edit/enable/disable roles, assign permissions to user)

## Project Standards

**Prettier** \
Prettier is a usefult tool to maintain uniform code format.

**Absolute imports** \
To avoid messy path imports, absolute path is always used for efficient coding practices.

**File naming conventions** \
While working with different OS system, `kebab-case` seems to be more efficient. So, we are enforcing `kebab-case` for file naming.

## Project Structure

Most of the code lives inside src folder and looks somewhat like this.

```sh
src
    |
    +-- assets          # assets containing application images, styles, etc
    +-- app             # main api slice and redux store config
    +-- components      # shared components
    |
    +-- domains         # domain based modules
    |   |
        +-- auth        # every needed and unshared modules are kept in their own module
            |
            +-- api
            +-- pages
            +-- slice
            +-- types
    +-- hooks           # shared hooks
    |
    +-- routes          # routes of app
    |
    +-- theme           # mui theme/style overriding
    |
    +-- utils           # shared utils
    |
    +-- app.tsx         # main application component
    |
    +-- constants.tsx   # global static constants
    |
    +-- main.tsx        # application entry point
    |
    +-- style.css
```

## State management

Component's own state are managed by the `useState` and `useReducer` hooks.

As the requirement of app grows, `redux-toolkit` is used for global store and `redux-persist` for store state persistence. `redux tookit query` has been a really game changer in the RTK family which has some really cool feature regarding auto hooks for the endpoints too.

**Form handling**

`react-hook-form` is used for form handling with `zod` integration for runtime validation.

## Other Dependent Repos

There are separate repos for api and database. \
API- https://github.com/buddhagrg/school-admin-api \
DB- https://github.com/buddhagrg/school-admin-db
