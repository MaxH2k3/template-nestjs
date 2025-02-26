export class UserFilterDto {
  search?: string;
  gender?: string;
  dob?: bigint;
  dod?: bigint;
  job?: string;

  isFilter(): boolean {
    return !!(this.search || this.gender || this.dob || this.dod || this.job);
  }
}
