export const objectToString = (document, maxStringLength, depth) => {
    if (maxStringLength == null) maxStringLength = 64
    if (depth == null) depth = 0
    return (depth > 0 ? '\n' : '') + Object.keys(document)
        .map(key => {
            // Get the value
            let value = document[key]
            // Truncate if string
            if (typeof value === typeof '' && value.length > maxStringLength)
                value = value.slice(0, maxStringLength) + '...'
            // Recurse if object
            if (typeof value === typeof {})
                value = objectToString(value, maxStringLength - 2, depth + 1)
            // Return the prop string
            return ('  '.repeat(depth)) + key + ': ' + value
        })
        .join('\n')
}