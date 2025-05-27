
const isRequired = (param) => {
    throw new Error(`${param} is required`)
}

export {
    isRequired
}