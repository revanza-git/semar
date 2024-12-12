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

4. **Configure Folder Upload Path**
   Create folders for uploads. Run the following commands to create the necessary directories inside the `inetpub` directory:

```sh
mkdir -p inetpub/data/uploads/semar
mkdir -p inetpub/data/template/semar
```

5. **Run Database Migrations**
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

We welcome contributions! Please contact your IT support if you want to contribute.

## License

This project is proprietary of Nusantara Regas Corporation.

## Contact

For any questions or support, please contact [it.supportnr@pertamina.com](mailto:it.supportnr@pertamina.com).

Thank you for using SEMAR Admin!
