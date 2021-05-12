import { Course } from './../model/course';
import {Component, OnInit} from '@angular/core';
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap, filter} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$ = http$
        .pipe(
          tap(() => console.log("HTTP request executed")),
          map(res => res['payload']),
          shareReplay()
        );

    this.beginnersCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
    // courses$.subscribe(
    //   (courses) => {
    //     this.beginnersCourses = courses.filter(
    //       (course) => course.category == 'BEGINNER');

    //     this.advancedCourses = courses.filter(
    //       (course) => course.category == 'ADVANCED'
    //     );
    //   },
    //   noop,
    //   () => console.log("completed")
    // );
  }
}
