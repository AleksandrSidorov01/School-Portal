const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./db');

async function addUsers() {
  try {
    await connectDB();

    const adminPassword = bcrypt.hashSync('пароль', 8); // пароль для админа
    const teacher1Password = bcrypt.hashSync('пароль', 8); // пароль для учителя
    const teacher2Password = bcrypt.hashSync('пароль', 8); // пароль для учителя

    const admin = new User({
      login: 'логин', //Впишите ваш логин который будет использоваться для сайта (админ)
      password: adminPassword,
      role: 'admin' //роль на сайте
    });
    const teacher1 = new User({
      login: 'логин', //Впишите ваш логин который будет использоваться для сайта (учитель)
      password: teacher1Password,
      role: 'teacher' //роль на сайте
    });
    const teacher2 = new User({
      login: 'логин', //Впишите ваш логин который будет использоваться для сайта (учитель)
      password: teacher2Password,
      role: 'teacher' //роль на сайте
    });

    await admin.save();
    await teacher1.save();
    await teacher2.save();

    console.log('Админ и два учителя добавлены успешно!');
  } catch (error) {
    console.error('Ошибка:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

addUsers();