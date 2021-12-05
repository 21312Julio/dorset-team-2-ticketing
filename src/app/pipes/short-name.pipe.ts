import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortName",
})
export class ShortNamePipe implements PipeTransform {
  constructor() {}

  transform(name: string): string {
    let shortName: string;
    let words = name.trim().split(" ");
    if (words.length > 1) {
      shortName = words[0][0] + words[1][0];
    } else {
      shortName = words[0].substr(0, 2);
    }

    return shortName.toUpperCase();
  }
}

@NgModule({
  declarations: [ShortNamePipe],
  exports: [ShortNamePipe],
})
export class ShortNamePipeModule {}
