const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const notFoundResponse = `No tag was found with this id.`;

router.get('/', async (req, res) => 
{
  try
  {
    const data = await Tag.findAll({ include: [{ model: Product, through: ProductTag, as: "tag_on_product" }] });
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) => 
{
  try
  {
    const data = await Tag.findByPk(req.params.id, { include: [{ model: Product, through: ProductTag, as: "tag_on_product" }] });

    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    else res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
  try
  {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
  try
  {
    const data = await Tag.update(req.body, { where: { id: req.params.id }});
    if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
  try
  {
    try
    {
      const data = await Tag.destroy({ where: { id: req.params.id }});
      if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
      res.status(200).json(data);
    }
    catch (error) { res.status(500).json(error); }
  }
  catch (error) { res.status(500).json(error); }
});

module.exports = router;
