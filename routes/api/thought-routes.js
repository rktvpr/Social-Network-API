const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route("/thoughts").get(getThoughts).post(createThought);

router
    .route("/thoughts/:id").get(getSingleThought).put(updateThought).delete(deleteThought);

router
    .route('/thoughts/:thoughtId/reactions').post(addReaction);

router
    .route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
