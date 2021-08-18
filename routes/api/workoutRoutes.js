const router = require('express').Router();
const db = require("../../models");

router.get("/", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(exercise => {
                total += exercise.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

router.post("/", (req, res) => {
    db.Workout.create(req.body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

router.put("/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: req.params.id }, {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body }
    }, { upsert: true, new: true, setDefaultsOnInsert: true }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});

module.exports = router;