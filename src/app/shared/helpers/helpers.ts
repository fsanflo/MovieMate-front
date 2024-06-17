import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class Helpers {
    static handleError(err: HttpErrorResponse) {
        return throwError(() => err);
    }
}