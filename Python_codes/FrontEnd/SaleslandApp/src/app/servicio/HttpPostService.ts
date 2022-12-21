import { HttpClient,HttpHeaders } from '@angular/common/http';

export class HttpPostService {

    private serverUrl = "http://127.0.0.1:8000/";
    
    constructor(private http: HttpClient) { }
    
    postData(data: any, route: string) {
        let options = this.createRequestOptions();
        console.log("DATA:",data)
        return this.http.post(this.serverUrl + route, data, { headers: options });
    }
    
    private createRequestOptions() {
        let headers = new HttpHeaders({
            "accept": "application/json",
            "Content-Type": "application/json"
        });
        return headers;
    }
}