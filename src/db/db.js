/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { Sequelize, DataTypes } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'app.db'),
})

//App settings

const App = sequelize.define('App', {
  theme: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

//User Model
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jwtToken: {
    type:DataTypes.STRING,
    allowNull: false
  }
})

const File = sequelize.define('File', {
  fileName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  driveFileId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  secretKey: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
})

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDescription: {
    type: DataTypes.TEXT,
    allowNull:false
  },
  cloudPlatfrom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessTokens: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gcpBucketId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privateKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
})


Project.hasMany(File, {
  foreignKey: 'projectId',
  as: 'files',
  onDelete: 'CASCADE', 
});

File.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project',
});

// Sync the database
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully!'))
  .catch((err) => console.error('Database sync failed:', err))

export { sequelize, User, App, Project, File }
