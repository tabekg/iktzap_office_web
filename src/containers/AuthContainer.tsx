import { useCallback, useContext, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../ui/Copyright";
import requester from "../utils/requester";
import { handleError } from "../utils/error";
import { IUser } from "../models/user";
import { TUserContext, UserContext } from "../utils/context";

export default function AuthContainer() {
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userContext = useContext(UserContext) as TUserContext;

  const submitable = useMemo(() => {
    return phoneNumber.length > 0 && password.length > 0 && !loading;
  }, [phoneNumber, password, loading]);

  const submit = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    requester
      .post<{ token: string; user: IUser }>("/auth", {
        phone_number: phoneNumber,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.payload.token);
        userContext.setUser(res.payload.user);
      })
      .catch((e) => {
        console.log(e);
        handleError(e, {
          wrong_password: "Неверный пароль!",
          not_found: "Пользователь с таким номером не существует!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, phoneNumber, password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войдите в систему
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Телефон номер"
            autoFocus
            placeholder="+7"
            type="tel"
            value={phoneNumber}
            disabled={loading}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!submitable}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => submit()}
          >
            {loading ? "Подождите..." : "Войти"}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
