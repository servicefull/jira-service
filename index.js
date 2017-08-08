'use strict';

exports.handler = (event, context, callback) => {

    // PARSE MESSAGE
	const p = event.Records[0].Sns.Message;
	const payload = JSON.parse(p);

	const request = require('request');
	const account = process.env.JIRA_ACCOUNT;
	const username1 = process.env.JIRA_USER;
	const password1 = process.env.JIRA_PASS;
	const issue_type = process.env.JIRA_ISSUE_TYPE_ID; //"10001";
	const project_key = process.env.JIRA_PROJECT_KEY;

	const apiUrl = "https://"+account+".atlassian.net/rest/api/2/issue/";
	const auth = "Basic " + new Buffer(username1 + ":" + password1).toString("base64");

	const postData = {
    	"fields": {
    		"project": {
    			"key": project_key
    		},
    		"summary": "QA Page : "+payload.pageUrl+" : "+payload.size,
    		"description": "# QA Page : (screenshot loacted here: https://s3.amazonaws.com/"+payload.s3Bucket+"/"+payload.fileName+")",
    		"issuetype": {
    			"id": issue_type
    		}
    	}
	}

	request({
		url: apiUrl,
		headers: {
			"Authorization": auth
		},
		method: 'POST',
		json: postData
	}, (error, resp, body) => {
		callback(null, 'success');
	});
};
