import { useContext, useState } from "react";
import LeftSide from "../../components/LeftSide";
import { Button, Form, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Input from "../../components/common/Input";
import { LoginApi } from "../../api/auth";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { Paragraph } = Typography;
  const { Item } = Form;
  const { toastify } = window;
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    let { email, password } = formData;
    if (!email || !password) {
      toastify("Please fill all the feilds", "error");
    }

    email.toLocaleLowerCase();
    try {
      let { data } = await LoginApi({
        email,
        password,
      });

      const { token, user, message } = data;
      console.log(data);
      handleLogin(token, user);
      toastify("Login successfully", "success");
      navigate("/");
    } catch (e) {
      console.log(e);
      toastify("Somthing went wrong", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <LeftSide />

        <div className="p-7 sm:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>

            <Paragraph className="mt-2 text-sm text-gray-500">
              Please enter your details to create an account.
            </Paragraph>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-5">
            <Item label="Email :" name="email">
              <Input
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                prefix={<MailOutlined />}
              />
            </Item>

            <Item label="Password :" name="password">
              <Input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                prefix={<LockOutlined />}
              />
            </Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="!bg-black"
            >
              Create Account
            </Button>
          </Form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
