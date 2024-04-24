const userService = require('../entities/user/service');
const jwt = require('jsonwebtoken');
const { cookieName } = require('../common/constants');


const userExpenses = async (req, res) => {
    try {
        // get the user from the request, that was put there with our jwtAuthentication middleware
        const user = req.user;
        console.log('pre DB');
        console.dir(user);
        const userWithExpenses = await userService.readUserWithExpensesByUserId(user.user_id);

        console.log('post DB');
        if (userWithExpenses == null) {
            // this should not happen, as we are getting the user from the token
            // which was created when the user was signing in, so we would expect that the user MUST exist
            return res.status(401).json({message: 'Server error, tracking token for non-existing user'});
        }

        console.log('DB res:');
        console.dir(userWithExpenses);
        // We can tell, based on the query, that the result will always have atleast 1 entry with `username` present
        const username = userWithExpenses[0].username;
        const expenses = userWithExpenses.map(e => ({
            expense_id: e.expense_id,
            amount: e.amount,
            paid_at: e.paid_at,
            category_name: e.category_name
        }));
        if (expenses[0].expense_id == null) {
            return res.status(200).json({username: username, user_expenses: []});
        } else {
            return res.status(200).json({username: username, user_expenses: expenses});
        }
    } catch(err) {
        console.dir(err);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    userExpenses,
}