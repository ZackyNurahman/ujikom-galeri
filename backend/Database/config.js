import { Sequelize } from "sequelize";

const db = new Sequelize('ujikom_gallery', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  }); 

export default db ;

 