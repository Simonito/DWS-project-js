const readCategories = `
SELECT * FROM categories;
`;

const readCategory = `
SELECT * FROM categories WHERE category_id = $1;
`

module.exports = {
    readCategory,
    readCategories,
};