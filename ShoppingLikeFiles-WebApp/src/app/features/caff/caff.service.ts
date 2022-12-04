import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BASE_URL } from 'src/app/base-urls';
import { CommentService as CommentApi ,CaffResponse, CaffService as CaffApi, UpdateCaffRequest , CaffSearchService as SearchApi, CaffSearchDTO, CaffAllResponse, AddCommentDTO} from 'src/app/sdk';

@Injectable({
    providedIn: 'root'
})
export class CaffService {

    constructor(
        private caffApi: CaffApi,
        private searchApi: SearchApi,
        private httpClient: HttpClient,
        private commentApi: CommentApi,
    ) { }

    getCaffs(): Observable<CaffAllResponse[]> {
        return this.caffApi.apiCaffGet();
    }

    getCaff(caffId: number): Observable<CaffResponse> {
        return this.caffApi.apiCaffIdGet(caffId);
    }

    searchCaffs(caffSearchDTO: CaffSearchDTO): Observable<CaffAllResponse[]> {
        return this.searchApi.apiCaffSearchPost(caffSearchDTO);
    }

    downloadCaff(id: number) {
        throw 'Notimplemated yet';
    }

    addCommentCaff(addCommentDTO: AddCommentDTO): Observable<any> {
        return this.commentApi.addCommentPost(addCommentDTO);
    }

    upload(formData): Observable<any> {
        return this.httpClient.post(`${BASE_URL}/api/Caff/upload`,formData);
    }
}
