import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SimpleUrlApi implements ICredentialType {
	name = 'simpleUrlApi';
	displayName = 'SimpleURL API';
	documentationUrl = 'https://simpleurl.tech/docs/api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your SimpleURL API key (starts with sk_live_)',
			placeholder: 'sk_live_abc123...',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://simpleurl.tech',
			required: true,
			description: 'The base URL of your SimpleURL instance',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/short-urls?page=1&pageSize=1',
			method: 'GET',
		},
	};
}
