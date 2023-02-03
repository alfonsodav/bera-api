import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

async function saveFile(req: any, name: string) {
  try {
    const file = req.file(name, {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (!file || !file.isValid) {
      return file?.errors || 'archivo requerido'
    } else {
      await file?.move(Application.tmpPath('uploads/user'), {
        name: uuidv4() + `.${file.extname}`,
      })
    }
    return file
  } catch (error) {
    throw new Error(error)
  }
}

export { saveFile }
