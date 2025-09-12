const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
//this file is requires jsut because if there is any error int he requestHandler(an async function) it can be caught. beacuse express by default does not catches these errors
//so this snipppet just runs the async requesthandler and catches the errors if any.

export { asyncHandler }