import { SignUpRoute } from "../routes/users";
import { AppRouteHandler } from "@/types";

class UserControllers {
  public signup: AppRouteHandler<SignUpRoute> = async (c) => {
    const body = c.req.valid("json");

    return c.json(
      {
        statusCode: 201,
        message: "test",
        data: body,
      },
      201
    );
  };
}

export const userControllers = new UserControllers();
