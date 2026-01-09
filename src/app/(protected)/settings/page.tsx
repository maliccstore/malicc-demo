"use client";

import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Profile updated successfully (Simulated)");
        }, 1000);
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        router.push("/auth/login");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-xl font-bold mb-6">Settings</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Profile Information</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-black transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-black transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <button
                    onClick={handleLogout}
                    className="w-full border border-red-200 text-red-600 py-2.5 rounded font-medium hover:bg-red-50 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
