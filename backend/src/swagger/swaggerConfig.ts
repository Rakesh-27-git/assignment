const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Task Management API',
        version: '1.0.0',
        description: 'A Scalable REST API with Authentication & Role-Based Access Control',
    },
    servers: [
        {
            url: 'http://localhost:5000/api',
            description: 'Local development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    _id: { type: 'string', readOnly: true },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
                    userId: { type: 'string', readOnly: true },
                    assignedTo: { type: 'string' },
                    createdByAdmin: { type: 'boolean', readOnly: true },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    paths: {
        '/v1/auth/register': {
            post: {
                tags: ['Authentication'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string', minLength: 8 },
                                    role: { type: 'string', enum: ['user', 'admin'] },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'User created successfully' },
                    400: { description: 'Invalid input or user already exists' },
                },
            },
        },
        '/v1/auth/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Login to get access token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Login successful' },
                    401: { description: 'Invalid credentials' },
                },
            },
        },
        '/v1/tasks': {
            get: {
                tags: ['Tasks'],
                summary: 'Get all tasks',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'List of tasks',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer' },
                                        data: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Task' },
                        },
                    },
                },
                responses: {
                    201: { description: 'Task created' },
                },
            },
        },
        '/v1/tasks/{id}': {
            get: {
                tags: ['Tasks'],
                summary: 'Get a single task',
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: {
                    200: { description: 'Task found' },
                    404: { description: 'Task not found' },
                },
            },
            put: {
                tags: ['Tasks'],
                summary: 'Update a task',
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
                },
                responses: {
                    200: { description: 'Task updated' },
                    403: { description: 'Forbidden - Cannot update admin-created task' },
                    404: { description: 'Task not found' },
                },
            },
            delete: {
                tags: ['Tasks'],
                summary: 'Delete a task',
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: {
                    200: { description: 'Task deleted' },
                    403: { description: 'Forbidden - Cannot delete admin-created task' },
                    404: { description: 'Task not found' },
                },
            },
        },
    },
};

export default swaggerDocument;
