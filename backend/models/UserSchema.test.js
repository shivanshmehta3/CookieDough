const AppSchema = require('./AppSchema');
const columnNames = require('./columnNames');

describe('Schema', () => {
	const schema = new AppSchema();
	const resultSchema = schema.getSchema();
	
	it('has an obj property', () => {
		expect(schema).toHaveProperty('obj');
	});
	describe('getSchema()', () => {
		it('returns obj property of Schema class', () => {
			expect(resultSchema).toEqual(schema.obj);
		});
	});
	
	describe('obj', () => {
		it('has an obj property', () => {
			expect(schema.obj).toHaveProperty(columnNames.USER_EMAIL, 'String');
		});
	})
});