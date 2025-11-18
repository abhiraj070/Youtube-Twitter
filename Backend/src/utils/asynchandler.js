const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

//async handler is a high order function because it accepts another function as an input.
//this file is requires just because if there is any error int he requestHandler(an async function) it can be caught. beacuse express by default does not catches these errors
//so this snipppet just runs the async requesthandler and catches the errors if any.

//in the catch part: there ia an arrow function executed which is calling next(err) which directly jump to a error handling middleware. if there is no error handling middleware is present, express jumps back to its generic form and returns error 500.

export { asyncHandler };
