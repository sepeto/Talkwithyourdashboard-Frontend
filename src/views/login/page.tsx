import React, { useState } from "react";
import { Eye, EyeOff, Loader2, ServerCrash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface FormData {
  user: string;
  password: string;
  host: string;
  database: string;
  port: string;
  openAiApiKey: string;
}

interface FormErrors {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
  port?: string;
  openAiApiKey?: string;
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    user: "u475170377_root",
    password: "*Lu$*bzRxrr2",
    host: "193.203.168.151",
    database: "u475170377_talk_db",
    port: "3306",
    openAiApiKey: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorService, setErrorService] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error when the user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.user.trim()) newErrors.user = "User es requerido";
    if (!formData.host.trim()) newErrors.host = "Host es requerido";
    if (!formData.database.trim()) newErrors.database = "Database es requerido";
    if (!/^\d+$/.test(formData.port)) {
      newErrors.port = "Port debe ser numérico";
    }
    if (!formData.openAiApiKey.trim())
      newErrors.openAiApiKey = "OpenAI API Key es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST_API}/check-connections`,
        formData
      );

      localStorage.setItem("TOKEN", data?.token);

      navigate("/chat");
    } catch (error) {
      console.log({ error });

      if (error instanceof AxiosError) {
        setErrorService(error?.response?.data?.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <ServerCrash className="w-8 h-8 text-blue-500 mr-2" />

          <h2 className="text-2xl font-bold text-gray-800">Conecta tu BD</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <div className="relative">
                <input
                  type={
                    key === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={formData[key as keyof FormData]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[key as keyof FormErrors]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {key === "password" && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>
              {errors[key as keyof FormErrors] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors[key as keyof FormErrors]}
                </p>
              )}
            </div>
          ))}

          {!!errorService && (
            <p className="mt-2 mb-4 text-xs text-red-500">{errorService}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex gap-1 justify-center items-center disabled:opacity-50"
          >
            {isLoading && (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
              </span>
            )}
            Conectar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// ns1.dns-parking.com

// ns2.dns-parking.com
