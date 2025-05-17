import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const StyledCard = styled(Card)({
  boxShadow: "none",
  paddingTop: "3rem",
  paddingBottom: "3rem",
  borderRadius: "20px",
  "@media (max-width:600px)": {
    marginLeft: "20px",
    marginRight: "20px",
  },
});

const StyledImg = styled("img")({
  position: "absolute",
  top: "40px",
  left: "40px",
  width: "200px",
  "@media (max-width:600px)": {
    width: "300px",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
  },
});

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);
  const [authFailed, setAuthFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("");

  // Awareness popup state
  const [open, setOpen] = useState(true);
  const [awarenessImages, setAwarenessImages] = useState<string[]>([]);
  const [randomImage, setRandomImage] = useState<string>("");
  const basePath = process.env.NEXT_PUBLIC_BASEPATH || "";

  useEffect(() => {
    // Fetch awareness images from API
    fetch(`${basePath}/api/awareness-images`)
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setAwarenessImages(data.images);
          const rand = data.images[Math.floor(Math.random() * data.images.length)];
          setRandomImage(`${basePath}/images/awareness/${rand}`);
        }
      });
    if (passwordFieldRef.current) {
      setButtonWidth(passwordFieldRef.current.offsetWidth);
    }
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  useEffect(() => {
    if (router.query.callbackUrl) {
      setCallbackUrl(router.query.callbackUrl as string);
    }
    if (router.query.error) {
      setAuthFailed(true);
    }
  }, [router.query.callbackUrl, router.query.error]);

  const handleUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const handleLogin = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      const basePath = process.env.NEXT_PUBLIC_BASEPATH || "/portal/semar";
      const redirectUrl = callbackUrl || basePath;
      signIn("credentials", {
        username,
        password,
        callbackUrl: redirectUrl,
      })
        .then((result) => {
          if (result && result.error) {
            console.error("Login error:", result.error);
            setAuthFailed(true);
          } else {
            getSession().then((session) => {
              if (session === null) {
                setAuthFailed(true);
              } else {
                router.push(redirectUrl);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setAuthFailed(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [username, password, callbackUrl, router]
  );

  return (
    <div>
      {/* Awareness Popup */}
      <Dialog open={open && !!randomImage} onClose={() => setOpen(false)}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {randomImage && (
            <img
              src={randomImage}
              alt="Awareness"
              style={{ maxWidth: "100%", display: "block", margin: "0 auto" }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        style={{
          height: "100vh",
          backgroundImage: "url('images/backgrounds/login-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <StyledImg src="images/logos/logo.png" alt="Logo" loading="lazy" />

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <StyledCard>
            {authFailed && (
              <Typography
                color="error"
                align="center"
                style={{ width: "100%" }}
              >
                Failed to authenticate. Please try again.
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    marginBottom: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  Selamat Datang!
                </Typography>

                {authFailed && (
                  <Typography color="error">Login failed</Typography>
                )}

                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  onChange={handleUsernameChange}
                  InputProps={{
                    style: {
                      borderRadius: 20,
                      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  ref={passwordFieldRef}
                  onChange={handlePasswordChange}
                  InputProps={{
                    style: {
                      borderRadius: 20,
                      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                    },
                  }}
                />
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      marginTop: "5rem",
                      backgroundColor: "black",
                      color: "white",
                      width: buttonWidth,
                      borderRadius: 20,
                      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                    }}
                  >
                    Log In
                  </Button>
                )}
              </Box>
            </form>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
}