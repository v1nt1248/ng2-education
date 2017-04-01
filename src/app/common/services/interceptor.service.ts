import { Injectable } from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';

@Injectable()
export class MyInterceptor implements Interceptor {
  private qtPending: number = 0;

  constructor( ) { }

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    console.info('REQUEST:');
    console.log(request);
    if (this.qtPending === 0) {
      this.addSpinnerElem();
    }
    this.qtPending += 1;
    return request;
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    console.info('RESPONSE:');
    console.log(response);
    this.qtPending -= 1;
    if (this.qtPending <= 0) {
      this.removeSpinnerElem();
    }
    return response;
  }

  private addSpinnerElem() {
    const bodyElem = document.querySelector('body');
    const spinnerElem = document.createElement('img');
    spinnerElem.src = 'assets/wait.gif';
    spinnerElem.id = 'spinner';
    spinnerElem.style.width = '150px';
    spinnerElem.style.height = '150px';
    spinnerElem.style.position = 'absolute';
    spinnerElem.style.top = 'calc(50% - 75px)';
    spinnerElem.style.left = 'calc(50% - 75px)';
    bodyElem.appendChild(spinnerElem);
  }

  private removeSpinnerElem() {
    const spinnerElem = document.querySelector('#spinner');
    spinnerElem.remove();
  }

}
