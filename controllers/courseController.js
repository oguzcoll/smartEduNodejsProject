const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = Course.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(201).json({
      status: "fail",
      error,
    });
  }
};
