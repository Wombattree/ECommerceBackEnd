const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const notFoundResponse = `No product was found with this id.`;

router.get('/', async (req, res) => 
{
  try
  {
    const data = await Product.findAll({ include: [{ model: Category }, { model: Tag, through: ProductTag, as: "product_on_tag" }] });
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
  try
  {
    const data = await Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Tag, through: ProductTag, as: "product_on_tag" }] });

    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    else res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
  try
  {
    const data = await Product.create(req.body);
    if (req.body.tagIds.length)
    {
      const productTagIdArray = req.body.tagIds.map((tag_id) => { return { product_id: data.id, tag_id }; });
      ProductTag.bulkCreate(productTagIdArray);
    }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) =>
{
  try
  {
    const data = await Product.update(req.body, { where: { id: req.params.id }});
    if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id }});

    // Get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // Create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => productTagIds.includes(tag_id) === false)
      .map((tag_id) => { return { product_id: req.params.id, tag_id, }; });
    // Figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => req.body.tagIds.includes(tag_id) === false)
      .map(({ id }) => id);

    await ProductTag.destroy({ where: { id: productTagsToRemove } });
    await ProductTag.bulkCreate(newProductTags);

    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
  try
  {
    const data = await Product.destroy({ where: { id: req.params.id }});
    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

module.exports = router;
