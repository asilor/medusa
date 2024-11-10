### Prerequisites

Ensure that you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/asilor/medusa
```

2. Navigate to the project directory:

```bash
cd medusa
```

3. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project directory. Add the necessary environment variables.

```plaintext
STORE_CORS=
ADMIN_CORS=
AUTH_CORS=
JWT_SECRET=
COOKIE_SECRET=
WORKER_MODE=server
DISABLE_MEDUSA_ADMIN=false
MEDUSA_BACKEND_URL=http://localhost:9000
DATABASE_URL=
REDIS_URL=
```

### Running in Development

Start the development server:

```bash
npm run dev
```

This will start the medusa server at http://localhost:9000 and the medusa admin at http://localhost:9000/app.

### Deployment

By commiting the changes the application will be automatically deployed.