const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/mynoise', (req, res) => {
	const url = req.query.url;
	console.log(url)
	res.send(
		`<script>
			window.open("` + url + `", "_blank", "width=500,height=400");
			window.close();
    </script>
		`
	);
});

app.get('/shortcuts', (req, res) => {
	const userdata = JSON.parse(fs.readFileSync('storage/userdata.json', 'utf8'));
	const username = req.query.username;
	const apikey = req.query.apikey;
	if (!userdata[username]) {
		res.status(404).send('User not found');
	} else if (apikey !== userdata[username].apikey) {
		res.status(401).send('Invalid API key');
	} else {
		res.send(userdata[username].shortcuts);
	}
});


app.listen(8080, function () {
	console.log("Listening on http://localhost:8080");
});