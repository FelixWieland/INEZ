import * as db from './../dbRequests'
import chai, { expect } from 'chai'
import resnap from 'resnap'

db.createUser('Felix Wieland', '123', () => {
    console.log('ok')
})


// db.createShoppingList('Felix Wieland', 'EinkaufsListe2', (err, result) => {
//     console.log(err, result)
// })

// db.createShoppingListGroup('5d6a692ebb7b6414e614b6c6', 'Group1', (err, result) => {
//     console.log(result)
// })

// db.addProductToShoppingList('5d6a692ebb7b6414e614b6c6', 'Group1', '5d60503e25e690b4eefece01', 'Produktname', 'gramm', 100, (data) => {
//     console.log(data)
// })


// db.removeProductFromShoppingList('5d6a692ebb7b6414e614b6c6', 'Group1', '5d60503e25e690b4eefece04', (data) => {
//     console.log(data)
// })

// db.getPasswordhash('Felix Wieland', (err, result) => {
//     console.log(result)
// })

// db.deleteShoppingListGroup('5d6a692ebb7b6414e614b6c6', 'Group1', (err, result) => {
//     console.log(err)
// })


// db.getAllItemsInShoppingList('5d6a692ebb7b6414e614b6c6', (err, result) => {
//     console.log(result)
// })


// db.updateProductInGroup('5d6a692ebb7b6414e614b6c6', 'Group1', {
//     _id: '5d60503e25e690b4eefece04',
//     name: 'Name',
//     measure: 'g',
//     amount: 200,
//     checked: true,
// }, (err, result) => {
//     console.log(err, result)
// })

// db.getShoppingLists("Felix Wieland", (err, result) => {
//     console.log(result)
// })
