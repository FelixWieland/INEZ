
export const ddmmyyyy = () => {
    const dt = new Date()
    const mm = dt.getMonth() + 1 // getMonth() is zero-based
    const dd = dt.getDate()
    return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        dt.getFullYear(),
    ].join('.')
}

export const extractFirstMeasure = (measureString) => {
    if (measureString === undefined) throw new Error('measureString is undefined')
    if (typeof measureString !== 'string') throw new Error('measureString is not a string')

    const lowerMeasureString = measureString.toLowerCase()
    const measures = ['g', 'gramm', 'l', 'ml', 'liter', 'pack', 'tüte', 'tetrapack']

    for (const key in measures) {
        if (lowerMeasureString.toLowerCase().includes(measures[key] + ' ')) {
            return measures[key]
        }
    }
    return false
}

export const extractMeasureObj = (measureString) => {
    const measureObj = {
        amount: 0,
        measure: '',
        product: '',
    }

    if (measureString === undefined) return measureObj
    if (typeof measureString !== 'string') return measureObj
    if (measureString.length === 0) return measureObj

    const extractedMeasure = extractFirstMeasure(measureString)

    if (!(/^[\d]/).test(measureString) && !extractedMeasure) {
        measureObj.amount = 1
        measureObj.product = measureString
        return measureObj
    }

    if (!(/^[\d]/).test(measureString) && extractedMeasure) {
        measureObj.amount = 1
    } else {
        measureObj.amount = parseInt(measureString.trim().replace(/(^\d+)(.+$)/i, '$1'))
    }

    measureObj.product = measureString.replace(measureObj.amount, '').trim()

    if (!extractedMeasure) return measureObj

    measureObj.measure = extractedMeasure
    measureObj.product = measureObj.product
        .replace(new RegExp(extractedMeasure, 'i'), '')

    return extractedMeasure
}
