import { Injectable } from '@angular/core';
import { GlobalConstants } from './GlobalConstants';


@Injectable()
export class GlobalMethods {
    public static getError(error: any) {
        if (error.status != undefined) {
            let status: number = error.status;
            switch (status){
                case 404: return error.message;
                case 500: return checkError(error);
                case 0  : return error.message;
                default   : break;
            }
        }
        else if (error.message != undefined) {
            return error.message;
        }
        else {
            return error;
        }
    }
}
function checkError(error: any) {
    if (error.error != undefined) {
        if (error.error.message != undefined) {
            let errorMessage = error.error.message;
            let isCovidBE = GlobalConstants.APP_NAME;
            let isBEMessage = errorMessage.indexOf(isCovidBE);
            if (isBEMessage) {
                return errorMessage;
            }
        }
        return error.error;
    }
}