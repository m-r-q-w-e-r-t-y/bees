<<<<<<< HEAD
const express = require('express')
const jwt = require('jsonwebtoken')
=======
const express = require('express');
>>>>>>> develop
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/testcontroller');

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);

module.exports = router;