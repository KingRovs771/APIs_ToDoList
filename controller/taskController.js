const response = require('../config/response');
const dbexec = require('../config/server');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('REST API To Do List Apps', res);
};

exports.viewTask = function (req, res) {
  dbexec.query('SELECT task_id, title, description, due_date, is_done, category.name_category FROM task INNER JOIN category ON task.category_uid = category.category_id', function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      response.success(
        {
          message: 'Data Berhasil ditemukan',
          data: rows,
        },
        res
      );
    }
  });
};

exports.getbyId = function (req, res) {
  const task_id = req.params.task_id;

  dbexec.query('SELECT * FROM ?? INNER JOIN category ON task.category_uid = category.category_id WHERE ??=?', ['task', 'task_id', task_id], function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      response.success({
        Status: 'Success',
        Message: 'Data Ditemukan',
        Data: {
          task_id: task_id,
          title: rows.title,
          description: rows.description,
          due_date: rows.due_date,
          is_done: rows.is_done,
        },
      });
    }
  });
};

exports.insertTask = function (req, res) {
  let data = {
    category_uid: req.body.category_uid,
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
    is_done: req.body.is_done,
  };

  let queryInsert = 'INSERT INTO ?? SET ?';
  const tableTask = 'task';

  queryInsert = mysql.format(queryInsert, tableTask);

  dbexec.query(queryInsert, data, function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      response.success(
        {
          Status: 'Success',
          Message: 'Berhasil Menyimpan Task',
          Data: rows,
        },
        res
      );
    }
  });
};

exports.updateTask = function (req, res) {};

exports.deleteTask = function (req, res) {
  const task_id = req.params.task_id;

  dbexec.query('DELETE FROM ?? WHERE ??=?', ['task', 'task_id', task_id], function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      response.success(
        {
          Status: 'Success',
          Message: 'Data Berhasil di Hapus',
          Data: {
            task_id: task_id,
          },
        },
        res
      );
    }
  });
};
