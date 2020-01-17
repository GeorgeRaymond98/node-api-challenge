const express = require("express")

const actionModel = require("../data/helpers/actionModel")
const projectModel = require("../data/helpers/projectModel")

const router = express.Router()

router.get('/', (req, res) => {
    projectModel.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to get project"})
    })
})

router.get("/:id/actions", validateProjectId, (req, res) => {
    projectModel.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to get action"})
    })
})

router.post("/:id/actions", validateProjectId, (req, res) => {
    actionModel.insert({... req.body, project_id: req.params.id})
    .then(addAction => {
        res.status(200).json(addAction)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to add action "})
    })
})

router.put("/:id", validateProjectId, (req, res) => {
    projectModel.update(req.params.id , req.body)
    .then(updateProject => {
        res.status(200).json(updateProject)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to update project"})
    })
})

router.delete("/id", validateProjectId, (req, res) => {
    projectModel.remove(req.params.id)
    .then(del => {
        res.status(200).json(del)
    })
    .catch(() => {
        res.status(500).json({errorMessage:"Failed to Delete"})
    })
})

function validateProjectId(req, res, next) {
    projectModel.get(res.params.id)
    .then(project => {
        if(project) {
            next()
        }
        else {
            res.status(500).json({errorMessage: "Failed to get ID"})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Faild to get ID  "})
    })
}

module.exports = router