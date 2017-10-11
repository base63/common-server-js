import { WebFetcher } from '@base63/common-js'


export class InternalWebFetcher implements WebFetcher {
    async fetch(uri: string, options: RequestInit): Promise<Response> {
        return await fetch(uri, options);
    }
}
