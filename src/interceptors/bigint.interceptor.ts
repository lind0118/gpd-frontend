import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.handleBigInt(data)));
  }

  private handleBigInt(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.handleBigInt(item));
    } else if (typeof data === 'object' && data !== null) {
      for (const key of Object.keys(data)) {
        if (typeof data[key] === 'bigint') {
          data[key] = data[key].toString();
        } else if (typeof data[key] === 'object') {
          data[key] = this.handleBigInt(data[key]);
        }
      }
    }
    return data;
  }
}
