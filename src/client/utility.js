export const measures = [
    'g', 'gramm', 'l', 'ml', 'liter', 'pack', 'tüte',
    'tetrapack', 'packung', 'portion', 'flasche', 'becher',
    'wurst',
]

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

    // eslint-disable-next-line guard-for-in
    for (const key in measures) {
        const pluralMeasure = getPluralBasedOnMeasure(measures[key])
        if (lowerMeasureString.includes(pluralMeasure + ' ')) {
            if (new RegExp('(\d| | |\d |^)' + pluralMeasure, 'g').test(lowerMeasureString)) {
                return pluralMeasure
            }
        }
        if (lowerMeasureString.includes(measures[key] + ' ')) {
            if (new RegExp('(\d| | |\d |^)' + measures[key], 'g').test(lowerMeasureString)) {
                return measures[key]
            }
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

    if (/^\d+$/.test(measureString.trim())) {
        measureObj.amount = parseInt(measureString)
        return measureObj
    }

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

    measureObj.measure = getSingularBasedOnMeasure(extractedMeasure)
    measureObj.product = measureObj.product
        .replace(new RegExp(extractedMeasure, 'i'), '')
        .trim()

    return measureObj
}

export const buildStringFromMeasureObj = (measureObj) => {
    if (measureObj === undefined) return ''

    return ((measureObj.amount + ' ' + measureObj.measure).trim() + ' ' + measureObj.product).trim()
}

export const capitalizeFirstLetter = (s) => {
    if (s === undefined) return ''
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const capitalizeMeasure = (measure) => {
    if (measure === undefined) return ''
    if (typeof measure !== 'string') return ''

    return measure.length > 2
        ? capitalizeFirstLetter(measure)
        : measure
}

export const suggestPortionMeasure = (amount, portionMeasure) => {
    const isSmaller = (toCheck, measureInstead) => {
        return amount < toCheck ? {
            amount: amount,
            measure: measureInstead,
        } : {
                amount: amount,
                measure: portionMeasure,
            }
    }

    switch (portionMeasure.toLowerCase()) {
        case 'g': return isSmaller(20, 'Packung')
        case 'ml': return isSmaller(20, 'Flasche')
        case 'glas': return { amount: amount, measure: 'Flasche' }
        default: return false
    }
}


export const getPluralBasedOnAmount = (amount, measure) => {
    const lowerMeasure = measure.toLowerCase()
    const isGreaterOne = (instead) => amount > 1 ? instead : lowerMeasure
    switch (lowerMeasure) {
        case 'flasche': return isGreaterOne('flaschen')
        case 'packung': return isGreaterOne('packungen')
        case 'portion': return isGreaterOne('portionen')
    }
    return lowerMeasure
}

export const getPluralBasedOnMeasure = (measure) => {
    return getPluralBasedOnAmount(2, measure)
}

export const getSingularBasedOnMeasure = (measure) => {
    switch (measure.toLowerCase()) {
        case 'flaschen': return 'flasche'
        case 'packungen': return 'packung'
        case 'portionen': return 'portion'
    }
    return measure.toLowerCase()
}

export const normalizeMeasure = (measure) => {
    switch (measure.toLowerCase()) {
        case 'gramm': return 'g'
        case 'kilo': return 'kg'
        case 'liter': return 'l'
    }
    return measure
}
