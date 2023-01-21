const { User, Thought } = require("../models")

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought ID found!" });
                    return;
                }
                res.json(dbThoughtData)
            }).catch((err) => {
                res.status(500).json(err)
            });
    },

    createThought({ params }, res) {
        Thought.create(body)
            .then((_id) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            }).then((dbUserData) => {
                if (!dbUserData) {
                res.status(404).json({ message: "No User ID found!" });
                return;
             }
             res.json(dbThoughtData);
            }).catch((err) => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
          })
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                res.status(404).json({ message: "No Thought ID found!" });
                return;
              }
              res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No Thought ID found!" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    //reactions functions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
}

module.exports = thoughtController;