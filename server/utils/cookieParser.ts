import { Request, Response, NextFunction } from 'express'

const parseCookies = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.cookie === undefined)	{
  	req.cookies = {}
  } else {
  	let parsed: Record<string, string> = {}
  	let cookies = req.headers.cookie.split(';')
  	for (let i: number = 0; i < cookies.length; i += 1) {
  		let temp = cookies[i].split('=')
      const key = temp[0].trim()
      const value = temp[1].trim()
   	  parsed[key] = value
   	}
  	req.cookies = parsed
  }
  next()
}

export default parseCookies