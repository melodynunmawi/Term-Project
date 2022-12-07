const { userModel } = require("../database");

const remindersController = {
  list: (req, res) => {
    const user = userModel.findById(req.user.id);
    res.render("reminder/index", { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const reminderToFind = req.params.id;
    const user = userModel.findById(req.user.id)
    const searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    const user = userModel.findById(req.user.id);
    const reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const reminderToFind = req.params.id;
    const user = userModel.findById(req.user.id)
    const searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    const user = userModel.findById(req.user.id);
    const searchResult = user.reminders.find(function (reminder) {
      if (req.params.id == reminder.id) {
        reminder.title = req.body.title
        reminder.description = req.body.description
        reminder.completed = (req.body.completed === "true")
        return true
      }
    })
    res.redirect("/reminders")
    // Done
  },

  delete: (req, res) => {
    // Implement this code
    const reminderID = req.params.id
    let index = 0
    const user = userModel.findById(req.user.id)
    const searchResult = user.reminders.find(function (reminder) {
      if (reminderID == reminder.id) {
        user.reminders.splice(index, 1)
        return true
      }
      index += 1
    })
    res.redirect("/reminders");
    // Done!
  },
};

module.exports = remindersController;
