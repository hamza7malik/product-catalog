export class File {
  name: string;
  size: number;
  type: string;

  constructor(
    parts: any[],
    filename: string,
    options?: { size: number; type: string }
  ) {
    this.name = filename;
    this.size = options?.size || 0;
    this.type = options?.type || '';
  }
}
