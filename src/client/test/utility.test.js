import {
    extractFirstMeasure, extractMeasureObj, buildStringFromMeasureObj,
    capitalizeFirstLetter, capitalizeMeasure, getSingularBasedOnMeasure, getPluralBasedOnMeasure,
} from '../utility'
import chai, { expect } from 'chai'
import resnap from 'resnap'

describe('#extractFirstMeasure', () => {
    context('without arguments', () => {
        it('should throw error', () => {
            expect(() => extractFirstMeasure()).to.throw()
        })
    })
    context('with non string', () => {
        it('should throw error', () => {
            expect(() => extractFirstMeasure(1337)).to.throw()
        })
    })
    context('with non measure in string', () => {
        it('should return false', () => {
            expect(extractFirstMeasure('Müller Milch')).to.eql(false)
        })
    })
    context('with correct measure', () => {
        it('should return the correct measure', () => {
            expect(extractFirstMeasure('Liter Müller Milch')).to.eql('liter')
        })
    })
    context('with correct measure but ending word with measure', () => {
        it('should return the correct measure', () => {
            expect(extractFirstMeasure('Packung Milch')).to.eql('packung')
        })
    })
    context('with plural measure', () => {
        it('should return the correct measure', () => {
            expect(extractFirstMeasure('Packungen Milch')).to.eql('packungen')
        })
    })
})

describe('#extractMeasureObj', () => {
    context('without arguments', () => {
        it('should return a measure object with empty props', () => {
            expect(extractMeasureObj()).to.eql(
                { amount: 0, measure: '', product: '' })
        })
    })
    context('with non string', () => {
        it('should return a measure object with empty props', () => {
            expect(extractMeasureObj(1337)).to.eql(
                { amount: 0, measure: '', product: '' })
        })
    })
    context('with empty string', () => {
        it('should return a measure object with empty props', () => {
            expect(extractMeasureObj('')).to.eql(
                { amount: 0, measure: '', product: '' })
        })
    })
    context('without amount and measure', () => {
        it('should return a measure object with product filled and amount eq 1', () => {
            expect(extractMeasureObj('Müller Milch')).to.eql(
                { amount: 1, measure: '', product: 'Müller Milch' })
        })
    })
    context('with amount and without measure', () => {
        it('should return a measure object with product filled and amount eq given amount', () => {
            expect(extractMeasureObj('60 Müller Milch')).to.eql(
                { amount: 60, measure: '', product: 'Müller Milch' })
        })
    })
    context('without amount but with measure', () => {
        it('should return a measure object with product filled and measure eq given measure and amount eq 1', () => {
            expect(extractMeasureObj('Liter Müller Milch')).to.eql(
                { amount: 1, measure: 'liter', product: 'Müller Milch' })
        })
    })
    context('without plural measure', () => {
        it('should return a measure object with product filled and measure eq the singular of given measure', () => {
            expect(extractMeasureObj('2 Packungen Müller Milch')).to.eql(
                { amount: 2, measure: 'packung', product: 'Müller Milch' })
        })
    })
    context('with large number', () => {
        it('should return a measure object with product filled and and amount eq given amount', () => {
            expect(extractMeasureObj('2000 g Müller Milch')).to.eql(
                { amount: 2000, measure: 'g', product: 'Müller Milch' })
        })
    })
    context('with only number', () => {
        it('should return a measure object with product filled and and amount eq given amount', () => {
            expect(extractMeasureObj('2000')).to.eql(
                { amount: 2000, measure: '', product: '' })
        })
    })
})

describe('#buildStringFromMeasureObj', () => {
    context('without arugments', () => {
        it('should return a empty string', () => {
            expect(buildStringFromMeasureObj()).to.eql('')
        })
    })
    context('with correct measureObj', () => {
        it('should return a product string', () => {
            expect(buildStringFromMeasureObj(extractMeasureObj('20 Liter Müller Milch'))).to.eql(
                '20 liter Müller Milch')
        })
    })
    context('with correct measureObj but without measure', () => {
        it('should return a product string', () => {
            expect(buildStringFromMeasureObj(extractMeasureObj('20 Müller Milch'))).to.eql(
                '20 Müller Milch')
        })
    })
    context('with correct measureObj but without amount', () => {
        it('should return a product string', () => {
            expect(buildStringFromMeasureObj(extractMeasureObj('Liter Müller Milch'))).to.eql(
                '1 liter Müller Milch')
        })
    })
    context('with correct measureObj but only given product', () => {
        it('should return a product string', () => {
            expect(buildStringFromMeasureObj(extractMeasureObj('Müller Milch'))).to.eql(
                '1 Müller Milch')
        })
    })
})

describe('#capitalizeFirstLetter', () => {
    context('without arugments', () => {
        it('should return a empty string', () => {
            expect(capitalizeFirstLetter()).to.eql('')
        })
    })
    context('with non string param', () => {
        it('should return a empty string', () => {
            expect(capitalizeFirstLetter(1337)).to.eql('')
        })
    })
    context('starting with number', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeFirstLetter('1packung')).to.eql('1packung')
        })
    })
    context('starting with whitespace', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeFirstLetter(' packung')).to.eql(' packung')
        })
    })
    context('with correct param', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeFirstLetter('packung')).to.eql('Packung')
        })
    })
})

describe('#capitalizeMeasure', () => {
    context('without arugments', () => {
        it('should return a empty string', () => {
            expect(capitalizeMeasure()).to.eql('')
        })
    })
    context('with non string param', () => {
        it('should return a empty string', () => {
            expect(capitalizeMeasure(1337)).to.eql('')
        })
    })
    context('starting with number', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeMeasure('1packung')).to.eql('1packung')
        })
    })
    context('starting with whitespace', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeMeasure(' packung')).to.eql(' packung')
        })
    })
    context('with correct param length greater 2', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeMeasure('packung')).to.eql('Packung')
        })
    })
    context('with correct param length smaller 3', () => {
        it('should return a capitalized string', () => {
            expect(capitalizeMeasure('kg')).to.eql('kg')
        })
    })
})

describe('#getSingularBasedOnMeasure', () => {
    context('without plural', () => {
        it('should return input', () => {
            expect(getSingularBasedOnMeasure('g')).to.eql('g')
        })
    })
    context('with plural', () => {
        it('should return a singular', () => {
            expect(getSingularBasedOnMeasure('Packungen')).to.eql('packung')
        })
    })
    context('with singular', () => {
        it('should return input', () => {
            expect(getSingularBasedOnMeasure('Packung')).to.eql('packung')
        })
    })
})

describe('#getPluralBasedOnMeasure', () => {
    context('without plural', () => {
        it('should return input', () => {
            expect(getPluralBasedOnMeasure('g')).to.eql('g')
        })
    })
    context('with singular', () => {
        it('should return a plural', () => {
            expect(getPluralBasedOnMeasure('Packung')).to.eql('packungen')
        })
    })
    context('with plural', () => {
        it('should return input', () => {
            expect(getPluralBasedOnMeasure('packungen')).to.eql('packungen')
        })
    })
})

resnap()
