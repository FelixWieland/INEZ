import { extractFirstMeasure, extractMeasureObj } from '../utility'
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
                { amount: 1, measure: 'Liter', product: 'Müller Milch' })
        })
    })
})


resnap()
