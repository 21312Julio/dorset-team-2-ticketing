import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type PipelineFunction = (data: any) => any;
export interface DatasourceConfig {
  resourceURI: string;
  queryParams?: { [key: string]: string };
  pipeline?: PipelineFunction[];
}

export interface PaginatedResult<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

@Injectable({
  providedIn: "root",
})
export class DataManagerFactory {
  constructor(private http: HttpClient) {}

  create(config: DatasourceConfig) {
    return new DataManager(this.http, config);
  }
}

export class DataManager<T> {
  url: string;
  count: number;
  next: string;
  previous: string;

  data: T[];
  dataChanges: Subject<T[]> = new Subject<T[]>();

  constructor(private http: HttpClient, private config: DatasourceConfig) {
    this.setDatasourceConfig(config);
  }

  getDatasourceConfig(): DatasourceConfig {
    return this.config;
  }

  setDatasourceConfig(config: DatasourceConfig) {
    this.url = undefined;
    this.count = undefined;
    this.next = undefined;
    this.previous = undefined;
    this.data = undefined;
    this.dataChanges.next(undefined);

    let url = new URL(config.resourceURI);
    if (config.queryParams) {
      Object.keys(config.queryParams).forEach((k) => {
        url.searchParams.append(k, config.queryParams[k]);
      });
    }
    this.url = url.href;
  }

  async applyPipeline(response: PaginatedResult<T>) {
    let newResponse: any = response;
    if (this.config.pipeline && this.config.pipeline.length > 0) {
      for (let fn of this.config.pipeline) {
        newResponse = await fn(newResponse);
      }
    }
    return newResponse;
  }

  async getInitialData() {
    let promise = this.http.get(this.url).toPromise();
    let response: PaginatedResult<T> = (await promise) as PaginatedResult<T>;
    response = await this.applyPipeline(response);
    this.count = response.count;
    this.next = response.next;
    this.previous = response.previous;
    this.data = response.results;
    this.dataChanges.next(this.data);
  }

  async getNextData() {
    let promise = this.http.get(this.next).toPromise();
    let response: PaginatedResult<T> = (await promise) as PaginatedResult<T>;
    response = await this.applyPipeline(response);
    this.count = response.count;
    this.next = response.next;
    this.previous = response.previous;
    let results = response.results;
    this.data = this.data.concat(results);
    this.dataChanges.next(this.data);
  }

  async getPreviousData() {
    let promise = this.http.get(this.next).toPromise();
    let response: PaginatedResult<T> = (await promise) as PaginatedResult<T>;
    response = await this.applyPipeline(response);
    this.count = response.count;
    this.next = response.next;
    this.previous = response.previous;
    let results = response.results;
    this.data = results.concat(this.data);
    this.dataChanges.next(this.data);
  }
}
