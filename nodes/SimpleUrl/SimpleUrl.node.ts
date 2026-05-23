import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class SimpleUrl implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SimpleURL',
		name: 'simpleUrl',
		icon: 'file:simpleurl.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with SimpleURL API to manage short URLs',
		defaults: {
			name: 'SimpleURL',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'simpleUrlApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resource selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Short URL',
						value: 'shortUrl',
					},
					{
						name: 'Analytics',
						value: 'analytics',
					},
					{
						name: 'QR Code',
						value: 'qrCode',
					},
				],
				default: 'shortUrl',
			},

			// ==========================================
			//         Short URL Operations
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['shortUrl'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new short URL',
						action: 'Create a short URL',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a short URL by keyword',
						action: 'Get a short URL',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all short URLs',
						action: 'List short URLs',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a short URL',
						action: 'Update a short URL',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a short URL',
						action: 'Delete a short URL',
					},
					{
						name: 'Batch Create',
						value: 'batchCreate',
						description: 'Create multiple short URLs at once',
						action: 'Batch create short URLs',
					},
				],
				default: 'create',
			},

			// ==========================================
			//         Create Short URL Fields
			// ==========================================
			{
				displayName: 'Long URL',
				name: 'url',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'https://example.com/my-long-url',
				description: 'The long URL to shorten',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'mylink',
				description: 'Custom keyword for the short URL (leave empty for auto-generation)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description for the short URL',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'simpleurl.tech',
						description: 'Custom branded domain',
					},
					{
						displayName: 'Is Public',
						name: 'isPublic',
						type: 'boolean',
						default: true,
						description: 'Whether the URL is public or private',
					},
					{
						displayName: 'Create QR Code',
						name: 'createQrCode',
						type: 'boolean',
						default: false,
						description: 'Whether to generate a QR code',
					},
				],
			},

			// ==========================================
			//         Get Short URL Fields
			// ==========================================
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				placeholder: 'mylink',
				description: 'The keyword of the short URL',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['get', 'delete'],
					},
				},
				default: 'simpleurl.tech',
				description: 'Domain of the short URL',
			},

			// ==========================================
			//         List Short URLs Fields
			// ==========================================
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['list'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['list'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 10,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search query to filter URLs by keyword or description',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: '',
						description: 'Filter by domain',
					},
				],
			},

			// ==========================================
			//         Update Short URL Fields
			// ==========================================
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'New destination URL',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'New description',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'simpleurl.tech',
						description: 'Domain of the short URL',
					},
				],
			},

			// ==========================================
			//         Batch Create Fields
			// ==========================================
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['shortUrl'],
						operation: ['batchCreate'],
					},
				},
				default: {},
				placeholder: 'Add URL',
				options: [
					{
						name: 'urlValues',
						displayName: 'URL',
						values: [
							{
								displayName: 'Long URL',
								name: 'url',
								type: 'string',
								default: '',
								required: true,
								description: 'The long URL to shorten',
							},
							{
								displayName: 'Keyword',
								name: 'keyword',
								type: 'string',
								default: '',
								description: 'Custom keyword (optional)',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description (optional)',
							},
							{
								displayName: 'Is Public',
								name: 'isPublic',
								type: 'boolean',
								default: true,
								description: 'Whether the URL is public',
							},
						],
					},
				],
			},

			// ==========================================
			//         Analytics Operations
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['analytics'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get analytics for a short URL',
						action: 'Get analytics',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['analytics'],
						operation: ['get'],
					},
				},
				default: '',
				placeholder: 'mylink',
				description: 'The keyword of the short URL',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['analytics'],
						operation: ['get'],
					},
				},
				options: [
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'simpleurl.tech',
						description: 'Domain of the short URL',
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date for analytics',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for analytics',
					},
				],
			},

			// ==========================================
			//         QR Code Operations
			// ==========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['qrCode'],
					},
				},
				options: [
					{
						name: 'Generate',
						value: 'generate',
						description: 'Generate QR code for a short URL',
						action: 'Generate QR code',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all QR codes',
						action: 'List QR codes',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['qrCode'],
						operation: ['generate'],
					},
				},
				default: '',
				placeholder: 'mylink',
				description: 'The keyword of the short URL',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['qrCode'],
						operation: ['generate'],
					},
				},
				default: 'simpleurl.tech',
				description: 'Domain of the short URL',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'shortUrl') {
					if (operation === 'create') {
						// Create short URL
						const url = this.getNodeParameter('url', i) as string;
						const keyword = this.getNodeParameter('keyword', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const body: any = {
							url,
						};

						if (keyword) body.keyword = keyword;
						if (additionalFields.description) body.description = additionalFields.description;
						if (additionalFields.domain) body.domain = additionalFields.domain;
						if (additionalFields.isPublic !== undefined) body.isPublic = additionalFields.isPublic;
						if (additionalFields.createQrCode) body.createQrCode = additionalFields.createQrCode;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'POST',
								url: '/api/v1/short-urls',
								body,
								json: true,
							},
						);

						returnData.push({ json: response.data });

					} else if (operation === 'get') {
						// Get short URL
						const keyword = this.getNodeParameter('keyword', i) as string;
						const domain = this.getNodeParameter('domain', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'GET',
								url: `/api/v1/short-urls/${keyword}`,
								qs: { domain },
								json: true,
							},
						);

						returnData.push({ json: response.data });

					} else if (operation === 'list') {
						// List short URLs
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const qs: any = {
							page: 1,
							pageSize: returnAll ? 100 : this.getNodeParameter('limit', i),
						};

						if (additionalFields.search) qs.search = additionalFields.search;
						if (additionalFields.domain) qs.domain = additionalFields.domain;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'GET',
								url: '/api/v1/short-urls',
								qs,
								json: true,
							},
						);

						const urls = response.data;
						urls.forEach((url: any) => returnData.push({ json: url }));

					} else if (operation === 'update') {
						// Update short URL
						const keyword = this.getNodeParameter('keyword', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as any;

						const body: any = {};
						if (updateFields.url) body.url = updateFields.url;
						if (updateFields.description) body.description = updateFields.description;
						if (updateFields.domain) body.domain = updateFields.domain;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'PUT',
								url: `/api/v1/short-urls/${keyword}`,
								body,
								json: true,
							},
						);

						returnData.push({ json: response.data });

					} else if (operation === 'delete') {
						// Delete short URL
						const keyword = this.getNodeParameter('keyword', i) as string;
						const domain = this.getNodeParameter('domain', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'DELETE',
								url: `/api/v1/short-urls/${keyword}`,
								qs: { domain },
								json: true,
							},
						);

						returnData.push({ json: { success: true, keyword, message: response.message } });

					} else if (operation === 'batchCreate') {
						// Batch create short URLs
						const urls = this.getNodeParameter('urls', i) as any;

						const body = {
							urls: urls.urlValues || [],
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'POST',
								url: '/api/v1/short-urls/batch',
								body,
								json: true,
							},
						);

						returnData.push({ json: response });
					}

				} else if (resource === 'analytics') {
					if (operation === 'get') {
						// Get analytics
						const keyword = this.getNodeParameter('keyword', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as any;

						const qs: any = {};
						if (additionalFields.domain) qs.domain = additionalFields.domain;
						if (additionalFields.startDate) {
							qs.startDate = new Date(additionalFields.startDate).toISOString().split('T')[0];
						}
						if (additionalFields.endDate) {
							qs.endDate = new Date(additionalFields.endDate).toISOString().split('T')[0];
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'GET',
								url: `/api/v1/analytics/${keyword}`,
								qs,
								json: true,
							},
						);

						returnData.push({ json: response.data });
					}

				} else if (resource === 'qrCode') {
					if (operation === 'generate') {
						// Generate QR code
						const keyword = this.getNodeParameter('keyword', i) as string;
						const domain = this.getNodeParameter('domain', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'POST',
								url: `/api/v1/qr-codes/${keyword}`,
								body: { domain },
								json: true,
							},
						);

						returnData.push({ json: response.data });

					} else if (operation === 'list') {
						// List QR codes
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'simpleUrlApi',
							{
								method: 'GET',
								url: '/api/v1/qr-codes',
								qs: { page: 1, pageSize: 100 },
								json: true,
							},
						);

						const qrCodes = response.data;
						qrCodes.forEach((qr: any) => returnData.push({ json: qr }));
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
