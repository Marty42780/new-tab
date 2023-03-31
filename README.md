# New-Tab

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Marty42780/new-tab/main_docker_build.yml?label=backend%20build&logo=github)

<!-- TODO: Add more Github badges. -->

## Extension

- Chrome extension with front-end and popup window.
- Token to access the back-end that can be entered and saved as a cookie.

### New-tab page

- Clock, date and weather _(weather fetched on backend)_.
- Discord friend activity _(fetched on backend)_.
- Shortcuts _(fetched on backend)_.

## Back-End

- All apis (weather, discord, shortcuts, ...) centralized on a single url.
- Redirection to a new window for some shortcuts.
- Data storage, editable through a database.
