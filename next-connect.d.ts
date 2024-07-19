// next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
  
    type Middleware<RequestType = any, ResponseType = any> = (
      req: RequestType,
      res: ResponseType,
      next: (err?: any) => void
    ) => void;
  
    interface Options<RequestType, ResponseType> {
      onError?: (err: any, req: RequestType, res: ResponseType, next: (err?: any) => void) => void;
      onNoMatch?: (req: RequestType, res: ResponseType) => void;
    }
  
    interface RequestHandler<RequestType, ResponseType> {
      use(...fn: Middleware<RequestType, ResponseType>[]): this;
      get(...fn: Middleware<RequestType, ResponseType>[]): this;
      post(...fn: Middleware<RequestType, ResponseType>[]): this;
      put(...fn: Middleware<RequestType, ResponseType>[]): this;
      delete(...fn: Middleware<RequestType, ResponseType>[]): this;
      patch(...fn: Middleware<RequestType, ResponseType>[]): this;
      options(...fn: Middleware<RequestType, ResponseType>[]): this;
      head(...fn: Middleware<RequestType, ResponseType>[]): this;
    }
  
    export default function nextConnect<RequestType = NextApiRequest, ResponseType = NextApiResponse>(
      options?: Options<RequestType, ResponseType>
    ): RequestHandler<RequestType, ResponseType>;
  }
  