# Data Storage files

These files are used to store user data and configuration.  
If they are not present, the backend will create them.  
For now, the only way to modify them is to edit them manually.

- `info.json`

```json
{
  "discord_api_url": "https://discord.com/api/guilds/ --- /widget.json", // Findable on the discord server settings
  "weather_api_key": "Weather Service Api Key"
}
```

- `userdata.json`

```json
{
  "User1": {
    "username": "First User",
    "apikey": "abcdef",
    "weatherCityId": "OpenWeatherMap City Id",
    "shortcuts": [
      [
        {
          "name": "Google",
          "image": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg\">",
          "link": "https://google.com"
        }
        // More shortcuts ...
      ],
      [
        // Shortcuts on the second row ...
      ]
    ]
  },
  "User2": {
    // Repeat the same structure as User1
  }
}
```
