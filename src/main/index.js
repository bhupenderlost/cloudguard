/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import express from 'express'
import axios from 'axios'
import fs from 'fs'
import crypto, { randomBytes } from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'

import { Project, User, File } from '../db/db'
import icon from '../../resources/icon.png?asset'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    titleBarStyle: 'hiddenInset'

  })
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()

  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: '' })
  }


}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.cloudgaurd')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//Create User
ipcMain.handle('create-user', async (event, data) => {
  try {
    const newUser = await User.create(data)
    return { success: true, user: newUser }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

//Get User
ipcMain.handle('get-user', async (event, data) => {
  try {
    const user = await User.findByPk(1, { raw: true })
    return { success: true, user: user }
  } catch (err) {
    return { success: false, error: err.message }
  }
})


//Create Project
ipcMain.handle('create-project', async (event, data) => {
  try {
    const project = await Project.create(data)
    return { success: true, project: project }

  } catch (err) {
    return { error: true, message: err }
  }
})

//Get Projects
ipcMain.handle('get-projects', async (event, data) => {
  try {
    const projects = await Project.findAll({ raw: true })
    return { success: true, projects: projects }

  } catch (err) {
    return { error: true, message: err }
  }
})

//Get Files
ipcMain.handle('get-files', async (event, data) => {
  try {
    const files = await File.findAll({where: { projectId: data.projectId }, raw: true })
    return { success: true, files: files }

  } catch (err) {
    return { error: true, message: err }
  }
})

//Get Project By ID
ipcMain.handle('get-project-by-id', async (event, data) => {
  try {
    const project = await Project.findByPk(data.id, { raw: true })
    return { success: true, project: project }
  } catch (err) {
    return { error: true, message: err }
  }
})

//Update Project
ipcMain.handle('update-project', async (event, data) => {
  try {
    const { update, id } = data
    const project = await Project.update({ update }, { where: { id: id } })
    return { success: true, project: project }
  } catch (err) {
    return { error: true, message: err }
  }
})

//Delete Project
ipcMain.handle('delete-project', async (event, data) => {
  try {
    const { id } = data
    const project = await Project.destroy({ where: { id: id } })
    return { success: true, project: project }
  } catch (err) {
    return { error: true, message: err }
  }
})

//Theme Change 
ipcMain.handle('theme-change', async (event, data) => {
  try {
    return { theme: true }
  } catch (err) {
    console.log(err)
    return { error: true }
  }
})

//Login With Google
ipcMain.handle('login-with-google', async (event, data) => {

  const config = {
    clientId: '858530558055-ikjftt4hqanaftk141e1pecg803pis8j.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: 'http://localhost:4000/callback',
    scope: data.type === 'Google Cloud Platform' ? 'https://www.googleapis.com/auth/devstorage.read_write' : (data.type === 'Google Drive' ? 'https://www.googleapis.com/auth/drive' : ''),
  }

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    config.redirectUri
  )}&scope=${encodeURIComponent(config.scope)}`

  shell.openExternal(authUrl)

  return new Promise((resolve, reject) => {
    const app = express()
    const server = app.listen(4000, () => console.log('Listening for OAuth callback...'))

    app.get('/callback', async (req, res) => {
      const code = req.query.code
      if (code) {
        res.send('Authorization successful! You can close this tab.')
        server.close()

        try {
          const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            new URLSearchParams({
              client_id: config.clientId,
              client_secret: config.clientSecret,
              redirect_uri: config.redirectUri,
              grant_type: 'authorization_code',
              code: code,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          )

          resolve(tokenResponse.data)
        } catch (error) {
          console.error('Error exchanging token:', error)
          reject(error)
        }
      } else {
        res.send('Error: Authorization code not received.')
        server.close()
        reject(new Error('Authorization code not received.'))
      }
    })
  })
})

//Dropbox OAuth
ipcMain.handle('login-with-dropbox', async (event, data) => {
  const config = {
    clientId: 'vbvde6ntwpri5kr',
    clientSecret: 'iyrzt1h9oefgvjt',
    redirectUri: 'http://localhost:4000/callback',
    scope: 'files.content.write files.content.read files.metadata.read',
  }

  const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scope)}`;

  shell.openExternal(authUrl);

  return new Promise((resolve, reject) => {
    const app = express();
    const server = app.listen(4000, () => console.log('Listening for OAuth callback...'));

    app.get('/callback', async (req, res) => {
      const code = req.query.code;
      if (code) {
        res.send('You can close this browser tab and return to the app.');
        server.close();
        try {
          const tokenResponse = await axios.post(
            'https://api.dropboxapi.com/oauth2/token',
            new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              client_id: config.clientId,
              client_secret: config.clientSecret,
              redirect_uri: config.redirectUri,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          );


          resolve(tokenResponse.data);  
        } catch (error) {
          reject(error);
        }
      } else {
        res.send('Error: Authorization code not found.');
        server.close();
        reject(new Error('Authorization code not received.'));
      }
    });
  });
})

//Microsoft OAuth  
ipcMain.handle('login-with-microsoft', async () => {
  const config = {
    clientId: 'fe122ccf-5315-4a37-b462-d9d0bf2c3098',
    clientSecret: '3by8Q~n0CdKE1d6sRwpfE_wOQoOu4yAmKcRkoaKv',
    redirectUri: 'http://localhost:4000/callback',
    scope: 'Files.ReadWrite User.Read offline_access'
  }
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=${encodeURIComponent(config.scope)}`

  shell.openExternal(authUrl)

  return new Promise((resolve, reject) => {
    const app = express()
    const server = app.listen(4000, () => console.log('Listening for OAuth callback...'))

    app.get('/callback', async (req, res) => {
      const code = req.query.code
      if (code) {
        res.send('You can close this browser tab and return to the app.')
        server.close()
        try {
          const tokenResponse = await axios.post(
            'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            new URLSearchParams({
              client_id: config.clientId,
              redirect_uri: config.redirectUri,
              grant_type: 'authorization_code',
              code: code,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          )
          resolve(tokenResponse.data)
        } catch (error) {
          reject(error)
        }
      } else {
        res.send('Error: Authorization code not found.')
        server.close()
        reject(new Error('Authorization code not received.'))
      }
    })
  })
})

//Download File From Cloud
ipcMain.handle('download-file', async (event, data) => {
  try {
    const file = await File.findByPk(data.id, { raw: true })

    const project = await Project.findByPk(file.projectId, { raw: true })

    if (project.cloudPlatfrom === 'Google Cloud Platform') {
      const refreshToken = JSON.parse(project.accessTokens).refresh_token
      const BUCKET_NAME = project.gcpBucketId
      const accessToken = await getAccessTokenFromRefreshTokenGoogle(refreshToken)
      const url = `https://storage.googleapis.com/storage/v1/b/${BUCKET_NAME}/o/${encodeURIComponent(file.fileName)}?alt=media`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      if (response.ok) {
        const encryptedData = await response.text()

        const cipher = crypto.createDecipher('aes-256-cbc', Buffer.from(file.secretKey, 'base64'))

        let decryptedData = cipher.update(encryptedData, 'hex', 'utf8')

        decryptedData += cipher.final('utf8')

        const result = await dialog.showSaveDialog({
          title: 'Save Decrypted File',
          defaultPath: path.join(__dirname, file.fileName.slice(0, -4)),
        })

        if (result.filePath) {
          fs.writeFileSync(result.filePath, decryptedData, 'base64')
          console.log(`File saved to: ${result.filePath}`)
        } else {
          console.log('User canceled the save dialog')
        }
      } else {
        console.error('Error downloading file:', response.statusText)
      }
    }
    else if (project.cloudPlatfrom === 'Google Drive') {
      const refreshToken = JSON.parse(project.accessTokens).refresh_token
      const accessToken = await getAccessTokenFromRefreshTokenGoogle(refreshToken)
      const fileDownloadUrl = `https://www.googleapis.com/drive/v3/files/${file.driveFileId}?alt=media`
      const response = await axios.get(fileDownloadUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      if (response.data) {
        const encryptedData = await response.data

        const cipher = crypto.createDecipher('aes-256-cbc', Buffer.from(file.secretKey, 'base64'))

        let decryptedData = cipher.update(encryptedData, 'hex', 'utf8')

        decryptedData += cipher.final('utf8')

        const result = await dialog.showSaveDialog({
          title: 'Save Decrypted File',
          defaultPath: path.join(__dirname, file.fileName.slice(0, -4)),
        })

        if (result.filePath) {
          fs.writeFileSync(result.filePath, decryptedData, 'base64')
          console.log(`File saved to: ${result.filePath}`)
        } else {
          console.log('User canceled the save dialog')
        }
      } else {
        console.error('Error downloading file:', response.statusText)
      }
    }
    else if (project.cloudPlatfrom === 'Microsoft Onedrive') {
      const refreshToken = JSON.parse(project.accessTokens).refresh_token
      const accessToken = await getAccessTokenFromRefreshTokenGoogle(refreshToken)
      const fileDownloadUrl = `https://www.googleapis.com/drive/v3/files/${file.driveFileId}?alt=media`
      const response = await axios.get(fileDownloadUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      if (response.data) {
        const encryptedData = await response.data

        const cipher = crypto.createDecipher('aes-256-cbc', Buffer.from(file.secretKey, 'base64'))

        let decryptedData = cipher.update(encryptedData, 'hex', 'utf8')

        decryptedData += cipher.final('utf8')

        const result = await dialog.showSaveDialog({
          title: 'Save Decrypted File',
          defaultPath: path.join(__dirname, file.fileName.slice(0, -4)),
        })

        if (result.filePath) {
          fs.writeFileSync(result.filePath, decryptedData, 'base64')
          console.log(`File saved to: ${result.filePath}`)
        } else {
          console.log('User canceled the save dialog')
        }
      } else {
        console.error('Error downloading file:', response.statusText)
      }
    }
  } catch (err) {
    console.log(err)
    return { error: true, message: err }
  }
})

