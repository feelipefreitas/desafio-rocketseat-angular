import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  getUserToken() {

    //TODO: recuperar o token do localstorage
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibm92b0BleGFtcGxlLmNvbSIsImlhdCI6MTc1OTI2MzQxMiwiZXhwIjoxNzU5MzQ5ODEyfQ.C7E565GDFJbyytWjdRcpY4coAdHn4Lx8Q_j3D36J--I';

  }

}
