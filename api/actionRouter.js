const express = require('express')
const actionModel = require("../data/helpers/actionModel");

const router = express.Router()

router.get('/:id' , validateActionId, (req, res) => {
    actionModel.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to loa project"})
    })
})

router.delete('/:id', validateActionId, (req, res) => {
    actionModel.remove(req.params.id)
    .then(del => {
        res.status(200).json(del)
    })
    .catch(() => {
        res.status(500).json({errorMessage: "Failed to delete"})
    })
})

function validateActionId(req, res, next) {
    actionModel.get(req.params.id)
    .then(action => {
        if(action) {
            next()
        }else {
            res.status(500).json({errorMessage:"Failed to find ID"})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:"Failed to find Id", err})
    })
}

module.exports = router;