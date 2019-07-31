// Type definitions for multer 1.3
// Project: https://github.com/expressjs/multer
// Definitions by: jt000 <https://github.com/jt000>
//                 vilicvane <https://vilic.github.io/>
//                 David Broder-Rodgers <https://github.com/DavidBR-SW>
//                 Michael Ledin <https://github.com/mxl>
//                 HyunSeob Lee <https://github.com/hyunseob>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import * as express from 'express';
import {ReadStream} from 'fs';

declare namespace multer {
    interface Field {
        /** The field name. */
        name: string;
        /** Optional maximum number of files per field to accept. */
        maxCount?: number;
    }

    interface Options {
        limits?: {
            /** Max field name size (Default: 100 bytes) */
            fieldNameSize?: number;
            /** Max field value size (Default: 1MB) */
            fieldSize?: number;
            /** Max number of non- file fields (Default: Infinity) */
            fields?: number;
            /** For multipart forms, the max file size (in bytes)(Default: Infinity) */
            fileSize?: number;
            /** For multipart forms, the max number of file fields (Default: Infinity) */
            files?: number;
            /** For multipart forms, the max number of parts (fields + files)(Default: Infinity) */
            parts?: number;
            /** For multipart forms, the max number of header key=> value pairs to parse Default: 2000(same as node's http). */
            headerPairs?: number;
        };
    }

    interface Instance {
        /** In case you need to handle a text-only multipart form, you can use any of the multer methods (.single(), .array(), fields()), req.body contains the text fields */
        /** Accept a single file with the name fieldName. The single file will be stored in req.file. */
        single(fieldName?: string): express.RequestHandler;
        /** Accept an array of files, all with the name fieldName. Optionally error out if more than maxCount files are uploaded. The array of files will be stored in req.files. */
        array(fieldName: string, maxCount?: number): express.RequestHandler;
        /** Accept a mix of files, specified by fields. An object with arrays of files will be stored in req.files. */
        fields(fields: Field[]): express.RequestHandler;
        /** Accepts all files that comes over the wire. An array of files will be stored in req.files. */
        any(): express.RequestHandler;
        /** Accept only text fields. If any file upload is made, error with code “LIMIT_UNEXPECTED_FILE” will be issued. This is the same as doing upload.fields([]). */
        none(): express.RequestHandler;
    }
}

interface Multer {
    (options?: multer.Options): multer.Instance;
}

declare const multer: Multer;

export = multer;

declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
            files: {
                [fieldname: string]: Multer.File[];
            } | Multer.File[];
        }

        namespace Multer {
            interface File {
                /** Field name specified in the form */
                fieldname: string;
                /** Name of the file on the user's computer */
                originalname: string;
                /** Size of the file in bytes */
                size: number;
                /** Stream of file */
                stream:	ReadStream,
                /** The detected mime-type, or null if we failed to detect */
                detectedMimeType: string,
                /** The typical file extension for files of the detected type, or empty string if we failed to detect (with leading . to match path.extname) */
                detectedFileExtension : string,
                /** The mime type reported by the client using the Content-Type header, or null if the header was absent */
                clientReportedMimeType: string,
                /** The extension of the file uploaded (as reported by path.extname) */
                clientReportedFileExtension: string
            }
        }
    }
}
