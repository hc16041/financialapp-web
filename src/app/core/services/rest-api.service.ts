import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalComponent } from "../../global-component";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  }),
};

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getApikeyData(): Observable<any[]> {
    return this.http.get<any[]>("/app/apikey");
  }

  addApikeyData(newData: any): Observable<any[]> {
    return this.http.post<any[]>("/app/apikey", newData);
  }

  updateApikeyData(updatedData: any): Observable<any[]> {
    return this.http.put<any[]>("/app/apikey", updatedData);
  }

  deleteApikeyData(): Observable<void> {
    return this.http.delete<void>("/app/apikey");
  }

  /**
   * Todo Rest Api
   */
  // Get
  getTodoData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/todo", {
      headers: headerToken,
      responseType: "text",
    });
  }

  // POST
  postTodoData(employee: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + "apps/todo",
      JSON.stringify(employee),
      httpOptions
    );
  }

  // Single
  getSingleTodoData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/todo/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  // Patch
  patchTodoData(employee: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + "apps/todo/" + employee.ids,
      JSON.stringify(employee),
      httpOptions
    );
  }

  // Delete
  deleteTodo(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.delete(GlobalComponent.API_URL + "apps/todo/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  /**
   * Calendar Rest Api
   */
  // Get
  getCalendarData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/calendar", {
      headers: headerToken,
      responseType: "text",
    });
  }

  // POST
  postCalendarData(calendar: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + "apps/calendar",
      JSON.stringify(calendar),
      httpOptions
    );
  }

  // Single
  getSingleCalendarData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/calendar/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  // Patch
  patchCalendarData(calendar: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + "apps/calendar/" + calendar.ids,
      JSON.stringify(calendar),
      httpOptions
    );
  }

  // Delete
  deleteCalendar(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.delete(GlobalComponent.API_URL + "apps/calendar/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  /**
   * Chat Rest Api
   */
  // Get
  getChatData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/chat", {
      headers: headerToken,
      responseType: "text",
    });
  }

  // POST
  postChatData(chat: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + "apps/chat",
      JSON.stringify(chat),
      httpOptions
    );
  }

  // Single
  getSingleChatData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/chat/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  // Patch
  patchChatData(chat: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + "apps/chat/" + chat.ids,
      JSON.stringify(chat),
      httpOptions
    );
  }

  // Delete
  deleteChat(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.delete(GlobalComponent.API_URL + "apps/chat/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  /**
   * Email Rest Api
   */
  // Get
  getEmailData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/email", {
      headers: headerToken,
      responseType: "text",
    });
  }

  // POST
  postEmailData(email: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + "apps/email",
      JSON.stringify(email),
      httpOptions
    );
  }

  // Single
  getSingleEmailData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.get(GlobalComponent.API_URL + "apps/email/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }

  // Patch
  patchEmailData(email: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + "apps/email/" + email.ids,
      JSON.stringify(email),
      httpOptions
    );
  }

  // Delete
  deleteEmail(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + sessionStorage.getItem("token"),
    };
    return this.http.delete(GlobalComponent.API_URL + "apps/email/" + id, {
      headers: headerToken,
      responseType: "text",
    });
  }
}