//Upload File To Cloud
ipcMain.handle('upload-file', async (event, data) => {
  const { filePath, projectId } = data

  if (!filePath || !projectId) {
    return { success: false, message: 'Missing file or project ID' }
  }

  try {
    const secretKey = randomBytes(32)

    const fileBuffer = fs.readFileSync(filePath)

    const base64 = fileBuffer.toString("base64")

    const cipher = crypto.createCipher('aes-256-cbc', secretKey)

    let encryptedData = cipher.update(base64, 'utf8', 'hex')

    encryptedData += cipher.final('hex')

    const encryptedFilePath = `${filePath}.enc`

    const fileName = path.basename(encryptedFilePath)

    fs.writeFileSync(encryptedFilePath, encryptedData)
    let response
    const project = await Project.findByPk(projectId, { raw: true })

    if (project.cloudPlatfrom === 'Google Cloud Platform') {

      const refreshToken = JSON.parse(project.accessTokens).refresh_token
      const BUCKET_NAME = project.gcpBucketId
      const accessToken = await getAccessTokenFromRefreshTokenGoogle(refreshToken)


      const url = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${fileName}`

      response = await axios.post(url, fs.createReadStream(encryptedFilePath), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream',
        },
      })

    } else if (project.cloudPlatfrom === 'Google Drive') {

      const refreshToken = JSON.parse(project.accessTokens).refresh_token
      const accessToken = await getAccessTokenFromRefreshTokenGoogle(refreshToken)
      const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=media&name=${fileName}`

      response = await axios.post(url, fs.createReadStream(encryptedFilePath), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream',
        },
      })
    } else if (project.cloudPlatfrom === 'Microsoft Azure') {

    } else if (project.cloudPlatfrom === 'Amazon Web Services (AWS)') {

    } else if (project.cloudPlatfrom === 'Microsoft Onedrive') {
      const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`

      const fileStream = fs.createReadStream(filePath)
      const refreshToken = JSON.parse(project.accessTokens).refresh_token

      const accessToken = await getAccessTokenFromRefreshTokenMicrosoft(refreshToken)
      response = await axios.put(url, fileStream, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream',
        },
      })
    }
    console.log(response.data)
    fs.unlinkSync(encryptedFilePath)
    let file = {
      fileName: fileName,
      projectId: project.id,
      secretKey: secretKey.toString("base64")
    }
    project.cloudPlatfrom == 'Google Drive' ? file.driveFileId = response.data.id : null
    project.cloudPlatfrom == 'Google Cloud Platform' ? file.filePath = response.data.selfLink : null

    const newfile = await File.create(file)
    return { success: true, file: newfile }
  } catch (error) {
    console.error('Error uploading file:', error)
    console.error('Error response:', error.response?.data || error.message)
    return { success: false, message: error.message }
  }
})

//Choose File Dialog Box
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
  })
  return result.filePaths[0] // Return the selected file path
})

const getAccessTokenFromRefreshTokenGoogle = async (refreshToken) => {
  try {

    const config = {
      clientId: '858530558055-ikjftt4hqanaftk141e1pecg803pis8j.apps.googleusercontent.com',
      clientSecret: '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',
      redirectUri: 'http://localhost:4000/callback',
      scope: 'https://www.googleapis.com/auth/devstorage.read_write',
    }
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: config.clientId, // Replace with your Google OAuth 2.0 Client ID
        client_secret: config.clientSecret, // Replace with your Google OAuth 2.0 Client Secret
        refresh_token: refreshToken, // The refresh token you already have
        grant_type: 'refresh_token', // This is required to get a new access token
      },
    })

    const accessToken = response.data.access_token // The access token you need

    return accessToken
  } catch (error) {
    return null
  }
}

const getAccessTokenFromRefreshTokenMicrosoft = async (refreshToken) => {

  const config = {
    clientId: 'fe122ccf-5315-4a37-b462-d9d0bf2c3098',
    clientSecret: '3by8Q~n0CdKE1d6sRwpfE_wOQoOu4yAmKcRkoaKv',
    redirectUri: 'http://localhost:4000/callback',
    scope: 'Files.ReadWrite offline_access',
    tenantId: 'ccca9e99-dba8-4ed5-b6f5-7f61f412820c'
  }

  const url = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`

  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('client_id', config.clientId)
  params.append('client_secret', config.clientSecret)
  params.append('refresh_token', refreshToken)
  params.append('scope', 'offline_access Files.ReadWrite.All')

  try {
    const response = await axios.post(url, params)
    console.log(response.data)
    return response.data.access_token
  } catch (error) {
    console.error('Error refreshing access token:', error.response.data)
    throw new Error('Failed to refresh access token')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

