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
exports.comicController = void 0;
const category_1 = require("../services/category");
const comic_1 = require("../services/comic");
const upload_1 = require("../services/upload");
const queryHelpers_1 = require("../utils/queryHelpers");
exports.comicController = {
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, string, selectedStyles, subdomain, description, selectedGenres, visibility } = req.body;
            const author = req.cookies.caveartwebcomicsuser;
            const comicData = { name, string, subdomain, description, visibility, author };
            let newComic = yield comic_1.comic.create(comicData);
            if (newComic.error) {
                if (newComic.error.includes('comics_author_name_key')) {
                    newComic.error = `You already have a comic called ${name}.`;
                }
                if (newComic.error.includes('comics_subdomain_key')) {
                    newComic.error = `There is already a comic that uses the alias ${subdomain}.`;
                }
                res.status(500).send(newComic);
            }
            const comicID = newComic.id;
            newComic = yield category_1.category.associateGenres(comicID, selectedGenres);
            newComic = yield category_1.category.associateStyles(comicID, selectedStyles);
            if (newComic.error) {
                comic_1.comic.delete(comicID);
                res.status(500).send(newComic);
            }
            res.status(200).send({ id: comicID });
        });
    },
    getByAuthor: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = req.body.author;
            const comics = yield comic_1.comic.getByAuthor(author);
            if (comics.error) {
                res.status(500).send(comics.error);
            }
            res.status(200).send(comics);
        });
    },
    getByEndUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = req.cookies.caveartwebcomicsuser;
            const comics = yield comic_1.comic.getByAuthor(author);
            if (comics.error) {
                res.status(500).send(comics.error);
            }
            res.status(200).send(comics);
        });
    },
    getRecent: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comics = yield comic_1.comic.getRecent();
            if (comics.error) {
                res.status(500).send(comics.error);
            }
            res.status(200).send(comics);
        });
    },
    addPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("add page invoked");
        const upload = (0, upload_1.uploadNewComicPage)(req, res, function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Callback");
            });
        });
        console.log("Made it");
        // uploadNewComicPage(req, res, async function(err: Error) {
        //   if (err) {
        //     res.status(500).send({ error: err.message })
        //   }
        //   console.log("No error yet...?")
        //   let comicID = await getComicID(req.body.comic)
        //   if (comicID < 0) {
        //     res.status(500).send({ error: `Couldn't identify the comic you want to upload to.`})
        //   }
        //   if (req.file?.path) {
        //     const valid = await auth.isAuthor(req.body.comic, req.cookies.caveartwebcomicsuser)
        //     if (valid) {
        //       let pageCount = req.body.pageNumber
        //       if (req.body.pageNumber === undefined) {
        //         pageCount = await comic.getPageCount(req.body.comic)
        //       }
        //       const nextPageNumber = pageCount + 1
        //       const page = {
        //         img: req.file.path,
        //         pageNumber: nextPageNumber,
        //         comicId: comicID
        //       }
        //       const queryResult = await comic.createPage(page)
        //       if (queryResult.error) {
        //         res.status(500).send({ error: 'Server error ocurred when saving a file upload to a particular comic:' + queryResult.error })
        //       }
        //       res.status(200).send()
        //     } else {
        //       fs.unlink(req.file.path, (err) => {
        //         if (err) {
        //           console.error(err)
        //         }
        //       })
        //       res.status(400).send({error: 'No permission to edit comic.'})
        //     }
        //   }
        //   else {
        //     res.status(500).send({ error: 'Miscellaneous server error ocurred after uploading the image file.' })
        //   }
        // })
    }),
    getPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let comicID = yield (0, queryHelpers_1.getComicID)(req.params.comic);
        if (comicID < 0) {
            res.status(500).send({ error: `This comic doesn't seem to exist.` });
        }
        const queryResult = yield comic_1.comic.getPage(comicID, parseInt(req.params.page));
        if (queryResult.error) {
            res.status(500).send({ error: `There was an issue getting a comic page: ${queryResult.error}` });
        }
        res.status(200).send(queryResult);
    }),
    getPageCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let comicID = yield (0, queryHelpers_1.getComicID)(req.params.comic);
        if (comicID < 0) {
            res.status(500).send({ error: `This comic doesn't seem to exist.` });
        }
        const queryResult = yield comic_1.comic.getPageCount(req.params.comic);
        console.log(queryResult);
        res.status(200).send({ count: queryResult });
    })
};
exports.default = exports.comicController;
