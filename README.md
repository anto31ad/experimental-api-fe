# Experimental API front-end

This is a front end application for [Experimental API](https://github.com/anto31ad/experimental-api).

## Installation

### 0. Prerequisites

To clone and run the project, the following programs need to be installed on your operating system:

- [nodejs](https://nodejs.org/en) (version 20.16.0 or above)
    - npm v. 10.8.1 or above
- git
- a browser (ex. Chrome, Firefox, other Chromium-based, etc.)
- a code editor (VSCode is recommended for ease of configuration)

### 1. Clone

To clone this repository using HTTP:
1. open a terminal
2. change the current directory to a container directory of choice (es. Documents)
3. run (and wait)

```
git clone https://github.com/anto31ad/experimental-api-fe.git
```

4. open the directory `experimental-api-fe` with the editor of choice.

NOTE: `experimental-api-fe` is said to be the root directory of the project.

### 2. Install dependencies

Open a terminal (making sure the current directory is the root directory) and run

```
npm install
```

This will install all the local dependencies of the project.  

### 3. dotenv

Make a copy of `.env.sample` and rename it to just `.env`.

This file is useful for configurations on the fly such as
- enabling testing modes (like *stub mode*)
- setting up the host and port addresses of the backend to connect to (when not in *stub mode*)

## Run (development mode)

There are two ways to run the app:

- **stub mode**, when you want to test this app without a backend, using fictuous data (stored in `public/`);
- **normal mode**, when you want this app to fetch data from an active backend.

### Run in stub mode

To see the project run without an active backend (stub mode):

1. make sure `VITE_STUB_MODE` is set to `true` in `.env`
2. execute (in the project root directory)

```bash
npm run dev
```

3. Go to [localhost:3000 (HTTP)](http://localhost:3000)
4. Have fun playing around!


### Run in normal mode (on the same device)

Assuming you're testing on the same device, these are the steps:

In `.env` set

```conf
VITE_API_BASE_URL=http://localhost
VITE_API_PORT=8000
VITE_STUB_MODE=false
```

When done:

1. start the backend with host `localhost` and port `8000` (see [here](https://github.com/anto31ad/experimental-api))
2. start this app with

```bash
npm run dev
```

3. Go to [localhost:3000 (HTTP)](http://localhost:3000)
4. Have fun playing around!

## Licence

This project is currently released under the [MIT Licence](./LICENCE.txt).
