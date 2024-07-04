import axios, { AxiosError } from "axios";
import { Request, Response } from "express";

interface RequestBody {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

const createUser = async (req: Request, res: Response) => {
  const { username, firstName, lastName, password }: RequestBody = req.body;

  // make sure all firelds are required (Should normally be handled in front-end, but just in case) - not neccessary.
  if (!username || !firstName || !lastName || !password)
    return res
      .status(401)
      .json({ status: "unauthorized", message: "All fields are required" });

  try {
    // create user using chatengine.io api
    const newUser = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username,
        first_name: firstName,
        last_name: lastName,
        secret: password,
      },
      {
        headers: {
          "private-key": process.env.CHATENGINE_PRIVATE_KEY,
        },
      }
    );

    return res.status(newUser.status).json(newUser.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { response } = error;
      res.status(response.status).json(response.data);
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export default createUser;
