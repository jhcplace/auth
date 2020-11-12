const http = require('http');
const fs = require('fs');
const port = 53134;

http.createServer((req, res) => {
	let responseCode = 404;
	let content = '404 Error';

	if (req.url === '/') {
		responseCode = 200;
		content = fs.readFileSync('./index.html');
	}

	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	res.write(content);
	res.end();
})
	.listen(port);

function generateRandomString() {
	const rand = Math.floor(Math.random() * 10);
	let randStr = '';

	for (let i = 0; i < 20 + rand; i++) {
		randStr += String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	return randStr;
}

// ...

// generate and store the string
const randStr = generateRandomString();
localStorage.setItem('stateParameter', randStr);

document.getElementById('login').href += `&state=${btoa(randStr)}`;

const fragment = new URLSearchParams(window.location.hash.slice(1));

if (fragment.has('access_token')) {
	const urlState = fragment.get('state');
	const stateParameter = localStorage.getItem('stateParameter');
	if (stateParameter !== atob(decodeURIComponent(urlState))) {
		return console.log('You may have been clickjacked!');
	}
}

const url = require('url');

// ...

const urlObj = url.parse(req.url, true);

if (urlObj.query.code) {
	const accessCode = urlObj.query.code;
	console.log(`The access code is: ${accessCode}`);
}

if (urlObj.pathname === '/') {
	responseCode = 200;
	content = fs.readFileSync('./index.html');
}

const fetch = require('node-fetch');

// ...

const data = {
	client_id: '775975006962188338',
	client_secret: 'TdacdlkSErgON2OC2KN0P4z_8ZxaPfWz',
	grant_type: 'authorization_code',
	redirect_uri: 'https://discord.com/api/oauth2/authorize?client_id=775975006962188338&redirect_uri=https%3A%2F%2Fjhcplace.github.io%2Fauth%2F&response_type=code&scope=identify',
	code: accessCode,
	scope: 'the scopes',
};

fetch('https://discord.com/api/oauth2/token', {
	method: 'POST',
	body: new URLSearchParams(data),
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
})
	.then(res => res.json())
	.then(console.log);

fetch('https://discord.com/api/oauth2/token', {
	method: 'POST',
	body: data,
})
	.then(res => res.json())
	.then(info => fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: `${info.token_type} ${info.access_token}`,
		},
	}))
	.then(console.log);
