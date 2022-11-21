"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
exports.commentController = {
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comment } = req.body;
            const author = req.cookies.caveartwebcomicsuser || '';
            let forwarded = req.headers['x-forwarded-for'];
            let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
            let newComment = yield comment.create(commentData);
            if (newComment.error) {
                if (newComment.error.includes('comments_author_name_key')) {
                    newComment.error = `You already have a comment called ${name}.`;
                }
                if (newComment.error.includes('comments_subdomain_key')) {
                    newComment.error = `There is already a comment that uses the alias ${subdomain}.`;
                }
                res.status(500).send(newComment);
            }
            const commentID = newComment.id;
            newComment = yield category.associateGenres(commentID, selectedGenres);
            newComment = yield category.associateStyles(commentID, selectedStyles);
            if (newComment.error) {
                comment.delete(commentID);
                res.status(500).send(newComment);
            }
            res.status(200).send({ id: commentID });
        });
    },
    getByAuthor: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = req.body.author;
            const comments = yield comment.getByAuthor(author);
            if (comments.error) {
                res.status(500).send(comments.error);
            }
            res.status(200).send(comments);
        });
    },
    getByEndUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = req.cookies.caveartwebcomicsuser;
            const comments = yield comment.getByAuthor(author);
            if (comments.error) {
                res.status(500).send(comments.error);
            }
            res.status(200).send(comments);
        });
    },
    getRecent: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield comment.getRecent();
            if (comments.error) {
                res.status(500).send(comments.error);
            }
            res.status(200).send(comments);
        });
    },
    addPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        uploadNewCommentPage(req, res, function (err) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(500).send({ error: err.message });
                }
                let commentID = yield getCommentID(req.body.comment);
                if (commentID < 0) {
                    res.status(500).send({ error: `Couldn't identify the comment you want to upload to.` });
                }
                if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
                    const valid = yield auth.isAuthor(req.body.comment, req.cookies.caveartwebcomicsuser);
                    if (valid) {
                        let pageCount = req.body.pageNumber;
                        if (req.body.pageNumber === undefined) {
                            pageCount = yield comment.getPageCount(req.body.comment);
                        }
                        const nextPageNumber = pageCount + 1;
                        const page = {
                            img: req.file.path,
                            pageNumber: nextPageNumber,
                            commentId: commentID
                        };
                        const queryResult = yield comment.createPage(page);
                        if (queryResult.error) {
                            res.status(500).send({ error: 'Server error ocurred when saving a file upload to a particular comment:' + queryResult.error });
                        }
                        res.status(200).send();
                    }
                    else {
                        fs.unlink(req.file.path, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        res.status(400).send({ error: 'No permission to edit comment.' });
                    }
                }
                else {
                    res.status(500).send({ error: 'Miscellaneous server error ocurred after uploading the image file.' });
                }
            });
        });
    }),
    getPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let commentID = yield getCommentID(req.params.comment);
        if (commentID < 0) {
            res.status(500).send({ error: `This comment doesn't seem to exist.` });
        }
        const queryResult = yield comment.getPage(commentID, parseInt(req.params.page));
        if (queryResult.error) {
            res.status(500).send({ error: `There was an issue getting a comment page: ${queryResult.error}` });
        }
        res.status(200).send(queryResult);
    }),
    getPageCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let commentID = yield getCommentID(req.params.comment);
        if (commentID < 0) {
            res.status(500).send({ error: `This comment doesn't seem to exist.` });
        }
        const queryResult = yield comment.getPageCount(req.params.comment);
        console.log(queryResult);
        res.status(200).send({ count: queryResult });
    })
};
exports.default = exports.commentController;
