const { config } = require('../config/server');
const multer = require('multer');
module.exports = function (app) {
  const main = require('../controller/taskController');

  app.route('/').get(main.indexPage);
  app.route('/task/read_task').get(main.viewTask);
  app.route('/task/insert_task').post(main.insertTask);
  app.route('/task/get_read_task/:task_id').get(main.getbyId);
  app.route('/task/is_done').put(main.doneTask);
  app.route('/task/update_task').put(main.updateTask);
  app.route('/task/delete_task').delete(main.deleteTask);
};
