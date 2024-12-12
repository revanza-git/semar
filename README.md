# SEMAR Admin

Welcome to the SEMAR Admin project! This README will guide you through the setup process step-by-step.

## Project Overview

SEMAR is a dashboard to manage policy documents for the NR organization.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Git](https://git-scm.com/)

## Setup Instructions

Follow these steps to set up the SEMAR Admin project:

1. **Clone the Repository**

```sh
git clone https://github.com/revanza-git/semar-admin.git
cd semar
```

2. **Install Dependencies**

```sh
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run Database Migrations**
   Ensure your database is set up and configured correctly. Then run:

```sh
npm run migrate
```

5. **Start the Development Server**

```sh
npm start
```

6. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000` to access the SEMAR Admin interface.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact [support@semaradmin.com](mailto:support@semaradmin.com).

Thank you for using SEMAR Admin!
