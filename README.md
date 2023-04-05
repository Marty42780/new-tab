# New-Tab

## How it works

The project consists of two necessary parts, the Chrome extension and the Docker container.
Their uses are written below along with installation instructions.

### Extension

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Marty42780/new-tab?label=%F0%9F%93%A6%20Last%20Release)

- Clock, date and weather _(weather fetched on backend)_.
- Discord friend activity _(fetched on backend)_.
- Shortcuts _(fetched on backend)_.

### Back-End

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Marty42780/new-tab/main_docker_build.yml?label=Docker%20Build&logo=docker)

- All apis (weather, discord, shortcuts, ...) centralized on a single url.
- Redirection to a new window for some shortcuts.
- Data storage, not modifiable for the moment (you have to modify the files yourself).

Go to [Data Storage files Explanation](backend/data-storage.md) for more information on the user data.

## Installation

### Extension

- Go the [the last release page](https://github.com/Marty42780/new-tab/releases/latest)
- Download the `new-tab-unpacked.zip` file
- Go to `chrome://extension`, activate the developer tools and load the downloaded file as a unpacked extension.

### Backend

See [Docker Hub Repository](https://hub.docker.com/r/marty42/new-tab)

After installing Docker, run this:

```bash
docker run -d \
    -p 8080:8080 \ # You can change the output port
    -v path/to/storage:/usr/src/app/storage \
    --restart unless-stopped \
    marty42/new-tab:latest
```

Note: replace `/path/to/storage` with where you want to store user data files

Go to [Data Storage files Explanation](backend/data-storage.md) for more information on the user data.

### Run locally

### Extension

```bash
cd extension
npm install
npm run dev
```

### Backend

```bash
cd backend
npm run install
npm run dev
```
