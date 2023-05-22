const express = require("express");
const app = express();
const studentsRoutes = express.Router();

let Students = require("../model/Students");

// api to add students
studentsRoutes.route("/add").post(function (req, res) {
  let students = new Students(req.body);
  students
    .save()
    .then((students) => {
      res
        .status(200)
        .json({ status: "success", mssg: "students added successfully" });
    })
    .catch((err) => {
      res
        .status(409)
        .send({ status: "failure", mssg: "unable to save to database" });
    });
});

// api to get studentss
studentsRoutes.route("/").get(function (req, res) {
  Students.find(function (err, students) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", studentss: studentss });
    }
  });
});

// api to get students
studentsRoutes.route("/students/:id").get(function (req, res) {
  let id = req.params.id;
  Students.findById(id, function (err, students) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", students: students });
    }
  });
});

// api to update route
studentsRoutes.route("/update/:id").put(function (req, res) {
  Students.findById(req.params.id, function (err, students) {
    if (!students) {
      res.status(400).send({ status: "failure", mssg: "Unable to find data" });
    } else {
      students.name = req.body.name;
      students.cpf = req.body.cpf;
      students.matricula = req.body.matricula;

      students.save().then((school) => {
        res.status(200).json({ status: "success", mssg: "Update complete" });
      });
    }
  });
});

// api for delete
studentsRoutes.route("/delete/:id").delete(function (req, res) {
  Students.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", mssg: "Delete successfully" });
    }
  });
});

module.exports = studentsRoutes;
