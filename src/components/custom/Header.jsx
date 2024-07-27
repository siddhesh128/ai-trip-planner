import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useState } from "react";
import axios from "axios";

function Header() {
  const navigation = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const onClickHandler = () => {
    navigation("/");
    window.location.reload();
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        },
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-3 flex justify-between items-center px-5 shadow-sm">
      <div
        onClick={onClickHandler}
        className="flex justify-center cursor-pointer"
      >
        <div>
          <img src="/Logo.svg" />
        </div>
        <div className="pr-4 text-2xl font-bold">AI-TRIP-PLANNER</div>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                navigation("/create-trip");
                window.location.reload();
              }}
              variant="outline"
              className="rounded-full"
            >
              Create Trip
            </Button>

            <Button
              onClick={() => {
                navigation("/my-trips");
                window.location.reload();
              }}
              variant="outline"
              className="rounded-full"
            >
              My Trips
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="rounded-full h-[35px] w-[35px]"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex justify-start items-center">
                <img src="/Logo.svg" />
                <span className="text-black font-bold text-2xl">
                  Yatra Sathi
                </span>
              </div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
