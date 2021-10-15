import { CheckHoliday } from '../index';
describe("test CheckHoliday function", () => {
  it("should return status date", () => {
    const res:any =  CheckHoliday('man');
    expect(res).toBe(true);
  });
});