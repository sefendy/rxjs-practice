import { Course } from './../model/course';
import { Observable, Observer } from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable((observer: Observer<Course>) => {
    fetch("/api/courses")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}


