import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "akif-validation";
import { registerUser } from "../../api/auth";
import { AuthContext } from "../../context/Auth";

const Register = () => {
  let firstName = "talha";
  // console.log(name)
  firstName = "Akif";
  console.log(firstName);

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    Firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toastify } = window;
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { Firstname, email, password, confirmPassword } = formData;
    if (!Firstname || !email || !password || !confirmPassword) {
      return toastify?.("Please fill all fields", "error");
    }
    if (!isEmail(email)) {
      return toastify?.("Enter a validx email address", "error");
    }

    if (password !== confirmPassword) {
      return toastify?.("Passwords do not match", "error");
    }

    email = email.toLowerCase();

    try {
      setLoading(true);

      const data = await registerUser({
        Firstname,
        email,
        password,
      });
      let { user, token, message } = data;
      handleLogin(user, token);
      window.toastify?.(message, "success");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";

      window.toastify?.(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-between bg-black p-12 text-white md:flex">
          <div>
            <h1 className="text-3xl font-bold">
              AHT<span className="text-gray-400">Store.</span>
            </h1>

            <p className="mt-3 text-gray-400">
              Your favorite products, all in one place.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Start your shopping journey with us.
            </h2>

            <p className="mt-5 text-gray-400">
              Create an account and discover amazing products at great prices.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 AHT Store. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-7 sm:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>

            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to create an account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="Firstname"
                placeholder="Enter your full name"
                value={formData.Firstname}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-full rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

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

export default Register;
