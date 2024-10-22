import { AppContext } from "@/types";

export const testHandler = async (c: AppContext) => {
  return c.json(
    {
      message: "test",
    },
    200
  );
};
