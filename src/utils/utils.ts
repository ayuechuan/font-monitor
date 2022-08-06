

export class BrowserHandle {


  static createHistoryEvent<T extends keyof History>(EventType: T) { 
    const origin = history[EventType];


    return function(this: BrowserHandle){
       const resolve = origin.apply(this,arguments);
         
       const event = new Event(EventType);

       window.dispatchEvent(event);

       return resolve;
    }

  }



}

