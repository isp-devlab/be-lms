// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import uuid from 'uuid-wand'

export default class UploadHelper {
  public static async upload(file: any, path: string): Promise<any> {
    const apiEndpoint = process.env.STORAGE_URL

    const formData = new FormData()

    // Append the file to FormData properly
    const randomFileName = uuid.v4() + '.' + file.extname
    formData.append('file', fs.createReadStream(file.tmpPath), randomFileName)

    // Append other fields if needed, like path
    formData.append('path', path)

    const axiosConfig = {
      headers: {
        ...formData.getHeaders(), // Include headers from FormData
      },
    }

    try {
      // Use try-catch block to handle errors
      const apiResponse: AxiosResponse = await axios.post(apiEndpoint ?? '', formData, axiosConfig)
      // Check response status
      if (apiResponse.status === 200) {
        return apiResponse.data[0]
      } else {
        throw new Error('Failed to upload file')
      }
    } catch (error) {
      // Handle error here
      console.error('Error uploading file:', error)
      throw error
    }
  }
}
