
const express = require('express') //express library
const { rawListeners } = require('../models/item') 
const router = express.Router() //router from express
const Item = require('../models/item') //import model -- which is item.js


// Getting all
router.get('/', async (req, res) => {
    try {
        const items = await Item.find() //get all the different items
        res.json(items) //send all the items to the user
    } catch (err) {
        res.status(500).json({ message: err.message }) //500 status means that there is an error with my server
    }
})

// Getting One
router.get('/:id', getItem, (req, res) => {
    res.json(res.item)
})

// Creating one
router.post('/', async (req, res) => {
    const item = new Item({ //js object
        itemName: req.body.itemName, //all of the item info that we get from the user
        goal: req.body.goal,
        price: req.body.price,
        url: req.body.url
    })
    try {
        const newItem = await item.save() //save the item to the database
        res.status(201).json(newItem) //send to user. 201 -- successfully created
      } catch (err) {
        res.status(400).json({ message: err.message }) //status 400 -- user error, bad data
      }
})

// Updating One
router.patch('/:id', getItem, async (req, res) => {
    if(req.body.itemName != null) { //check the request
        res.item.itemName = req.body.itemName //change current itemName to requested itemName
    }
    if(req.body.goal != null) { 
        res.item.goal = req.body.goal //change current goal to requested goal
    }
    if(req.body.price != null) {
        res.item.price = req.body.price //change current price to requested price
    }
    if(req.body.url != null) {
        res.item.url = req.body.url //change current url to requested url
    }

    try {
        const updatedItem = await res.item.save() //save the updated item info to the database
        res.json(updatedItem) //send back the updated item
    } catch (err) {
        res.status(400).json({ message: err.message }) //status 400 -- user error, bad data
    }
})
// Deleting One
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove() //remove the item from the database
        res.json({ message: 'Deleted item'}) //send message that it successfully deleted
    } catch (err) {
        res.status(500).json({ message: err.message }) //something went wrong on our end
    }
})

//getItem method

async function getItem(req, res, next) { //middleware function
    let item //declare item variable
    try {
        item = await Item.findById(req.params.id) //get the item by its id that has been passed
        if(item == null) {
            return res.status(404).json({ message: 'Cannot find item' }) //status 404 -- could not find item
        }
    } catch (err) {
       return res.status(500).json({ message: err.message }) //status 500 -- something wrong with my server
    }
    res.item = item //so that we can call res.item in other functions
    next() //move on to next request

}

module.exports = router