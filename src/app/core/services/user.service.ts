import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";

@Injectable({ providedIn: "root" })
export class UserProfileService {
  private http = inject(HttpClient);
  /***
   * Get All User
   */
  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  /***
   * Facked User Register
   */
  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
