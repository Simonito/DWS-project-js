const categoryService = require('../entities/category/service');


const categories = async (req, res) => {
    try {
        const categories = await categoryService.readAll();
        if (categories == null) {
            return res.status(404).json({message: 'Server error, no categories found'});
        }

        return res.status(200).json({categories: categories});
    } catch(err) {
        console.dir(err);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    categories,
}