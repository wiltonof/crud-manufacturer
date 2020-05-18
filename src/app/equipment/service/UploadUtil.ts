
import * as fs from 'fs';
import * as uuid from 'uuid';
//import * as base64ToImage from 'base64-to-image';

interface FileUploaderOption {
    dest: string;
    fileFilter?(fileName: string): boolean;
}

interface FileDetails {
    fieldname: string;
    originalname: string;
    filename: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}

interface FileDatail {
    type: string;
    data: string;
}

export class UploadUtil {


    private async imageFilter(fileName: string) {
        // accept image only
        if (!fileName.match(/\.(png|pdf)$/)) {
            return false;
        }

        return true;
    }

    public base64ToImage(base64Str, path, optionalObj) {

        if (!base64Str || !path) {
            throw new Error('Missing mandatory arguments base64 string and/or path string');
        }

        let obj = optionalObj || {};
        let imageBuffer:FileDatail = this.decodeBase64Image(base64Str);
        let imageType = '';
        let fileName = '';
        if (obj) {
            imageType = obj.type || imageBuffer.type || 'png';
            fileName = obj.fileName || 'img-' + Date.now();
        }
        var abs;
        fileName = '' + fileName;

        if (fileName.indexOf('.') === -1) {
            imageType = imageType.replace('image/', '');
            fileName = fileName + '.' + imageType;
        }

        abs = path + fileName;
        fs.writeFile(abs, imageBuffer.data, 'base64', function(err) {
            if (err && optionalObj.debug) {
                console.log("File image write error", err);
            }

        });
        return {
            'imageType': imageType,
            'fileName': fileName
        };
    }

    /**
     * Decode base64 string to buffer.
     *
     * @param {String} base64Str string
     * @return {Object} Image object with image type and data buffer.
     * @public
     */
    private decodeBase64Image(base64Str) {
        var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var image = {
            type: null,
            data: null
        };
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string');
        }

        image.type = matches[1];
        image.data = new Buffer(matches[2], 'base64');

        return image;
    }

    public uploadImage(path, pic, fileName, type) {
        var obj = {'fileName': fileName, 'type': type};
        this.base64ToImage(pic, `${path}\\` , obj);
        return;
    }
}

