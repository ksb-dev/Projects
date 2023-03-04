const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      // Installed Validator
      validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 0
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      // Custom Validator
      validate: {
        // only runs at the time of creation and applicable for updation
        validator: function (value) {
          return value <= this.price
        },
        message: 'Discount price should be below the regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// Document Middleware: runs before save() and create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// tourSchema.post('save', function (doc, next) {
//   console.log(doc)
//   next()
// })

// NOTE: We can have multiple pre and post middlewares

// Query Middleware : runs after find and findOne query
tourSchema.pre(/^find/, function (next) {
  // runs after find query
  //tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } })
  next()
})

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(docs)
//   next()
// })

// Aggregate Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  //console.log(this.pipeline())
  next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
