import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SimpleUrlApi implements ICredentialType {
	name = 'simpleUrlApi';
	displayName = 'SimpleURL API';
	documentationUrl = 'https://simpleurl.tech/docs/api-keys';
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
			placeholder: 'Enter your API key',
			description: 'Your SimpleURL API key from https://simpleurl.tech/dashboard/api-keys',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://simpleurl.tech',
			required: true,
			description: 'The base URL of your SimpleURL instance (without /api/v1)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/short-urls',
			method: 'GET',
		},
	};
}
