import { db } from '../data/store.js';

export const getAllArticles = (req, res, next) => {
  try {
    const { category, search, tag } = req.query;
    let list = db.get('articles');

    if (category && category !== 'All') {
      const cLower = category.toLowerCase();
      list = list.filter(a => a.category.toLowerCase() === cLower);
    }

    if (tag) {
      const tLower = tag.toLowerCase();
      list = list.filter(a => a.tags.some(t => t.toLowerCase() === tLower));
    }

    if (search) {
      const sLower = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(sLower) ||
        a.summary.toLowerCase().includes(sLower) ||
        a.author.toLowerCase().includes(sLower)
      );
    }

    res.json({
      success: true,
      count: list.length,
      articles: list
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleById = (req, res, next) => {
  try {
    const { id } = req.params;
    const article = db.findById('articles', id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Article with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      article
    });
  } catch (error) {
    next(error);
  }
};
