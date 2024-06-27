import { inject } from "@angular/core"
import { SpinnerService } from "../services/spinner.service";
import { finalize } from "rxjs/operators";
import { HttpInterceptorFn } from "@angular/common/http";


export const SpinnerInterceptor:HttpInterceptorFn = (req, next) => {

    const spinnerSvc = inject(SpinnerService);
    spinnerSvc.show();
    return next(req).pipe(
        finalize(() => {
            spinnerSvc.hide();
        })
    );

}