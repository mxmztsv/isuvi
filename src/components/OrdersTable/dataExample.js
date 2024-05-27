export const orders = [
	{
		id: 'INV-1234',
		date: 'Feb 3, 2023',
		status: 'Refunded',
		customer: {
			initial: 'O',
			name: 'Olivia Ryhe',
			email: 'olivia@email.com',
		},
	},
	{
		id: 'INV-1233',
		date: 'Feb 3, 2023',
		status: 'Paid',
		customer: {
			initial: 'S',
			name: 'Steve Hampton',
			email: 'steve.hamp@email.com',
		},
	},
	{
		id: 'INV-1232',
		date: 'Feb 3, 2023',
		status: 'Refunded',
		customer: {
			initial: 'C',
			name: 'Ciaran Murray',
			email: 'ciaran.murray@email.com',
		},
	},
	{
		id: 'INV-1231',
		date: 'Feb 3, 2023',
		status: 'Refunded',
		customer: {
			initial: 'M',
			name: 'Maria Macdonald',
			email: 'maria.mc@email.com',
		},
	},
	{
		id: 'INV-1230',
		date: 'Feb 3, 2023',
		status: 'Cancelled',
		customer: {
			initial: 'C',
			name: 'Charles Fulton',
			email: 'fulton@email.com',
		},
	},
	{
		id: 'INV-1229',
		date: 'Feb 3, 2023',
		status: 'Cancelled',
		customer: {
			initial: 'J',
			name: 'Jay Hooper',
			email: 'hooper@email.com',
		},
	},
];

export const tasksStub = [
	{
		"id": 1,
		"description": "Тестовое описание",
		"executor": {
			"id": 1,
			"login": "test_login",
			"name": "Юрий",
			"role": {
				"id": 1,
				"name": "Администратор"
			}
		},
		"cataclysm": {
			"id": 2,
			"place": "Санкт-Петербург",
			"time": "12:30:23",
			"description": "Описание катаклизма",
			"type": {
				"id": 1,
				"name": "Средний"
			}
		},
		"status": {
			"id": 1,
			"name": "Выполнено"
		}
	},
	{
		"id": 2,
		"description": "Тестовое описание",
		"executor": {
			"id": 3,
			"login": "test_login",
			"name": "Юрий",
			"role": {
				"id": 1,
				"name": "Администратор"
			}
		},
		"cataclysm": {
			"id": 4,
			"place": "Санкт-Петербург",
			"time": "12:30:23",
			"description": "Описание катаклизма",
			"type": {
				"id": 1,
				"name": "Уничтожение"
			}
		},
		"status": {
			"id": 1,
			"name": "Провалено"
		}
	},
	{
		"id": 3,
		"description": "Тестовое описание",
		"executor": {
			"id": 15,
			"login": "test_login",
			"name": "Юрий",
			"role": {
				"id": 1,
				"name": "Администратор"
			}
		},
		"cataclysm": {
			"id": 156,
			"place": "Санкт-Петербург",
			"time": "12:30:23",
			"description": "Описание катаклизма",
			"type": {
				"id": 1,
				"name": "Слабый"
			}
		},
		"status": {
			"id": 1,
			"name": "Активно"
		}
	},
	{
		"id": 4,
		"description": "Тестовое описание",
		"executor": {
			"id": 561,
			"login": "test_login",
			"name": "Юрий",
			"role": {
				"id": 1,
				"name": "Администратор"
			}
		},
		"cataclysm": {
			"id": 1123,
			"place": "Санкт-Петербург",
			"time": "12:30:23",
			"description": "Описание катаклизма",
			"type": {
				"id": 1,
				"name": "Слабый"
			}
		},
		"status": {
			"id": 1,
			"name": "Активно"
		}
	},
]
