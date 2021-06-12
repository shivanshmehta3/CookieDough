const handleError = require('./index');

describe('handleError()', () => {
	const req = {};
	const err = {
		status: 1234,
		message: 'dummy message'
	};
	const res = {
		status: jest.fn((val) => {}),
		json: jest.fn((val) => {})
	}
	const next = jest.fn((val) => {});
	
	const mockFn = jest.fn(handleError);
	mockFn(err, req, res, next);
	
	it('should be called with error, request, response and next arguments', () => {
		expect(mockFn).toHaveBeenCalled();
		expect(mockFn).toHaveBeenCalledWith(err, req, res, next);
	});
	
	it('should call res.status() with err.status as an argument.', () => {
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(err.status);
	});
	
	it('should call res.json() with proper message argument', () => {
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith({
			message: err.message,
			err
		});
	});
});