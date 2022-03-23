const Tour = require('../models/Tour');

module.exports = {
  getAllTours: async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    try {
      let tours = Tour.find(JSON.parse(query));
      if (req.query.fields !== undefined) {
        tours = tours.select(req.query.fields.replace(',', ' '));
      }
      if (req.query.page !== undefined) {
        const limit = req.query.limit || 10;
        tours.skip((+req.query.page - 1) * limit);
        tours.limit(limit);
      }
      res.json({
        status: 'success',
        data: await tours,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
  getTourById: async (req, res) => {
    const { id } = req.params;
    try {
      const tour = await Tour.findById(id);
      if (tour === null) {
        return res.status(404).json({
          status: 'failure',
          message: 'Tour not found',
        });
      }
      res.json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
  createTour: async (req, res) => {
    console.log(req.body);
    try {
      const tour = await Tour.create(req.body);
      res.json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(400).json({
        status: 'failure',
        message: error.message,
      });
    }
  },
  updateTour: async (req, res) => {
    const { id } = req.params;
    try {
      const tour = await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (tour === null) {
        return res.status(404).json({
          status: 'failure',
          message: 'Tour not found',
        });
      }
      res.json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
  deleteTour: async (req, res) => {
    try {
      const { id } = req.params;
      const tour = await Tour.findByIdAndDelete(id);
      if (tour === null) {
        return res.status(404).json({
          status: 'failure',
          message: 'Tour not found',
        });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
};
