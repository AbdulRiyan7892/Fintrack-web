import { useEffect, useState } from "react";
import toast from "react-hot-toast";


import ProfileCard from "../../components/settings/ProfileCard";
import PasswordCard from "../../components/settings/PasswordCard";
import EmailPreferenceCard from "../../components/settings/EmailPreferenceCard";
import LogoutCard from "../../components/settings/LogoutCard";
import Card from "../../components/ui/Card";
import {
    getCurrentUser,
    updateProfile,
    getSettings,
    updateSettings,
    changePassword
} from "../../api/userApi";

function Settings() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [frequency, setFrequency] = useState("NONE");

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const userResponse =
                await getCurrentUser();

            const settingsResponse =
                await getSettings();

            setUser(userResponse.data.data);

            setFrequency(

                settingsResponse
                    .data
                    .data
                    .emailFrequency || "NONE"

            );

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load settings");

        }

        finally {

            setLoading(false);

        }

    };

    const handleProfileSave = async (data) => {

        try {

            const response =
                await updateProfile(data);

            setUser(response.data.data);

            toast.success(
                response.data.message
            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Profile update failed"

            );

        }

    };

    const handlePasswordChange = async (data) => {

        try {

            const response =
                await changePassword(data);

            toast.success(
                response.data.message
            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password update failed"

            );

        }

    };

    const handleSettingsSave = async () => {

        try {

            const response =
                await updateSettings({

                    emailFrequency: frequency

                });

            toast.success(
                response.data.message
            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Settings update failed"

            );

        }

    };

    if (loading) {

        return (



                <div className="flex h-[70vh] items-center justify-center">

                    <h1 className="text-2xl font-semibold">

                       <div className="space-y-6">

                           <div className="h-10 w-56 animate-pulse rounded bg-gray-200"/>

                           <div className="grid gap-6">

                               {[1,2,3].map(i=>(
                                   <div
                                       key={i}
                                       className="h-52 animate-pulse rounded-xl bg-gray-200"
                                   />
                               ))}

                           </div>

                       </div>

                    </h1>

                </div>



        );

    }
return (

<div className="space-y-7">

<div>

<p className="text-sm font-medium text-blue-600">

Settings

</p>

<h1 className="mt-1 text-3xl font-semibold text-slate-900">

Account Settings

</h1>

<p className="mt-2 text-sm text-slate-500">

Manage your profile, password and application preferences.

</p>

</div>

<div className="grid gap-6">

<ProfileCard
user={user}
onSave={handleProfileSave}
/>

<EmailPreferenceCard
frequency={frequency}
setFrequency={setFrequency}
onSave={handleSettingsSave}
/>

<PasswordCard
onSave={handlePasswordChange}
/>

<LogoutCard/>

</div>

</div>

);
}

export default Settings;