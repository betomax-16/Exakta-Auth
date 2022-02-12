import http from "http";

export class RequestExternalAPI {

    public static async request(method: string, endPoint: string, body?: any, headers?: any): Promise<any> {
        const API_AUTH = 'localhost';
        const API_AUTH_PORT = '4000';
        return new Promise((resolve, reject) => {
            const options = {
                host: API_AUTH,
                port: API_AUTH_PORT,
                path: endPoint,
                method: method,
                headers: { ...headers, 'Content-Type': 'application/json' }
            };
    
            const req = http.request(options);

            try {
                if (body) {
                    const data = new TextEncoder().encode(JSON.stringify(body));
                    req.write(data);
                }
            } catch (error) {
                throw error;
            }
            

            req.on('response', async res => {
                const data: any = await new Promise((resolve, reject) => {
                    res.on('data', d => {
                        resolve(d);
                    });
                });

                resolve(JSON.parse(data));
            });
        
            req.on('error', err => {
                reject(err);
            });

            req.end();
        });
    }
}