const Tour = require('../model/tourModel')
const APIFeatures = require('../utils/apiFeatures')

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

const getAllTours = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Tour.find(), req.query).paginate()

    const tours = await features.query

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}

const getTour = async (req, res) => {
  try {
    const { id } = req.params
    const tour = await Tour.findById(id)

    if (!tour) {
      return res.status(404).json({ msg: `No tour with ID : ${id}` }) // you get this error when number of _id characters are same but value is different
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const { id } = req.params

    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!tour) {
      return res.status(404).json({ msg: `No tour with ID : ${id}` })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        tour: error
      }
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const tour = await Tour.findByIdAndDelete(id)
    console.log(tour)

    if (!tour) {
      return res.status(404).json({ msg: `No tour with ID : ${id}` }) // you get this error when number of _id characters are same but value is different
    }
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.status(204).json({
      status: 'fail',
      data: error
    })
  }
}

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: error
    })
  }
}

const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      }
      // {
      //   $limit: 6
      // }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })
  } catch {
    res.status(404).json({
      status: 'fail',
      data: error
    })
  }
}

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
}
