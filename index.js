'use strict';

const request = require('request');

exports.handler = (event, context, callback) => {
	const account = process.env.JIRA_ACCOUNT;
	const username1 = process.env.JIRA_USER;
	const password1 = process.env.JIRA_PASS;
	const issue_type = process.env.JIRA_ISSUE_TYPE_ID; //"10001";
	const project_key = process.env.JIRA_PROJECT_KEY;

	const apiUrl = "https://"+account+".atlassian.net/rest/api/2/issue/";
	const auth = "Basic " + new Buffer(username1 + ":" + password1).toString("base64");

	request({
		url: apiUrl,
		headers: {
			"Authorization": auth
		},
		method: 'POST',
		json: {
			"fields": {
				"project": {
					"key": project_key
				},
				"summary": "QA Page",
				"description": "# Create new Page",
				"issuetype": {
					"id": issue_type
				}
			}
		}
	}, (error, resp, body) => {
		if (body.errors) {
			console.log('error',body.errors);
		} else {
			console.log('success');
		}
	});
};
