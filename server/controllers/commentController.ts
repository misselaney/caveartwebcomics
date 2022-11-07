import { Request, Response } from 'express'

export const commentController = {
  create: async function (req: Request, res: Response) {
    const { comment } = req.body
    const author = req.cookies.caveartwebcomicsuser || ''
    let forwarded = req.headers['x-forwarded-for']
    let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    let newComment = await comment.create(commentData)
    if (newComment.error) {
      if (newComment.error.includes('comments_author_name_key')) {
        newComment.error = `You already have a comment called ${name}.`
      }
      if (newComment.error.includes('comments_subdomain_key')) {
        newComment.error = `There is already a comment that uses the alias ${subdomain}.`
      }
      res.status(500).send(newComment)
    }
    const commentID = newComment.id
    newComment = await category.associateGenres(commentID, selectedGenres)
    newComment = await category.associateStyles(commentID, selectedStyles)
    if (newComment.error) {
      comment.delete(commentID)
      res.status(500).send(newComment)
    }
    res.status(200).send({ id: commentID })
  },

  getByAuthor: async function (req: Request, res: Response) {
    const author = req.body.author
    const comments = await comment.getByAuthor(author)
    if (comments.error) {
      res.status(500).send(comments.error)
    }
    res.status(200).send(comments)
  },

  getByEndUser: async function (req: Request, res: Response) {
    const author = req.cookies.caveartwebcomicsuser
    const comments = await comment.getByAuthor(author)
    if (comments.error) {
      res.status(500).send(comments.error)
    }
    res.status(200).send(comments)
  },

  getRecent: async function (req: Request, res: Response) {
    const comments = await comment.getRecent()
    if (comments.error) {
      res.status(500).send(comments.error)
    }
    res.status(200).send(comments)
  },

  addPage: async (req: Request, res: Response) => {
    uploadNewCommentPage(req, res, async function(err) {
      if (err) {
        res.status(500).send({ error: err.message })
      }
      let commentID = await getCommentID(req.body.comment)
      if (commentID < 0) {
        res.status(500).send({ error: `Couldn't identify the comment you want to upload to.`})
      }

      if (req.file?.path) {
        const valid = await auth.isAuthor(req.body.comment, req.cookies.caveartwebcomicsuser)
        if (valid) {
          let pageCount = req.body.pageNumber
          if (req.body.pageNumber === undefined) {
            pageCount = await comment.getPageCount(req.body.comment)
          }
          const nextPageNumber = pageCount + 1
          const page = {
            img: req.file.path,
            pageNumber: nextPageNumber,
            commentId: commentID
          }
          const queryResult = await comment.createPage(page)
          if (queryResult.error) {
            res.status(500).send({ error: 'Server error ocurred when saving a file upload to a particular comment:' + queryResult.error })
          }
          res.status(200).send()
        } else {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(400).send({error: 'No permission to edit comment.'})
        }
      }
      else {
        res.status(500).send({ error: 'Miscellaneous server error ocurred after uploading the image file.' })
      }
    })
  },

  getPage: async (req: Request, res: Response) => {
    let commentID = await getCommentID(req.params.comment)
    if (commentID < 0) {
      res.status(500).send({ error: `This comment doesn't seem to exist.`})
    }
    const queryResult = await comment.getPage(commentID, parseInt(req.params.page))
    if (queryResult.error) {
      res.status(500).send({ error: `There was an issue getting a comment page: ${queryResult.error}`})
    }
    res.status(200).send(queryResult)
  },

  getPageCount: async (req: Request, res: Response) => {
    let commentID = await getCommentID(req.params.comment)
    if (commentID < 0) {
      res.status(500).send({ error: `This comment doesn't seem to exist.`})
    }
    const queryResult = await comment.getPageCount(req.params.comment)
    console.log(queryResult)
    res.status(200).send({ count: queryResult})
  }
}

export default commentController